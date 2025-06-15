
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useState, useEffect } from "react";
import { Progress } from "../components/ui/progress";

const QuizCalmResetPlanBuilder = () => {
  const navigate = useNavigate();
  const { setAnswer } = useQuizAnswers();
  const [currentStep, setCurrentStep] = useState(0); // 0 = showing progress bars, 1-3 = popup questions
  const [progressValues, setProgressValues] = useState([0, 0, 0]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopup, setCurrentPopup] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const steps = [
    {
      title: "Creating your",
      subtitle: "Personalized Calm Reset Plan...",
      progressText: "Setting your pace",
      question: "Are you familiar with journaling as a tool for emotional self-awareness?",
      options: [
        { id: "yes_used_before", text: "Yes, I've used it before" },
        { id: "no_open_to_it", text: "No, but I'm open to it" }
      ],
      answerKey: "plan_journaling" as keyof import("../context/QuizAnswersContext").QuizAnswer
    },
    {
      title: "Customizing your",
      subtitle: "support tools...",
      progressText: "Building your foundation",
      question: "Do you find it helpful to use breath or body-based tools when managing stress?",
      options: [
        { id: "yes_respond_well", text: "Yes, I respond well to them" },
        { id: "mentally_focused", text: "I'm more mentally focused" }
      ],
      answerKey: "plan_tools" as keyof import("../context/QuizAnswersContext").QuizAnswer
    },
    {
      title: "Finalizing your",
      subtitle: "Personalized Plan...",
      progressText: "Aligning to your style",
      question: "Are you someone who prefers guided support or independent tools?",
      options: [
        { id: "prefer_guidance", text: "I prefer guidance and structure" },
        { id: "own_pace", text: "I like to go at my own pace" }
      ],
      answerKey: "plan_support_style" as keyof import("../context/QuizAnswersContext").QuizAnswer
    }
  ];

  useEffect(() => {
    // Start the progress bar animations
    const animateProgressBars = () => {
      // First progress bar
      setTimeout(() => {
        setProgressValues([100, 0, 0]);
        setTimeout(() => {
          setShowPopup(true);
          setCurrentPopup(0);
        }, 500);
      }, 800);
    };

    animateProgressBars();
  }, []);

  const handlePopupAnswer = (optionId: string) => {
    const currentStepData = steps[currentPopup];
    setAnswer(currentStepData.answerKey, optionId);
    setShowPopup(false);

    if (currentPopup === 0) {
      // Move to second progress bar
      setTimeout(() => {
        setProgressValues([100, 100, 0]);
        setTimeout(() => {
          setShowPopup(true);
          setCurrentPopup(1);
        }, 500);
      }, 500);
    } else if (currentPopup === 1) {
      // Move to third progress bar
      setTimeout(() => {
        setProgressValues([100, 100, 100]);
        setTimeout(() => {
          setShowPopup(true);
          setCurrentPopup(2);
        }, 500);
      }, 500);
    } else {
      // Show completion
      setTimeout(() => {
        setShowCompletion(true);
        setTimeout(() => {
          navigate("/quiz/next-step"); // Update this to your next route
        }, 3000);
      }, 500);
    }
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
        <div className="w-full sticky top-0 z-10">
          <Header withBack />
        </div>
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
            <div className="mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-flourishmint rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-flourishgreen">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </div>
              <h1 className="font-semibold text-2xl text-flourishgreen mb-4">
                Your Personalized Plan is Ready!
              </h1>
              <p className="text-gray-700 text-base leading-relaxed max-w-xl">
                Based on your responses, we've created a tailored approach that combines proven methodologies with your personal preferences. Your journey toward lasting calm begins with understanding that anxiety isn't something to fight, but rather something to work with through gentle, consistent practices that honor your unique needs and lifestyle.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="w-full max-w-5xl mx-auto">
          
          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-xl border-2 transition-all duration-500 ${
                  progressValues[index] === 100
                    ? 'bg-flourishgreen text-white border-flourishgreen'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                <div className="mb-4">
                  <h3 className={`font-semibold text-lg mb-1 ${
                    progressValues[index] === 100 ? 'text-white' : 'text-flourishgreen'
                  }`}>
                    {step.title}
                  </h3>
                  <h4 className={`font-semibold text-lg ${
                    progressValues[index] === 100 ? 'text-flourishmint' : 'text-flourishgreen'
                  }`}>
                    {step.subtitle}
                  </h4>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${
                      progressValues[index] === 100 ? 'text-flourishmint' : 'text-gray-600'
                    }`}>
                      {step.progressText}
                    </span>
                    <span className={`text-sm ${
                      progressValues[index] === 100 ? 'text-flourishmint' : 'text-gray-600'
                    }`}>
                      {progressValues[index]}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${
                    progressValues[index] === 100 ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        progressValues[index] === 100 ? 'bg-flourishmint' : 'bg-flourishgreen'
                      }`}
                      style={{ width: `${progressValues[index]}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm opacity-80">
                  {step.question}
                </div>

                {/* Buttons placeholder */}
                <div className="mt-4 space-y-2">
                  {step.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-2 rounded-lg border text-xs text-center ${
                        progressValues[index] === 100
                          ? 'border-white/30 text-white/70'
                          : 'border-gray-300 text-gray-500'
                      }`}
                    >
                      {option.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 animate-scale-in">
              <div className="text-center mb-6">
                <h2 className="font-semibold text-xl text-flourishgreen mb-4">
                  {steps[currentPopup].question}
                </h2>
              </div>
              
              <div className="space-y-3">
                {steps[currentPopup].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handlePopupAnswer(option.id)}
                    className="w-full p-4 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-flourishmint hover:bg-flourishmint/5 transition-colors text-gray-700"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizCalmResetPlanBuilder;
