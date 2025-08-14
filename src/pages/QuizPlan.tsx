import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { calculateQuizResults } from "../utils/quizScoring";


const QuizPlan = () => {
  // 15 minute countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const { answers } = useQuizAnswers();
  const quizResults = calculateQuizResults(answers);
  const paymentRef = useRef(null);
  const { resetAnswers } = useQuizAnswers();

  
  // Calculate user's anxiety type
  const results = calculateQuizResults(answers);
 

  // Centralized image path for before/after comparison
  const [selectedPayment, setSelectedPayment] = useState('one-time');
  const name = answers.name || "";
  const gender = answers.gender || "";
  const email = answers.email || "";
  const phone = answers.phone || "";
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

  // Q17/Q21 answer keys for the user
  const q17Answers = answers.question16 || [];
  const q21Answers = answers.question20 || [];
  const q17Arr = Array.isArray(q17Answers) ? q17Answers : [q17Answers];
  const q21Arr = Array.isArray(q21Answers) ? q21Answers : [q21Answers];

  // Mapping for bar/label data (should match answerTextMap keys and requirement doc)
  const barDataMap = {
    panic_attacks: { label: 'FREQUENT', percent: 90 },
    breathing_stuck: { label: 'INTENSE', percent: 85 },
    racing_thought: { label: 'HIGH', percent: 80 },
    grounded_steady: { label: 'HIGH CONTROL', percent: 90 },
    body_calm: { label: 'CALM', percent: 80 },
    confidence_daily: { label: 'HIGH CONFIDENCE', percent: 85 },
    overthinking_racing: { label: 'HIGH', percent: 85 },
    overthinking: { label: 'FREQUENT', percent: 80 },
    mentally_stuck: { label: 'INTENSE', percent: 80 },
    thoughts_calmer: { label: 'HIGH CONTROL', percent: 90 },
    able_pause: { label: 'CALM', percent: 80 },
    mentally_clear: { label: 'HIGH CONFIDENCE', percent: 85 },
    avoidance: { label: 'SEVERE', percent: 90 },
    fear_rejection: { label: 'INTENSE', percent: 85 },
    low_self_esteem: { label: 'LOW', percent: 35 },
    empowered_action: { label: 'HIGH CONTROL', percent: 90 },
    safe_body: { label: 'CALM', percent: 80 },
    trust_decisions: { label: 'HIGH CONFIDENCE', percent: 90 },
  };

  // Add this mapping at the top of the file or before the component
  const barTextMap = {
    overthinking: { label: 'Overthinking and racing thoughts', level: 'FREQUENT', percent: 80 },
    panic_attacks: { label: 'Panic attacks', level: 'HIGH', percent: 85 },
    avoidance: { label: 'Avoidance', level: 'SEVERE', percent: 90 },
    fear_rejection: { label: 'Fear of rejection', level: 'INTENSE', percent: 85 },
    low_self_esteem: { label: 'Low self-esteem', level: 'LOW', percent: 35 },
    grounded_steady: { label: 'Clear-headed and in control', level: 'HIGH CONTROL', percent: 90 },
    body_calm: { label: 'Less reactive to stress', level: 'CALM', percent: 80 },
    confidence_daily: { label: 'More confident in everyday situations', level: 'HIGH CONFIDENCE', percent: 85 },
    thoughts_calmer: { label: 'More present and less in my head', level: 'HIGH CONTROL', percent: 90 },
    able_pause: { label: 'Calmer, even when life gets busy', level: 'CALM', percent: 80 }
  };
  // Gather bar data for Q21 and Q17, filtered by anxiety type
  const barsQ21 = q21Arr
  .slice(0, 3)
  .map(key => ({ key, ...barDataMap[key] }))
  .filter(b => b.label); 
  const barsQ17 = q17Arr
    .slice(0, 3)
    .map(key => ({ key, ...barDataMap[key] }))
    .filter(b => b.label);
  console.log('[PLAN] Q21 bar data:', barsQ21);
  console.log('[PLAN] Q17 bar data:', barsQ17);

  // Continue button handler
  const handleContinue = () => {
    let baseUrl = "";
  
    if (anxietyType === "panic") {
      baseUrl = "https://facebook.com";
    } else if (anxietyType === "avoidant") {
      baseUrl = "https://google.com";
    } else if (anxietyType === "ruminator") {
      baseUrl = "https://google.com";
    }
    resetAnswers();
    const redirectUrl = buildPaymentUrl(baseUrl);
    window.open(redirectUrl,"_blank");
  };
  
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
        onClick={handleContinue}
      >
        GET MY PLAN
      </button>
    </div>
  );

  const testimonials = [
    {
      parts: [
        "With her support,",
        "I’ve started to experience a genuine sense of calm and mental clarity.",
        "She helped me through the everyday struggles I thought I’d never escape.",
      ],
      author: "Verified Calm Reset Client",
    },
    {
      parts: [
        "I’ve tried many psychological services before but none of them seemed to work.",
        "With Tayyaba, it was very different.",
        "She gave me tools, space, and a rhythm I could actually stay with.",
      ],
      author: "Anonymous Clinical Participant",
    },
    {
      parts: [
        "With her support,",
        "I’ve started to experience a genuine sense of calm and mental clarity.",
        "She helped me through the everyday struggles I thought I’d never escape.",
      ],
      author: "Verified Calm Reset Client",
    },
  ];


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
            <div className="relative w-full sm:w-[900px] mx-auto mb-6 sm:mb-0 flex justify-center">
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
                className="w-full sm:w-[850px] h-40 sm:h-[400px] object-contain mx-auto"
              />
            </div>
            {/* Dynamic Bars Section */}
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 sm:gap-4 mt-0 w-full">
              <div className="w-full sm:w-96 rounded-xl p-6 shadow-md overflow-visible bg-gradient-to-br from-gray-400 to-gray-700 mb-4 sm:mb-0 min-h-[260px]">
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
              <div className="w-full sm:w-96 bg-white rounded-xl p-6 shadow-md overflow-visible mb-4 sm:mb-0 min-h-[260px]">
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
          <p className="font-bold text-center text-2xl mt-8">
            {anxietyType === "panic" && "I want to overcome panic attacks for good"}
            {anxietyType === "ruminator" && "I want to stop spiraling and finally feel mentally clear."}
            {anxietyType === "avoidant" && "I want to stop freezing and finally move forward with courage."}
          </p>
          <hr className="my-8 border-gray-300 border-t-4 mb-8" />

          {/* Why This Method Works So Well Section */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why This Method Works So Well</h2>
            <p className="text-gray-700 mb-10 text-lg max-w-2xl mx-auto">
              This reset blends 3 proven therapies for faster, deeper calm.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-4xl mx-auto">
              {/* CBT Card */}
              <div className="flex-1 border-2 border-emerald-100 rounded-xl bg-white px-6 py-8 shadow-2xl flex flex-col items-center min-w-[260px]">
                <img src="/QuizDesign/1.png" alt="CBT icon" className="w-12 h-12 mb-4" />
                <div className="text-left w-full">
                  <div className="font-bold text-lg text-gray-900 mb-1">CBT — Cognitive Behavioral Therapy</div>
                  <div className="text-emerald-700 font-semibold mb-2 text-sm">70–75% success rate</div>
                  <div className="text-gray-700 text-sm mb-1">Reframes unhelpful thoughts +<br/>rewires behavioral patterns that fuel anxiety.</div>
                </div>
              </div>
              {/* MCT Card */}
              <div className="flex-1 border-2 border-emerald-100 rounded-xl bg-white px-6 py-8 shadow-2xl flex flex-col items-center min-w-[260px]">
                <img src="/QuizDesign/2.png" alt="MCT icon" className="w-12 h-12 mb-4" />
                <div className="text-left w-full">
                  <div className="font-bold text-lg text-gray-900 mb-1">MCT — Metacognitive Therapy</div>
                  <div className="text-emerald-700 font-semibold mb-2 text-sm">~80% success for worry + spirals</div>
                  <div className="text-gray-700 text-sm mb-1">Teaches how to detach from obsessive loops and shift your relationship with thoughts.</div>
                </div>
              </div>
              {/* CBH Card */}
              <div className="flex-1 border-2 border-emerald-100 rounded-xl bg-white px-6 py-8 shadow-2xl flex flex-col items-center min-w-[260px]">
                <img src="/QuizDesign/3.png" alt="CBH icon" className="w-12 h-12 mb-4" />
                <div className="text-left w-full">
                  <div className="font-bold text-lg text-gray-900 mb-1">CBH — Cognitive Behavioral Hypnotherapy</div>
                  <div className="italic text-emerald-700 font-semibold mb-2 text-sm">Reinforces calm through body + memory</div>
                  <div className="text-gray-700 text-sm mb-1">Uses breath, imagery, and physical cues to retrain your nervous system to feel safe again.*</div>
                </div>
              </div>
            </div>
          </div>

          {/* Therapy Results + Life Without vs. With Support Section */}
          <div className="text-center mb-16">
            {/* Graphic representation */}
            <div className="flex justify-center items-center mb-0">
            <div className="w-96">
              <img 
                src="/QuizDesign/with_without support (2).png" 
                alt="Without support illustration" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-6 max-w-md mx-auto">
            “Why we stack them: In Clinical Psychologist Tayyaba Ali, MSc’s practice,
            combining these methods consistently delivers far higher success than any single
            therapy, even for clients who’d plateaued elsewhere."
          </p>

          <p className="text-[10px] text-gray-800 mb-8 text-center max-w-sm mx-auto">
            *Kirsch etal., meta‑analysis, 18 studies, 577 participants.<br />
            *Practice audit, 142 clients (2023); independent study in planning.
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
              {testimonials.map((t, idx) => (
                <div
                key={idx}
                className="bg-white border border-black rounded-lg p-8 text-left relative shadow-2xl flex flex-col justify-between min-h-[320px]"
              >
                {/* Quotation mark icon */}
                <img
                  src="/Icons/85.png"
                  alt="Quotation mark"
                  className="absolute top-0 left-9 -translate-x-1/2 -translate-y-1/2 w-10 h-10 opacity-70 pointer-events-none"
                />
              
                {/* Testimonial paragraphs */}
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-line">
                    &quot;
                    {t.parts.map((part, idx) => (
                      <span key={idx}>
                        {part}
                        {/* Add a line break after each part except the last */}
                        {idx !== t.parts.length - 1 && <br />}
                      </span>
                    ))}
                    &quot;
                  </p>
                </div>        
                {/* Author and footer section */}
                <div className="mt-8 flex flex-col gap-1 min-h-[80px]">
                  <p className="  text-black m-0"> — {t.author}</p>
                  <hr className="border-black" />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-flourishmint text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>       
              ))}
            </div>
          </div>

          <hr className="my-2 border-gray-300 border-t-4 mb-8" />

          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-center text-2xl font-semibold mb-6">Still Have Questions?</h2>
            
            <div className="space-y-3">
              {/* FAQ 1 */}
              <details className="group border rounded-md overflow-hidden">
                <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                  <span className="font-semibold">Q: Is this the same as formal therapy?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="bg-white text-gray-800 p-4 border-t">
                  <p><strong>A:</strong> No, this is a self-guided reset, built from the same tools used in therapy but designed for day-to-day calm. It can support you whether you're in therapy or not.</p>
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group border rounded-md overflow-hidden">
                <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                  <span className="font-semibold">Q: How fast can I feel results?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="bg-white text-gray-800 p-4 border-t">
                  <p><strong>A:</strong> Some people feel a shift within 1–2 weeks. Most see significant change within 4–6 weeks.</p>
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group border rounded-md overflow-hidden">
                <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                  <span className="font-semibold">Q: Do I really get everything right away?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="bg-white text-gray-800 p-4 border-t">
                  <p><strong>A:</strong> Yes, you get full access to all modules, tools, and resources from day one. You can start with the first step and move at your own pace, or explore the full library immediately.</p>
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group border rounded-md overflow-hidden">
                <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                  <span className="font-semibold">Q: What if it doesn’t help me?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="bg-white text-gray-800 p-4 border-t">
                  <p><strong>A:</strong> The methods in the program are evidence-based and have helped thousands of people with anxiety. If you apply the tools consistently and don’t feel a difference, you can reach out for personal guidance on how to get better results.</p>
                </div>
              </details>

              {/* FAQ 5 */}
              <details className="group border rounded-md overflow-hidden">
                <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                  <span className="font-semibold">Q: How long will I have access?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="bg-white text-gray-800 p-4 border-t">
                  <p><strong>A:</strong> You get lifetime access. Once you join, the program is yours to revisit whenever you need a reset or a refresher.</p>
                </div>
              </details>

              {/* FAQ 6 */}
              <details className="group border rounded-md overflow-hidden">
                <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                  <span className="font-semibold">Q: Can I use this alongside therapy or medication?</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="bg-white text-gray-800 p-4 border-t">
                  <p><strong>A:</strong> Yes, the tools complement other forms of treatment. Many members use the Reset alongside therapy or medication for faster progress and greater day-to-day calm.</p>
                </div>
              </details>
            </div>
          </div>
          <hr className="my-2 border-gray-300 border-t-4 mb-8 mt-12" />

          {/* Final Pricing Section */}
          <div className="text-center mb-16">
          <button
            className="mx-auto bg-emerald-400 hover:bg-emerald-500 text-white py-4 px-8 rounded-full font-bold text-xl tracking-wider text-center transition-colors block max-w-xs"
            onClick={handleContinue}
          >
            Get My Plan
          </button> 
          </div>
          <hr className="my-2 border-gray-300 border-t-4 mb-8 mt-8" />
          <p className="flex items-center justify-center gap-2 text-s text-gray-500 select-none mb-4">
            <span>© 2025 MindFlourish | All Rights Reserved </span>
          </p>
          </div>
        </div>
      </main>
    </div>
 
    
  );
};

export default QuizPlan;
