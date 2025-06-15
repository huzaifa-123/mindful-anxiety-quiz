
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useState, useEffect } from "react";

const QuizCalmResetPlanBuilder = () => {
  const navigate = useNavigate();
  const { setAnswer } = useQuizAnswers();
  const [progressValues, setProgressValues] = useState([0, 0, 0]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopup, setCurrentPopup] = useState(0);

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
      answerKey: "plan_journaling"
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
      answerKey: "plan_tools"
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
      answerKey: "plan_support_style"
    }
  ];

  useEffect(() => {
    // Start the first progress bar animation (slower, 2-3 seconds)
    const animateFirstProgress = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setProgressValues([progress, 0, 0]);
        
        if (progress >= 100) {
          clearInterval(interval);
          // Show first popup after progress completes
          setTimeout(() => {
            setShowPopup(true);
            setCurrentPopup(0);
          }, 300);
        }
      }, 50); // 50ms * 50 iterations = 2.5 seconds
    };

    animateFirstProgress();
  }, []);

  const handlePopupAnswer = (optionId: string) => {
    const currentStepData = steps[currentPopup];
    setAnswer(currentStepData.answerKey as keyof typeof setAnswer, optionId);
    setShowPopup(false);

    if (currentPopup === 0) {
      // Animate second progress bar
      setTimeout(() => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 2;
          setProgressValues([100, progress, 0]);
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowPopup(true);
              setCurrentPopup(1);
            }, 300);
          }
        }, 50);
      }, 500);
    } else if (currentPopup === 1) {
      // Animate third progress bar
      setTimeout(() => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 2;
          setProgressValues([100, 100, progress]);
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowPopup(true);
              setCurrentPopup(2);
            }, 300);
          }
        }, 50);
      }, 500);
    } else {
      // Navigate to completion page
      setTimeout(() => {
        navigate("/quiz/plan-completion");
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="w-full max-w-5xl mx-auto">
          
          {/* Progress Cards - Perfectly aligned */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {steps.map((step, index) => (
              <div key={index} className="rounded-xl border-2 border-gray-200 overflow-hidden bg-white h-40">
                {/* Header section with green background - Fixed height for alignment */}
                <div className="h-20 p-4 bg-flourishgreen text-white flex flex-col justify-center">
                  <h3 className="font-semibold text-lg mb-1 text-white leading-tight">
                    {step.title}
                  </h3>
                  <h4 className="font-semibold text-lg text-flourishmint leading-tight">
                    {step.subtitle}
                  </h4>
                </div>

                {/* Progress section with white background - Fixed height for alignment */}
                <div className="h-20 p-4 bg-white flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      {step.progressText}
                    </span>
                    <span className="text-sm text-gray-600">
                      {Math.round(progressValues[index])}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full transition-all duration-300 ease-out bg-flourishmint"
                      style={{ width: `${progressValues[index]}%` }}
                    />
                  </div>
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
