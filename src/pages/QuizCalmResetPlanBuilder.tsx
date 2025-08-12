
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useState, useEffect } from "react";

const QuizCalmResetPlanBuilder = () => {
  const navigate = useNavigate();
  const { setAnswer } = useQuizAnswers();
  const [progressValues, setProgressValues] = useState([0, 0, 0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);

  const steps = [
    {
      title: "Creating your",
      subtitle: "Personalized Calm Reset Plan...",
      progressText: "Setting your pace",
      question: "Ever tried Cognitive Behavioural Therapy (CBT) before? ",
      options: [
        { id: "yes", text: "Yes" },
        { id: "no", text: "No" }
      ],
      answerKey: "plan_cbt"
    },
    {
      title: "Customizing your",
      subtitle: "support tools...",
      progressText: "Building your foundation",
      question: "Have you heard of Metacognitive Therapy (MCT) before?",
      options: [
        { id: "yes", text: "Yes" },
        { id: "no", text: "No" }
      ],
      answerKey: "plan_mct"
    },
    {
      title: "Finalizing your",
      subtitle: "Personalized Plan...",
      progressText: "Aligning to your style",
      question: "Have you ever used Cognitive‑Behavioural Hypnotherapy (CBH) techniques?",
      options: [
        { id: "yes", text: "Yes" },
        { id: "no", text: "No" }
      ],
      answerKey: "plan_cbh"
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
          // Show question in first progress bar after progress completes
          setTimeout(() => {
            setShowQuestion(true);
            setCurrentStep(0);
          }, 300);
        }
      }, 50); // 50ms * 50 iterations = 2.5 seconds
    };

    animateFirstProgress();
  }, []);

  const handleAnswer = (optionId: string) => {
    const currentStepData = steps[currentStep];
    setAnswer(currentStepData.answerKey as keyof typeof setAnswer, optionId);
    setShowQuestion(false);

    if (currentStep === 0) {
      // Animate second progress bar
      setTimeout(() => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 2;
          setProgressValues([100, progress, 0]);
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowQuestion(true);
              setCurrentStep(1);
            }, 300);
          }
        }, 50);
      }, 500);
    } else if (currentStep === 1) {
      // Animate third progress bar
      setTimeout(() => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 2;
          setProgressValues([100, 100, progress]);
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowQuestion(true);
              setCurrentStep(2);
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
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Progress Cards - Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`rounded-xl border-2 border-gray-200 overflow-hidden bg-white transition-all duration-500 ${
                  showQuestion && currentStep === index ? 'h-auto min-h-[280px]' : 'h-40'
                } max-w-md mx-auto w-full`}
              >
                {/* Header section with green background */}
                <div className="h-20 p-4 bg-flourishgreen text-white flex flex-col justify-center">
                  <h3 className="font-semibold text-lg mb-1 text-white leading-tight">
                    {step.title}
                  </h3>
                  <h4 className="font-semibold text-lg text-flourishmint leading-tight">
                    {step.subtitle}
                  </h4>
                </div>

                {/* Progress section */}
                <div className="h-20 p-4 bg-white flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{step.progressText}</span>
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

                {/* Question section */}
                {showQuestion && currentStep === index && (
                  <div className="p-4 bg-white border-t border-gray-100">
                    <h2 className="font-semibold text-lg text-flourishgreen mb-4 text-center">
                      {step.question}
                    </h2>

                    <div className="space-y-3">
                      {step.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswer(option.id)}
                          className="w-full p-3 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-flourishmint hover:bg-flourishmint/5 transition-colors text-gray-700 text-sm"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizCalmResetPlanBuilder;
