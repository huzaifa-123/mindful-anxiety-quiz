import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { calculateQuizResults } from "../utils/quizScoring";
import ReactDOM from "react-dom";


const QuizPlan = () => {
  // 15 minute countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const { answers } = useQuizAnswers();
  //const quizResults = calculateQuizResults(answers);
  //const paymentRef = useRef(null);
  const { resetAnswers } = useQuizAnswers();


  // Calculate user's anxiety type
  const results = calculateQuizResults(answers);


  // Centralized image path for before/after comparison
  const [selectedPayment, setSelectedPayment] = useState('one-time');
  const full_name = answers.name || "";
  const email = answers.email || "";
  const phone = answers.phone || "";
  const anxietyType = results.dominantType;
  const severity = results.severity;

  // Dynamic before/after image based on anxiety type
  let beforeAfterImage = '';
  if (anxietyType === 'panic') {
    beforeAfterImage = '/QuizDesign/PANIC CHECKOUT SECTION.jpg';
  } else if (anxietyType === 'avoidant') {
    beforeAfterImage = '/QuizDesign/AVOIDER CHECKOUT SECTION.png';
  } else if (anxietyType === 'ruminator') {
    beforeAfterImage = '/QuizDesign/RUMINATOR CHECKOUT SECTION.jpg';
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
      baseUrl = "https://mindflourish.co/order-page-panic";
    } else if (anxietyType === "avoidant") {  
      baseUrl = "https://mindflourish.co/order-page-avoidant";
    } else if (anxietyType === "ruminator") {
      baseUrl = "https://mindflourish.co/order-page-ruminator";
    }
    const redirectUrl = buildPaymentUrl(baseUrl);
    window.location.href = redirectUrl;
    resetAnswers();
  };

  const buildPaymentUrl = (baseUrl: string): string => {
    const params = new URLSearchParams({
      full_name,
      // gender,
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
    <div className="flex justify-end items-center gap-4">
      <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap">
        Discount ends in {formatTime(timeLeft)}
      </span>
      <button
        className="bg-flourishmint hover:bg-green-400 text-white 
                  px-3 sm:px-6 md:px-8 py-1.5 sm:py-2 
                  rounded-full text-xs sm:text-sm md:text-base 
                  font-semibold transition-colors"
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
        " ",
        "She helped me through the everyday struggles I thought I’d never escape.",
      ],
      author: "Verified Calm Reset Client",
    },
    {
      parts: [
        "I’ve tried many psychological services before but none of them seemed to work.",
        " ",
        "With Tayyaba, it was very different.",
        " ",
        "She gave me tools, space, and a rhythm I could actually stay with.",
      ],
      author: "Anonymous Clinical Participant",
    },
    {
      parts: [
        "At the start I was always struggling with constant worry and panic, and honestly didn’t think anything could help.",
        " ",
        "But over time… things started to change. I feel more in control now and much, much lighter.",
        " ",
        "Grateful doesn’t even begin to cover how I feel.",
      ],
      author: "Verified Calm Reset Client",
    },
  ];



  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishgreen">
      <div className="sticky top-0 z-10">
        <div className="w-full max-w-6xl mx-auto bg-flourishgreen px-6 sm:px-10">
          <Header timer={<TimerDisplay />} />
        </div>
      </div>
      <main className="flex-1 px-2 bg-flourishgreen overflow-y-hidden">
      <div className="relative w-full max-w-5xl mx-auto bg-white p-6 sm:p-10 min-h-screen flex flex-col">
          <div className="text-center mb-16 px-4 sm:px-8 bg-white ">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Your 7-Day Anxiety Reset is Ready — £0 Today
          </h1>
          <p className="text-base sm:text-xl font-medium mb-8 px-2 sm:px-16">
            Unlock Instantly: The entire 7-Day Reset — start with a 2-Minute
            Body-Ground Reset to Feel Safe and Centered.
          </p>

          <div className="flex items-center justify-center mb-8 text-sm text-left max-w-xl mx-auto px-2">
            <input
              type="checkbox"
              id="access-checkbox"
              defaultChecked
              className="
                peer mr-2 h-4 w-4 shrink-0 rounded border-flourishmint bg-flourishmint/10
                appearance-none checked:bg-flourishgreen checked:border-flourishgreen
                relative
                before:content-[''] before:absolute before:inset-0 before:flex before:items-center before:justify-center
                checked:before:content-['✓'] checked:before:text-white checked:before:text-xs
              "
            />
            <label htmlFor="access-checkbox" className="cursor-pointer">
              Yes — give me access now; I’ll start with the 2-Minute
              Body-Ground Reset to feel safe and centered.
            </label>
          </div>

          <button
            className="mx-auto bg-flourishmint hover:bg-green-400 text-white py-4 px-15 rounded-full font-bold text-lg sm:text-xl tracking-wider text-center transition-colors block w-full max-w-md"
            onClick={handleContinue}
          >
            Start My 7-Day Test-Drive — £0 Today
          </button>

          <div className="text-gray-500 text-xs mt-4">
            SSL Secure | PCI Compliant | GMC-Registered Clinician
          </div>
        </div>
          {/* Main Heading */}
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="bg-emerald-600 text-white rounded-lg p-6 shadow-lg flex-1">

              <h3 className="text-xl font-bold mb-4 text-center">
                Here's What Happens Next
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-300 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Go straight from your quiz results to a personalized 7-day
                    reset plan matched to your anxiety type.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-300 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    You'll get instant access to your Day 1 tool so you can
                    start feeling a shift — with daily check-ins and calming
                    support guiding you to results within 7 days.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-emerald-100 border border-emerald-400 rounded-lg p-6 shadow-lg flex-1">
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <span className="font-bold">
                      Free for 7 Days – Cancel Anytime with 1 Click!
                    </span>
                    <p className="mt-1 text-sm">
                      Cancel anytime during your FREE trial — no payment will
                      be taken unless you continue after 7 days!
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <span className="font-bold">
                      60-Day Money-Back Guarantee Once Your Trial Ends!
                    </span>
                    <p className="mt-1 text-sm">
                      If you continue after your trial but aren't 100%
                      satisfied, we will refund you in full.
                    </p>  
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <hr className="w-[calc(100%+theme(space.12))] sm:w-[calc(100%+theme(space.20))] -ml-6 sm:-ml-10 my-8 mb-16 border-none h-6 bg-flourishgreen" />

          <div className="max-w-[900px] w-full mx-auto px-4 sm:px-0 flex flex-col">
            {/* Heading with minimal bottom margin and tight line height */}
            <div className="text-center mb-2">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-none mb-6">
                Your Personalized Reset Journey
              </h1>
            </div>
            
            {/* Image and bars wrapper with no padding or margin, no scale */}
            <div className="w-full overflow-hidden">
              {/* Image with zero margin bottom */}
              <div className="max-w-[600px] mx-auto w-full flex flex-col leading-none">
                {/* Image */}
                <img
                  src={beforeAfterImage}
                  alt="Before and after transformation comparison"
                  className="w-full h-auto object-contain  mt-4 block"
                  loading="lazy"
                />
              {/* Bars container - flex row with gap, zero vertical margin/padding */}
              <div className="flex flex-row gap-4 w-full">
                  {/* Bars Q21 */}
                  <div className="flex-1 min-w-0 rounded-xl p-6 shadow-md bg-gradient-to-br from-gray-400 to-gray-700">
                  {barsQ21.length ? (
                    barsQ21.map((bar) => (
                      <div key={bar.key} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-semibold text-base">{barTextMap[bar.key]?.label || ''}</span>
                          <span className="text-xs text-gray-200 font-medium italic">{barTextMap[bar.key]?.level || ''}</span>
                        </div>
                        <div className="relative w-full h-2 bg-gray-300 rounded-full">
                          <div
                            className="absolute left-0 top-0 h-2 rounded-full"
                            style={{
                              width: `${barTextMap[bar.key]?.percent || 0}%`,
                              background: 'linear-gradient(90deg, #fbbf24 0%, #f87171 100%)',
                            }}
                          />
                          <div
                            className="absolute top-1/2"
                            style={{
                              left: `calc(${barTextMap[bar.key]?.percent || 0}% - 10px)`,
                              transform: 'translateY(-50%)',
                            }}
                          >
                            <div className="w-5 h-5 bg-white border-2 border-orange-400 rounded-full shadow"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-8"></div>
                  )}
                </div>
                {/* Bars Q17 */}
                <div className="flex-1 min-w-0 rounded-xl p-6 shadow-md bg-white">
                  {barsQ17.length ? (
                    barsQ17.map((bar) => (
                      <div key={bar.key} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-800 font-semibold text-base">{barTextMap[bar.key]?.label || ''}</span>
                          <span className="text-xs text-emerald-500 font-medium italic">{barTextMap[bar.key]?.level || ''}</span>
                        </div>
                        <div className="relative w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className="absolute left-0 top-0 h-2 rounded-full bg-emerald-400"
                            style={{ width: `${barTextMap[bar.key]?.percent || 0}%` }}
                          />
                          <div
                            className="absolute top-1/2"
                            style={{
                              left: `calc(${barTextMap[bar.key]?.percent || 0}% - 10px)`,
                              transform: 'translateY(-50%)',
                            }}
                          >
                            <div className="w-5 h-5 bg-white border-2 border-emerald-400 rounded-full shadow"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-8"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
            {/* ===== Caption ===== */}
            <p className="font-bold text-center text-2xl mt-10">
              {anxietyType === "panic" &&
                "I want to take control of my anxiety for good"}
              {anxietyType === "ruminator" &&
                "I want to stop spiraling and finally feel mentally clear."}
              {anxietyType === "avoidant" &&
                "I want to stop freezing and finally move forward with courage."}
            </p>
            <hr className="w-[calc(100%+theme(space.12))] sm:w-[calc(100%+theme(space.20))] -ml-6 sm:-ml-10 my-8 mb-16 border-none h-6 bg-flourishgreen" />

            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-2">
                What's Inside Your Reset Plan
              </h2>
              <p className="text-lg font-medium text-gray-700 mb-8">
                Your 7-Day Reset blends micro-tools that rewire your nervous
                system, gently and fast.
              </p>
              <div className="space-y-4">
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-lg p-4 flex items-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium text-left">
                    4-Minute Exercise — calms racing thoughts &amp; heart within
                    one song.
                  </span>
                </div>
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-lg p-4 flex items-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium text-left">
                    Break free from hidden triggers — learn a 3-step interrupt
                    pattern.
                  </span>
                </div>
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-lg p-4 flex items-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium text-left">
                    Rapid-relief tool — activate your calm response on command.
                  </span>
                </div>
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-lg p-4 flex items-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium text-left">
                    Rewire anxious thoughts — swap catastrophising for clear
                    decisions.
                  </span>
                </div>
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-lg p-4 flex items-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium text-left">
                    Regain physical calm — release tension &amp; steady
                    breathing in minutes.
                  </span>
                </div>
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-lg p-4 flex items-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium text-left">
                    Track progress — watch your anxiety index drop every day.
                  </span>
                </div>
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-lg p-4 flex items-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-500 mr-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium text-left">
                    Seven micro-moves — follow daily or binge; all unlocked now.
                  </span>
                </div>
              </div>
            </div>
            <hr className="w-[calc(100%+theme(space.12))] sm:w-[calc(100%+theme(space.20))] -ml-6 sm:-ml-10 my-8 mb-16 border-none h-6 bg-flourishgreen" />

            {/* Why This Method Works So Well Section */}
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why This Method Works So Well
              </h2>
              <p className="text-gray-700 mb-10 text-lg max-w-2xl mx-auto">
                This reset blends 3 proven therapies for faster, deeper calm.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-4xl mx-auto">
                {/* CBT Card */}
                <div className="flex-1 border-2 border-emerald-100 rounded-xl bg-white px-6 py-8 shadow-2xl flex flex-col items-center min-w-[260px]">
                  <img
                    src="/QuizDesign/1.png"
                    alt="CBT icon"
                    className="w-12 h-12 mb-4"
                  />
                  <div className="text-left w-full">
                    <div className="font-bold text-lg text-gray-900 mb-1">
                      CBT — Cognitive Behavioral Therapy
                    </div>
                    <div className="text-emerald-700 font-semibold mb-2 text-sm">
                      70–75% success rate
                    </div>
                    <div className="text-gray-700 text-sm mb-1">
                      Reframes unhelpful thoughts +<br />
                      rewires behavioral patterns that fuel anxiety.
                    </div>
                  </div>
                </div>
                {/* MCT Card */}
                <div className="flex-1 border-2 border-emerald-100 rounded-xl bg-white px-6 py-8 shadow-2xl flex flex-col items-center min-w-[260px]">
                  <img
                    src="/QuizDesign/2.png"
                    alt="MCT icon"
                    className="w-12 h-12 mb-4"
                  />
                  <div className="text-left w-full">
                    <div className="font-bold text-lg text-gray-900 mb-1">
                      MCT — Metacognitive Therapy
                    </div>
                    <div className="text-emerald-700 font-semibold mb-2 text-sm">
                      ~80% success for worry + spirals
                    </div>
                    <div className="text-gray-700 text-sm mb-1">
                      Teaches how to detach from obsessive loops and shift your
                      relationship with thoughts.
                    </div>
                  </div>
                </div>
                {/* CBH Card */}
                <div className="flex-1 border-2 border-emerald-100 rounded-xl bg-white px-6 py-8 shadow-2xl flex flex-col items-center min-w-[260px]">
                  <img
                    src="/QuizDesign/3.png"
                    alt="CBH icon"
                    className="w-12 h-12 mb-4"
                  />
                  <div className="text-left w-full">
                    <div className="font-bold text-lg text-gray-900 mb-1">
                      CBH — Cognitive Behavioral Hypnotherapy
                    </div>
                    <div className="italic text-emerald-700 font-semibold mb-2 text-sm">
                      Reinforces calm through body + memory
                    </div>
                    <div className="text-gray-700 text-sm mb-1">
                      Uses breath, imagery, and physical cues to retrain your
                      nervous system to feel safe again.*
                    </div>
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
                “Why we stack them: In Clinical Psychologist Tayyaba Ali, MSc’s
                practice, combining these methods consistently delivers far
                higher success than any single therapy, even for clients who’d
                plateaued elsewhere."
              </p>

              <p className="text-[10px] text-gray-800 mb-8 text-center max-w-sm mx-auto">
                *Kirsch etal., meta‑analysis, 18 studies, 577 participants.
                <br />
                *Practice audit, 142 clients (2023); independent study in
                planning.
              </p>
              {/* Comparison columns */}
              <div className="flex justify-center gap-8 max-w-2xl mx-auto">
                <div className="flex-1">
                  <div className="bg-flourishgreen text-white  px-4 py-2 rounded-full mb-4">
                    <span className="text-sm font-medium">
                      Without Support:
                    </span>
                  </div>
                  <ul className="space-y-2 text-left text-sm text-gray-700">
                    <li>• You may continue battling the same cycles</li>
                    <li>• Your nervous system stays reactive</li>
                    <li>• Daily life feels heavier than it needs to</li>
                  </ul>
                </div>

                <div className="flex-1">
                  <div className="bg-flourishgreen text-white px-4 py-2 rounded-full mb-4">
                    <span className="text-sm font-medium">
                      With Calm Reset:
                    </span>
                  </div>
                  <ul className="space-y-2 text-left text-sm text-gray-700">
                    <li>• Thought spirals become less intense</li>
                    <li>• You feel cleaner, lighter, and more focused</li>
                    <li>• You build emotional safety from within</li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="w-[calc(100%+theme(space.12))] sm:w-[calc(100%+theme(space.20))] -ml-6 sm:-ml-10 my-8 mb-16 border-none h-6 bg-flourishgreen" />
            {/* Testimonials Section */}
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Testimonials
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-black rounded-lg p-8 text-center relative shadow-2xl flex flex-col justify-between min-h-[320px]"
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

            <hr className="w-[calc(100%+theme(space.12))] sm:w-[calc(100%+theme(space.20))] -ml-6 sm:-ml-10 my-8 mb-16 border-none h-6 bg-flourishgreen" />

            <div className="w-full max-w-3xl mx-auto">
              <h2 className="text-center text-2xl font-semibold mb-6">
                Still Have Questions?
              </h2>

              <div className="space-y-3">
                {/* FAQ 1 */}
                <details className="group border rounded-md overflow-hidden">
                  <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                    <span className="font-semibold">
                      Q: Is this the same as formal therapy?
                    </span>
                    <svg
                      className="w-5 h-5 transform group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="bg-white text-gray-800 p-4 border-t">
                    <p>
                      <strong>A:</strong> No, this is a self-guided reset, built
                      from the same tools used in therapy but designed for
                      day-to-day calm. It can support you whether you're in
                      therapy or not.
                    </p>
                  </div>
                </details>

                {/* FAQ 2 */}
                <details className="group border rounded-md overflow-hidden">
                  <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                    <span className="font-semibold">
                      Q: How fast can I feel results?
                    </span>
                    <svg
                      className="w-5 h-5 transform group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="bg-white text-gray-800 p-4 border-t">
                    <p>
                      <strong>A:</strong> Some people feel a shift within 1–2
                      weeks. Most see significant change within 4–6 weeks.
                    </p>
                  </div>
                </details>

                {/* FAQ 3 */}
                <details className="group border rounded-md overflow-hidden">
                  <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                    <span className="font-semibold">
                      Q: Do I really get everything right away?
                    </span>
                    <svg
                      className="w-5 h-5 transform group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="bg-white text-gray-800 p-4 border-t">
                    <p>
                      <strong>A:</strong> Yes, you get full access to all
                      modules, tools, and resources from day one. You can start
                      with the first step and move at your own pace, or explore
                      the full library immediately.
                    </p>
                  </div>
                </details>

                {/* FAQ 4 */}
                <details className="group border rounded-md overflow-hidden">
                  <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                    <span className="font-semibold">
                      Q: What if it doesn’t help me?
                    </span>
                    <svg
                      className="w-5 h-5 transform group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="bg-white text-gray-800 p-4 border-t">
                    <p>
                      <strong>A:</strong> The methods in the program are
                      evidence-based and have helped thousands of people with
                      anxiety. If you apply the tools consistently and don’t
                      feel a difference, you can reach out for personal guidance
                      on how to get better results.
                    </p>
                  </div>
                </details>

                {/* FAQ 5 */}
                <details className="group border rounded-md overflow-hidden">
                  <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                    <span className="font-semibold">
                      Q: How long will I have access?
                    </span>
                    <svg
                      className="w-5 h-5 transform group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="bg-white text-gray-800 p-4 border-t">
                    <p>
                      <strong>A:</strong> You get lifetime access. Once you
                      join, the program is yours to revisit whenever you need a
                      reset or a refresher.
                    </p>
                  </div>
                </details>

                {/* FAQ 6 */}
                <details className="group border rounded-md overflow-hidden">
                  <summary className="bg-[#274C3A] text-white px-4 py-3 cursor-pointer flex justify-between items-center">
                    <span className="font-semibold">
                      Q: Can I use this alongside therapy or medication?
                    </span>
                    <svg
                      className="w-5 h-5 transform group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="bg-white text-gray-800 p-4 border-t">
                    <p>
                      <strong>A:</strong> Yes, the tools complement other forms
                      of treatment. Many members use the Reset alongside therapy
                      or medication for faster progress and greater day-to-day
                      calm.
                    </p>
                  </div>
                </details>
              </div>
            </div>
            <hr className="w-[calc(100%+theme(space.12))] sm:w-[calc(100%+theme(space.20))] -ml-6 sm:-ml-10 my-8 mb-16 border-none h-6 bg-flourishgreen" />

            {/* Final Pricing Section */}
            <div className="text-center mb-16 px-4 sm:px-8 ">
                            <button
                className="mx-auto bg-flourishmint hover:bg-green-400 text-white py-4 px-15 rounded-full font-bold text-lg sm:text-xl tracking-wider text-center transition-colors block w-full max-w-md"
                onClick={handleContinue}
              >
                Start My 7-Day Test-Drive — £0 Today
              </button>

              <div className="text-gray-500 text-xs mt-4">
                SSL Secure | PCI Compliant | GMC-Registered Clinician
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPlan;
