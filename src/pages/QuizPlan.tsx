
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { calculateQuizResults } from "../utils/quizScoring";
import { Check } from "lucide-react";

const QuizPlan = () => {
  // 15 minute countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const { answers } = useQuizAnswers();
  
  // Calculate user's anxiety type
  const results = calculateQuizResults(answers);
  const anxietyType = results.dominantType;

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
    <div className="flex items-center gap-4">
      <span className="text-white text-sm font-medium">
        Discount is reserved for: {formatTime(timeLeft)}
      </span>
      <button className="bg-flourishmint hover:bg-green-400 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors">
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
      
      <main className="flex-1 px-4 py-12">
        <div className="w-full max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Best-Fit Therapeutic Techniques for You:
            </h1>
          </div>

          {/* Now vs Goal Section */}
          <div className="flex justify-center items-center gap-8 mb-16">
            {/* Now Section */}
            <div className="text-center">
              <div className="bg-flourishgreen text-white px-4 py-1 rounded text-sm font-medium mb-4 inline-block">
                Now
              </div>
              <div className="relative">
                <img 
                  src="/dummy-now-image.png" 
                  alt="Current anxious state" 
                  className="w-48 h-64 object-contain mb-4"
                />
                {/* Progress bars card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-xs">
                  <div className="space-y-4 text-left">
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Energy Level</span>
                      </div>
                      <div className="text-xs text-red-500 mb-2 font-medium">Low</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full w-1/4"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Well-being Level</span>
                      </div>
                      <div className="text-xs text-orange-500 mb-2 font-medium">Weak</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full w-2/5"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Self-esteem Level</span>
                      </div>
                      <div className="text-xs text-red-500 mb-2 font-medium">Low</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full w-1/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <div className="flex">
                <div className="w-6 h-6 bg-flourishgreen transform rotate-45 mr-1"></div>
                <div className="w-6 h-6 bg-flourishgreen transform rotate-45 mr-1"></div>
                <div className="w-6 h-6 bg-flourishgreen transform rotate-45"></div>
              </div>
            </div>

            {/* Goal Section */}
            <div className="text-center">
              <div className="bg-flourishgreen text-white px-4 py-1 rounded text-sm font-medium mb-4 inline-block">
                Your Goal
              </div>
              <div className="relative">
                <img 
                  src="/dummy-goal-image.png" 
                  alt="Goal confident state" 
                  className="w-48 h-64 object-contain mb-4"
                />
                {/* Progress bars card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-xs">
                  <div className="space-y-4 text-left">
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Energy Level</span>
                      </div>
                      <div className="text-xs text-green-600 mb-2 font-medium">High</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Well-being Level</span>
                      </div>
                      <div className="text-xs text-green-600 mb-2 font-medium">Strong</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Self-esteem Level</span>
                      </div>
                      <div className="text-xs text-green-600 mb-2 font-medium">High</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Experience and Calm Reset Vision Section */}
          <div className="flex justify-center gap-12 mb-16">
            {/* Current Experience */}
            <div className="w-full max-w-sm">
              <div className="bg-flourishgreen text-white px-6 py-3 rounded-full text-center font-semibold mb-4">
                Current Experience
              </div>
              <div className="text-center mb-6">
                <h3 className="text-gray-700 text-sm font-medium italic">
                  "What You're Navigating Now"
                </h3>
              </div>
              
              <div className="mb-6">
                <ul className="space-y-3">
                  {content.currentExperience.mainPoints.map((point, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <span className="text-gray-400 mr-3">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-flourishmint font-semibold text-sm mb-3">
                  Focus Areas:
                </h4>
                <ul className="space-y-3">
                  {content.currentExperience.focusAreas.map((area, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <span className="text-gray-400 mr-3">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Calm Reset Vision */}
            <div className="w-full max-w-sm">
              <div className="bg-flourishgreen text-white px-6 py-3 rounded-full text-center font-semibold mb-4">
                Calm Reset Vision
              </div>
              <div className="text-center mb-6">
                <h3 className="text-gray-700 text-sm font-medium italic">
                  "What We're Supporting You Toward"
                </h3>
              </div>
              
              <div className="mb-6">
                <ul className="space-y-3">
                  {content.calmResetVision.mainPoints.map((point, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <span className="text-gray-400 mr-3">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-flourishmint font-semibold text-sm mb-3">
                  Focus Areas:
                </h4>
                <ul className="space-y-3">
                  {content.calmResetVision.focusAreas.map((area, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <span className="text-gray-400 mr-3">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-16">
            <div className="max-w-md mx-auto space-y-4">
              {/* One Time Payment Option */}
              <div className="relative">
                <div className="bg-flourishgreen text-white text-center py-2 rounded-t-lg">
                  <span className="text-sm font-medium flex items-center justify-center gap-1">
                    ★ Most Popular!
                  </span>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="w-4 h-4" 
                      defaultChecked
                    />
                    <span className="font-semibold text-gray-900">ONE TIME PAYMENT</span>
                  </div>
                  <div className="text-right">
                    <div className="bg-flourishmint text-white px-3 py-1 rounded text-sm font-bold">
                      $70.00
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="line-through">$147.00</span>
                    </div>
                    <div className="text-xs text-flourishmint font-medium">
                      52% Discount
                    </div>
                  </div>
                </div>
              </div>

              {/* 3x Installment Plan Option */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-4 h-4"
                  />
                  <span className="font-semibold text-gray-900">3X INSTALLMENT PLAN</span>
                </div>
                <div className="text-right">
                  <div className="bg-flourishmint text-white px-3 py-1 rounded text-sm font-bold">
                    $25.00
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="line-through">$49.00</span>
                  </div>
                  <div className="text-xs text-flourishmint font-medium">
                    49% Discount
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Free Trial Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Try the 7-Day Anxiety Reset — Free
            </h2>
            <p className="text-gray-700 mb-2 font-medium">
              Your Calm Reset Plan is ready.
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Access the first 7 days at no cost and start rewiring your anxiety response today.
            </p>
            
            <div className="bg-gray-800 text-white px-4 py-2 rounded inline-block mb-6">
              <span className="text-sm font-medium">You'll receive:</span>
            </div>
            
            <div className="max-w-sm mx-auto space-y-2 mb-8">
              <div className="text-sm text-gray-700 text-left">• Daily MCT tools for overthinking release</div>
              <div className="text-sm text-gray-700 text-left">• CBT-based action steps to reduce avoidance</div>
              <div className="text-sm text-gray-700 text-left">• Soothing CBH audio tracks to calm your system</div>
            </div>
            
            <button className="bg-flourishmint hover:bg-green-400 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Start Free Trial
            </button>
          </div>

          {/* Our Goals for You Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Our Goals for You
            </h2>
            <div className="max-w-sm mx-auto space-y-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 bg-flourishmint rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Help you feel calmer throughout your day</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 bg-flourishmint rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Stop the spiral before it begins</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 bg-flourishmint rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Improve clarity, energy, and sleep</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 bg-flourishmint rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Build emotional resilience with lasting strategies</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 bg-flourishmint rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Support you without overwhelm</span>
              </div>
            </div>
          </div>

          {/* Mid-Funnel Invitation Button */}
          <div className="flex justify-center">
            <button className="bg-flourishmint hover:bg-green-400 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Mid-Funnel Invitation
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPlan;
