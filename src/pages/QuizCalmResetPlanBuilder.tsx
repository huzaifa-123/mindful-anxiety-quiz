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
      popupLine: "Setting your pace",
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
      popupLine: "Building your foundation",
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
      popupLine: "Aligning to your style",
      question: "Have you ever used Cognitive‑Behavioural Hypnotherapy (CBH) techniques?",
      options: [
        { id: "yes", text: "Yes" },
        { id: "no", text: "No" }
      ],
      answerKey: "plan_cbh"
    }
  ];

  useEffect(() => {
    // Animate only the currently active progress bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setProgressValues((prev) => {
        const updated = [...prev];
        updated[currentStep] = Math.min(progress, 100);
        return updated;
      });

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowQuestion(true);
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentStep]);

  const handleAnswer = (optionId: string) => {
    const currentStepData = steps[currentStep];
    setAnswer(currentStepData.answerKey as keyof typeof setAnswer, optionId);
    setShowQuestion(false);

    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 500);
    } else {
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
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative" style={{ transform: "translateY(-5vh)" }}>
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-10">

          {/* Single big page heading */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-flourishgreen leading-tight">
              Creating your
            </h1>
            <h2 className="text-3xl font-semibold text-flourishmint leading-tight">
              Personalized Calm Reset Plan
            </h2>
          </div>

          {/* Boxed container for progress bars */}
          <div className="border-4 border-flourishmint rounded-xl p-8 space-y-8 bg-white">
            {steps.slice(0, currentStep + 1).map((step, index) => {
              const progress = progressValues[index];
              const isCompleted = progress >= 100;
              return (
                <div key={index} className="w-full">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-4 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full bg-flourishmint rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="w-10 text-sm font-semibold text-gray-700 flex justify-center">
                      {isCompleted ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <circle cx="12" cy="12" r="10" strokeWidth={2} />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 10l-4 4-2-2"
                          />
                        </svg>
                      ) : (
                        `${Math.round(progress)}%`
                      )}
                    </div>
                  </div>

                  <div className="mt-2 text-gray-900 font-semibold">{step.progressText}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popup Question Modal */}
        {showQuestion && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm p-4 z-50">
            <div className="popup-container max-w-lg w-full rounded-xl border overflow-hidden bg-white shadow-lg popup-no-shadow-border z-auto">
              <div className="h-16 px-4 bg-flourishgreen flex flex-col justify-center">
                <h3 className="font-semibold text-lg mb-0.5 text-white leading-tight">
                  {steps[currentStep].title}
                </h3>
                <h4 className="font-semibold text-lg text-flourishmint leading-tight">
                  {steps[currentStep].subtitle}
                </h4>
              </div>

              <div className="px-8 py-6 text-left">
                <h2 className="mb-4 text-gray-900 text-lg font-semibold">
                  {steps[currentStep].question}
                </h2>
                <div className="flex justify-center gap-6">
                  {steps[currentStep].options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(opt.id)}
                      className="flex-1 py-2 rounded-full bg-flourishmint text-gray-800 font-medium hover:bg-gray-300 transition"
                      style={{ boxShadow: "none" }}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  );
};

export default QuizCalmResetPlanBuilder;
