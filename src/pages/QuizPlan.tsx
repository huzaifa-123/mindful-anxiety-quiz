import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { calculateQuizResults } from "../utils/quizScoring";
import { Check, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";


const QuizPlan = () => {
  // 15 minute countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const { answers } = useQuizAnswers();
  const quizResults = calculateQuizResults(answers);
  const paymentRef = useRef(null);

  
  // Calculate user's anxiety type
  const results = calculateQuizResults(answers);
 

  // Centralized image path for before/after comparison
  const [selectedPayment, setSelectedPayment] = useState('one-time');
  const name = answers.name || "";
  const gender = answers.gender || "";
  const email = answers.email_preference?.email || "";
  const phone = answers.email_preference?.phone || "";
  const anxietyType = results.dominantType;
  const severity = results.severity;

  // Dynamic before/after image based on anxiety type
  let beforeAfterImage = '';
  if (anxietyType === 'panic') {
    beforeAfterImage = '/QuizDesign/PANICKER CHECKOUT SECTION.png';
  } else if (anxietyType === 'avoidant') {
    beforeAfterImage = '/QuizDesign/AVOIDER CHECKOUT SECTION.png';
  } else if (anxietyType === 'ruminator') {
    beforeAfterImage = '/QuizDesign/RUMINATOR CHECKOUT SECTION.png';
  }
  console.log('[PLAN] Calculated anxiety type:', anxietyType);
  console.log('[PLAN] Selected before/after image:', beforeAfterImage);

  // Q17/Q21 answer keys for the user
  const q17Answers = answers.question17 || [];
  const q21Answers = answers.question21 || [];
  const q17Arr = Array.isArray(q17Answers) ? q17Answers : [q17Answers];
  const q21Arr = Array.isArray(q21Answers) ? q21Answers : [q21Answers];
  console.log('[PLAN] Q17 selected answers:', q17Arr);
  console.log('[PLAN] Q21 selected answers:', q21Arr);

  // Mapping for bar/label data (should match answerTextMap keys and requirement doc)
  const barDataMap = {
    // PANICKER
    panic_attacks: { label: 'FREQUENT', percent: 90 },
    breathing_stuck: { label: 'INTENSE', percent: 85 },
    racing_thoughts_panic: { label: 'HIGH', percent: 80 },
    grounded_steady: { label: 'HIGH CONTROL', percent: 90 },
    body_calm: { label: 'CALM', percent: 80 },
    confidence_daily: { label: 'HIGH CONFIDENCE', percent: 85 },
    // RUMINATOR
    overthinking_racing: { label: 'HIGH', percent: 85 },
    overthinking: { label: 'FREQUENT', percent: 80 },
    mentally_stuck: { label: 'INTENSE', percent: 80 },
    thoughts_calmer: { label: 'HIGH CONTROL', percent: 90 },
    able_pause: { label: 'CALM', percent: 80 },
    mentally_clear: { label: 'HIGH CONFIDENCE', percent: 85 },
    // AVOIDER
    avoidance: { label: 'SEVERE', percent: 90 },
    fear_rejection: { label: 'INTENSE', percent: 85 },
    low_self_esteem: { label: 'LOW', percent: 35 },
    empowered_action: { label: 'HIGH CONTROL', percent: 90 },
    safe_body: { label: 'CALM', percent: 80 },
    trust_decisions: { label: 'HIGH CONFIDENCE', percent: 90 },
  };

  // Add this mapping at the top of the file or before the component
  const barTextMap = {
    // PANICKER
    panic_attacks: { label: 'Racing thoughts', level: 'HIGH', percent: 85 },
    breathing_stuck: { label: 'Overthinking', level: 'FREQUENT', percent: 80 },
    racing_thoughts_panic: { label: 'Mentally stuck', level: 'INTENSE', percent: 80 },
    grounded_steady: { label: 'Thoughts feel calmer', level: 'HIGH CONTROL', percent: 90 },
    body_calm: { label: 'Able to pause', level: 'CALM', percent: 80 },
    confidence_daily: { label: 'Mentally clear', level: 'HIGH CONFIDENCE', percent: 85 },
    // RUMINATOR
    overthinking_racing: { label: 'Racing thoughts', level: 'HIGH', percent: 85 },
    overthinking: { label: 'Overthinking', level: 'FREQUENT', percent: 80 },
    mentally_stuck: { label: 'Mentally stuck', level: 'INTENSE', percent: 80 },
    thoughts_calmer: { label: 'Thoughts feel calmer', level: 'HIGH CONTROL', percent: 90 },
    able_pause: { label: 'Able to pause', level: 'CALM', percent: 80 },
    mentally_clear: { label: 'Mentally clear', level: 'HIGH CONFIDENCE', percent: 85 },
    // AVOIDER
    avoidance: { label: 'Avoiding situations', level: 'SEVERE', percent: 90 },
    fear_rejection: { label: 'Fear of rejection', level: 'INTENSE', percent: 85 },
    low_self_esteem: { label: 'Low self-esteem', level: 'LOW', percent: 35 },
    empowered_action: { label: 'Taking empowered action', level: 'HIGH CONTROL', percent: 90 },
    safe_body: { label: 'Safe in your body', level: 'CALM', percent: 80 },
    trust_decisions: { label: 'Trust in decisions', level: 'HIGH CONFIDENCE', percent: 90 },
  };

  // Add this mapping above the component or near the barTextMap
  const barKeyToType = {
    // PANICKER
    panic_attacks: 'panic',
    breathing_stuck: 'panic',
    racing_thoughts_panic: 'panic',
    grounded_steady: 'panic',
    body_calm: 'panic',
    confidence_daily: 'panic',
    // RUMINATOR
    overthinking_racing: 'ruminator',
    overthinking: 'ruminator',
    mentally_stuck: 'ruminator',
    thoughts_calmer: 'ruminator',
    able_pause: 'ruminator',
    mentally_clear: 'ruminator',
    // AVOIDER
    avoidance: 'avoidant',
    fear_rejection: 'avoidant',
    low_self_esteem: 'avoidant',
    empowered_action: 'avoidant',
    safe_body: 'avoidant',
    trust_decisions: 'avoidant',
  };

  // Gather bar data for Q21 and Q17, filtered by anxiety type
  const barsQ21 = q21Arr
    .filter(key => barKeyToType[key] === anxietyType)
    .map(key => ({ key, ...barDataMap[key] }))
    .filter(b => b.label);
  const barsQ17 = q17Arr
    .filter(key => barKeyToType[key] === anxietyType)
    .map(key => ({ key, ...barDataMap[key] }))
    .filter(b => b.label);
  console.log('[PLAN] Q21 bar data:', barsQ21);
  console.log('[PLAN] Q17 bar data:', barsQ17);

  const buildPaymentUrl = (baseUrl: string): string => {
  const params = new URLSearchParams({
      name,
      gender,
      email,
      phone,
      anxietyType,
      severity,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const paymentOptions = [
    {
      id: 'one-time',
      label: 'ONE TIME PAYMENT',
      price: '$70.00',
      originalPrice: '$147.00',
      discount: '52% Discount',
      popular: true,
      url: buildPaymentUrl('https://facebook.com'), // Replace with real URL
    },
    {
      id: 'installment',
      label: '3X INSTALLMENT PLAN',
      price: '$25.00',
      originalPrice: '$49.00',
      discount: '49% Discount',
      popular: false,
      url: buildPaymentUrl('https://google.com'), // Replace with real URL
    },
  ];

  // Continue button handler
  const handleContinue = () => {
    const selectedOption = paymentOptions.find(opt => opt.id === selectedPayment);
    if (selectedOption && selectedOption.url) {
      window.open(selectedOption.url, '_blank');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer component for header
  const TimerDisplay = () => (
    <div className="flex flex-col items-center gap-2 w-full sm:flex-row sm:justify-end sm:items-center sm:gap-4">
      <span className="text-white text-xs sm:text-sm font-medium text-center sm:text-right w-full sm:w-auto whitespace-nowrap overflow-hidden text-ellipsis">
        Discount ends in {formatTime(timeLeft)}
      </span>
      <button
        className="bg-flourishmint hover:bg-green-400 text-white w-full sm:w-auto px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors"
        onClick={() => paymentRef.current?.scrollIntoView({ behavior: 'smooth' })}
      >
        GET MY PLAN
      </button>
    </div>
  );

  // Content based on anxiety type
  const getAnxietyContent = () => {
    switch (anxietyType) {
      case "panic":
        return {
          currentExperience: {
            mainPoints: [
              "Sudden body jolts, pounding heart, tight chest",
              "Fear hits without warning or clear reason", 
              "Breathing feels shallow or stuck"
            ],
            focusAreas: [
              "Stuck in \"what if\" panic spirals",
              "Hard to feel safe even when nothing's wrong",
              "Can't seem to anchor or calm down"
            ]
          },
          calmResetVision: {
            mainPoints: [
              "Early signals are noticed and softened",
              "Body and breath begin responding with more ease",
              "You feel grounded even when anxiety shows up"
            ],
            focusAreas: [
              "CBT Focus: Exposure to physical cues, response flexibility",
              "MCT Focus: Detached awareness of panic loops",
              "CBH Focus: Anchored calm, breath-body safety memory"
            ]
          }
        };
      case "avoidant":
        return {
          currentExperience: {
            mainPoints: [
              "You avoid things that matter to you",
              "Fear of discomfort stops you from starting",
              "Even small tasks feel overwhelming"
            ],
            focusAreas: [
              "Your mind jumps to the worst-case scenario",
              "You freeze or stall instead of moving forward",
              "Emotionally drained from constantly holding back"
            ]
          },
          calmResetVision: {
            mainPoints: [
              "You start, even if it feels uncertain",
              "You speak up without bracing for judgment",
              "You choose presence over protection"
            ],
            focusAreas: [
              "CBT Focus: Gradual re-engagement, structured action",
              "MCT Focus: Unhooking meaning from fear triggers", 
              "CBH Focus: Inner courage, grounded regulation in discomfort"
            ]
          }
        };
      case "ruminator":
        return {
          currentExperience: {
            mainPoints: [
              "Mind loops through \"what ifs\" and replays",
              "Constant overthinking blocks decisions",
              "Mental exhaustion builds from trying to figure it all out"
            ],
            focusAreas: [
              "Thought-labeling, mental pattern rewiring",
              "Over-attachment to thinking as control",
              "No pause between thoughts, overstimulated system"
            ]
          },
          calmResetVision: {
            mainPoints: [
              "Thoughts still come, but no longer spiral",
              "Space returns between ideas, reactions, and clarity",
              "You rest not because it's done, but because you've shifted your relationship with the loop"
            ],
            focusAreas: [
              "CBT Focus: Journaling with thought distance",
              "MCT Focus: Detached mindfulness, attention training",
              "CBH Focus: Slower brainwave states, internal calm rituals"
            ]
          }
        };
      default:
        return {
          currentExperience: {
            mainPoints: [
              "Analyzing your specific anxiety patterns",
              "Understanding your unique triggers",
              "Identifying your response patterns"
            ],
            focusAreas: [
              "Personalized assessment in progress",
              "Custom recommendations being prepared",
              "Tailored approach being developed"
            ]
          },
          calmResetVision: {
            mainPoints: [
              "Customized calm strategies",
              "Personalized coping techniques",
              "Individual progress pathway"
            ],
            focusAreas: [
              "CBT Focus: Personalized cognitive strategies",
              "MCT Focus: Custom mindfulness approaches",
              "CBH Focus: Individual nervous system regulation"
            ]
          }
        };
    }
  };

  const content = getAnxietyContent();

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header timer={<TimerDisplay />} />
      </div>
      
      <main className="flex-1 px-2 sm:px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
              Best-Fit Therapeutic Techniques for You:
            </h1>
          </div>

          {/* Now vs Goal Section */}
          <div className="mb-10 sm:mb-16">
            {/* Image with absolutely positioned headings */}
            <div className="relative w-full sm:w-[900px] mx-auto mb-6 sm:mb-8 flex justify-center">
              {/* Headings for desktop */}
              <span className="hidden sm:block absolute top-[-32px] left-[18%] z-10">
                <span className="bg-gray-800 text-white text-xs font-semibold px-4 py-1 rounded-lg shadow relative">
                  Where You Are Now
                  <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></span>
                </span>
              </span>
              <span className="hidden sm:block absolute top-[-32px] left-[68%] z-10">
                <span className="bg-emerald-400 text-white text-xs font-semibold px-4 py-1 rounded-lg shadow relative">
                  30 Days From Now
                  <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-emerald-400"></span>
                </span>
              </span>
              {/* Headings for mobile */}
              <div className="flex sm:hidden w-full justify-between absolute top-[-32px] left-0 px-4">
                <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
                  Where You Are Now
                </span>
                <span className="bg-emerald-400 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
                  30 Days From Now
                </span>
              </div>
              <img 
                src={beforeAfterImage}
                alt="Before and after transformation comparison" 
                className="w-full sm:w-[900px] h-40 sm:h-[400px] object-contain mx-auto"
              />
            </div>
            {/* Dynamic Bars Section */}
            <div className="flex flex-col sm:flex-row justify-center items-start gap-4 sm:gap-8 mt-6 w-full">
              {/* Q21: Where You Are Now (Grey Card) */}
              <div className="w-full sm:w-96 bg-gradient-to-br from-gray-400 to-gray-700 rounded-xl p-6 shadow-md mb-4 sm:mb-0 min-h-[80px] overflow-visible">
                {barsQ21.length > 0 ? (
                  barsQ21.map((bar, idx) => (
                  <div key={bar.key} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-semibold text-base">{barTextMap[bar.key]?.label || ''}</span>
                      <span className="text-xs text-gray-200 font-medium italic">{barTextMap[bar.key]?.level || ''}</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-300 rounded-full">
                      <div className="absolute left-0 top-0 h-2 rounded-full" style={{ width: `${barTextMap[bar.key]?.percent || 0}%`, background: 'linear-gradient(90deg, #fbbf24 0%, #f87171 100%)' }}></div>
                      <div className="absolute top-1/2" style={{ left: `calc(${barTextMap[bar.key]?.percent || 0}% - 10px)` }}>
                        <div className="w-5 h-5 bg-white border-2 border-orange-400 rounded-full shadow -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))
                ) : (
                  <div className="h-8"></div>
                )}
              </div>
              {/* Q17: 30 Days From Now (White Card) */}
              <div className="w-full sm:w-96 bg-white rounded-xl p-6 shadow-md min-h-[80px] overflow-visible">
                {barsQ17.length > 0 ? (
                  barsQ17.map((bar, idx) => (
                  <div key={bar.key} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-800 font-semibold text-base">{barTextMap[bar.key]?.label || ''}</span>
                      <span className="text-xs text-emerald-500 font-medium italic">{barTextMap[bar.key]?.level || ''}</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                      <div className="absolute left-0 top-0 h-2 rounded-full bg-emerald-400" style={{ width: `${barTextMap[bar.key]?.percent || 0}%` }}></div>
                      <div className="absolute top-1/2" style={{ left: `calc(${barTextMap[bar.key]?.percent || 0}% - 10px)` }}>
                        <div className="w-5 h-5 bg-white border-2 border-emerald-400 rounded-full shadow -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))
                ) : (
                  <div className="h-8"></div>
                )}
            </div>
          </div>
          
          <hr className="my-8 border-gray-300 border-t-4 mb-8" />

          {/* What's Inside Your Reset Plan Section */}
          <div className="mt-12 mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What’s Inside Your Reset Plan</h2>
            <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
              Your 7-Day Reset blends micro-tools that rewire your nervous system, gently and fast.
            </p>
            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
              <div className="border-2 border-emerald-400 rounded-lg px-6 py-4 text-left bg-emerald-50 font-medium text-gray-900">
                ✓ <span className="font-bold">4-Minute Exercise</span> — calms racing thoughts & heart within one song.
              </div>
              <div className="border-2 border-emerald-400 rounded-lg px-6 py-4 text-left bg-emerald-50 font-medium text-gray-900">
                ✓ <span className="font-bold">Break free from hidden triggers</span> — learn a 3-step interrupt pattern.
              </div>
              <div className="border-2 border-emerald-400 rounded-lg px-6 py-4 text-left bg-emerald-50 font-medium text-gray-900">
                ✓ <span className="font-bold">Rapid-relief tool</span> — activate your calm response on command.
              </div>
              <div className="border-2 border-emerald-400 rounded-lg px-6 py-4 text-left bg-emerald-50 font-medium text-gray-900">
                ✓ <span className="font-bold">Rewire anxious thoughts</span> — swap catastrophising for clear decisions.
              </div>
              <div className="border-2 border-emerald-400 rounded-lg px-6 py-4 text-left bg-emerald-50 font-medium text-gray-900">
                ✓ <span className="font-bold">Regain physical calm</span> — release tension & steady breathing in minutes.
              </div>
              <div className="border-2 border-emerald-400 rounded-lg px-6 py-4 text-left bg-emerald-50 font-medium text-gray-900">
                ✓ <span className="font-bold">Track progress</span> — watch your anxiety index drop every day.
              </div>
              <div className="border-2 border-emerald-400 rounded-lg px-6 py-4 text-left bg-emerald-50 font-medium text-gray-900">
                ✓ <span className="font-bold">Seven micro-moves</span> — follow daily or binge; all unlocked now.
              </div>
            </div>
          </div>

          {/* Why This Method Works So Well Section */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why This Method Works So Well</h2>
            <p className="text-gray-700 mb-10 text-lg max-w-2xl mx-auto">
              This reset blends 3 proven therapies for faster, deeper calm.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-4xl mx-auto">
              {/* CBT Card */}
              <div className="flex-1 border-2 border-emerald-100 rounded-xl bg-white px-6 py-8 shadow-sm flex flex-col items-center min-w-[260px]">
                <img src="/QuizDesign/1.png" alt="CBT icon" className="w-12 h-12 mb-4" />
                <div className="text-left w-full">
                  <div className="font-bold text-lg text-gray-900 mb-1">CBT — Cognitive Behavioral Therapy</div>
                  <div className="text-emerald-700 font-semibold mb-2 text-sm">70–75% success rate</div>
                  <div className="text-gray-700 text-sm mb-1">Reframes unhelpful thoughts +<br/>rewires behavioral patterns that fuel anxiety.</div>
                </div>
              </div>
              {/* MCT Card */}
              <div className="flex-1 border-2 border-emerald-100 rounded-xl bg-white px-6 py-8 shadow-sm flex flex-col items-center min-w-[260px]">
                <img src="/QuizDesign/2.png" alt="MCT icon" className="w-12 h-12 mb-4" />
                <div className="text-left w-full">
                  <div className="font-bold text-lg text-gray-900 mb-1">MCT — Metacognitive Therapy</div>
                  <div className="text-emerald-700 font-semibold mb-2 text-sm">~80% success for worry + spirals</div>
                  <div className="text-gray-700 text-sm mb-1">Teaches how to detach from obsessive loops and shift your relationship with thoughts.</div>
                </div>
              </div>
              {/* CBH Card */}
              <div className="flex-1 border-2 border-emerald-100 rounded-xl bg-white px-6 py-8 shadow-sm flex flex-col items-center min-w-[260px]">
                <img src="/QuizDesign/3.png" alt="CBH icon" className="w-12 h-12 mb-4" />
                <div className="text-left w-full">
                  <div className="font-bold text-lg text-gray-900 mb-1">CBH — Cognitive Behavioral Hypnotherapy</div>
                  <div className="italic text-emerald-700 font-semibold mb-2 text-sm">Reinforces calm through body + memory</div>
                  <div className="text-gray-700 text-sm mb-1">Uses breath, imagery, and physical cues to retrain your nervous system to feel safe again.*</div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-2 border-gray-300 border-t-4 mb-8" />

          {/* Therapy Results + Life Without vs. With Support Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Therapy Results + 
            </h2>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              "Life Without vs. With Support"
            </h2>
            
            <p className="text-gray-700 text-sm mb-8">
              Success rates from clinical methods:
            </p>
            
            {/* Graphic representation */}
            <div className="flex justify-center items-center mb-8">
              <div className="relative w-80 h-40">
                {/* Image placeholders */}
                <div className="absolute top-1/2 left-1/2 w-96 h-64 transform -translate-x-1/2 -translate-y-1/2">
                  <img 
                    src="/QuizDesign/with_without support (2).png" 
                    alt="Without support illustration" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 mb-6 max-w-md mx-auto">
              Research shows CBT can be effective for up to 70% of individuals. MCT and CBH have also demonstrated high success rates, especially when integrated. Our approach offers a more complete path with lasting results.
            </p>
            
            <p className="text-sm font-semibold text-gray-800 mb-8">
              Estimated combined approach success: up to 90%
            </p>
            
            {/* Comparison columns */}
            <div className="flex justify-center gap-8 max-w-2xl mx-auto">
              <div className="flex-1">
                <div className="bg-flourishgreen text-white  px-4 py-2 rounded-full mb-4">
                  <span className="text-sm font-medium">Without Support:</span>
                </div>
                <ul className="space-y-2 text-left text-sm text-gray-700">
                  <li>• You may continue battling the same cycles</li>
                  <li>• Your nervous system stays reactive</li>
                  <li>• Daily life feels heavier than it needs to</li>
                </ul>
              </div>
              
              <div className="flex-1">
                <div className="bg-flourishgreen text-white px-4 py-2 rounded-full mb-4">
                  <span className="text-sm font-medium">With Calm Reset:</span>
                </div>
                <ul className="space-y-2 text-left text-sm text-gray-700">
                  <li>• Thought spirals become less intense</li>
                  <li>• You feel cleaner, lighter, and more focused</li>
                  <li>• You build emotional safety from within</li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-2 border-gray-300 border-t-4 mb-8" />

          {/* Testimonials Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Testimonials
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[ 
              "This is the first plan that actually matched how I think. It finally felt designed for someone like me.",
              "I used to spiral every evening. Now I have a way to stop it before it starts.",
              "I didn't think I'd ever feel calm again but this gave me back hope."
            ].map((text, idx) => (
              <div key={idx} className="bg-white border border-gray-400 rounded-lg p-8 text-left relative shadow-2xl">
                {/* Comma image positioned half inside/outside top-left */}
                <img
                  src="/Icons/85.png"
                  alt="Quotation mark"
                  className="absolute top-0 left-9 -translate-x-1/2 -translate-y-1/2 w-10 h-10 opacity-70 pointer-events-none"
                />
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {text}
                </p>
                 <hr className="my-2 border-gray-500" />
                <div className="flex mb-0">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-flourishmint text-lg">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          </div>
          
           <hr className="my-2 border-gray-300 border-t-4 mb-8" />
          {/* Final Pricing Section */}
          <div className="text-center mb-16">

            {/* Start My Plan Button */}
           <button 
              className="w-full max-w-2xl mx-auto bg-emerald-400 hover:bg-emerald-500 text-white py-6 px-12 rounded-full font-bold text-xl tracking-wider text-center transition-colors"
              onClick={handleContinue}
            > 
              Start My 7-Day Test-Drive – £0 Today
            </button>
            <div className="flex justify-center items-center gap-2 mt-4 text-gray-700 text-lg font-medium">
              <span>SSL Secure</span>
              <span className="mx-1">|</span>
              <span>PCI Compliant</span>
              <span className="mx-1">|</span>
              <span>GMC-Registered Clinician</span>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
 
    
  );
};

export default QuizPlan;
