
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useState, useEffect } from "react";
import { Progress } from "../components/ui/progress";

const QuizCalmResetPlanBuilder = () => {
  const navigate = useNavigate();
  const { setAnswer } = useQuizAnswers();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showCompletion, setShowCompletion] = useState(false);

  const steps = [
    {
      header: "Creating your Personalized Calm Reset Plan...",
      progressText: "Setting your pace",
      progress: 33,
      question: "Are you familiar with journaling as a tool for emotional self-awareness?",
      options: [
        { id: "yes_used_before", text: "Yes, I've used it before" },
        { id: "no_open_to_it", text: "No, but I'm open to it" }
      ],
      answerKey: "plan_journaling"
    },
    {
      header: "Customizing your support tools...",
      progressText: "Building your foundation",
      progress: 66,
      question: "Do you find it helpful to use breath or body-based tools when managing stress?",
      options: [
        { id: "yes_respond_well", text: "Yes, I respond well to them" },
        { id: "mentally_focused", text: "I'm more mentally focused" }
      ],
      answerKey: "plan_tools"
    },
    {
      header: "Finalizing your Personalized Plan...",
      progressText: "Aligning to your style",
      progress: 100,
      question: "Are you someone who prefers guided support or independent tools?",
      options: [
        { id: "prefer_guidance", text: "I prefer guidance and structure" },
        { id: "own_pace", text: "I like to go at my own pace" }
      ],
      answerKey: "plan_support_style"
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [currentStepData.answerKey]: optionId };
    setAnswers(newAnswers);
    setAnswer(currentStepData.answerKey, optionId);

    if (currentStep < 3) {
      // Move to next step after a brief delay
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 500);
    } else {
      // Show completion after final step
      setTimeout(() => {
        setShowCompletion(true);
      }, 500);
      
      // Navigate to next screen after showing completion
      setTimeout(() => {
        navigate("/quiz/next-step"); // Update this to your next route
      }, 3000);
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
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
          
          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  index + 1 === currentStep
                    ? 'bg-flourishgreen text-white border-flourishgreen'
                    : index + 1 < currentStep
                    ? 'bg-flourishmint/20 text-flourishgreen border-flourishmint'
                    : 'bg-white text-gray-500 border-gray-200'
                }`}
              >
                <div className="text-center">
                  <div className="mb-2">
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                      index + 1 === currentStep
                        ? 'bg-white text-flourishgreen'
                        : index + 1 < currentStep
                        ? 'bg-flourishmint text-flourishgreen'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {index + 1 < currentStep ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${
                    index + 1 === currentStep ? 'text-white' : ''
                  }`}>
                    {step.header.split(' ')[0]} {step.header.split(' ')[1]}
                  </h3>
                  <h4 className={`font-semibold text-sm mb-2 ${
                    index + 1 === currentStep ? 'text-flourishmint' : 'text-flourishgreen'
                  }`}>
                    {step.header.split('...')[0].split(' ').slice(2).join(' ')}...
                  </h4>
                  <p className="text-xs opacity-80">
                    {step.progressText}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{currentStepData.progressText}</span>
              <span className="text-sm text-gray-600">{currentStepData.progress}%</span>
            </div>
            <Progress value={currentStepData.progress} className="h-2" />
          </div>

          {/* Current Question */}
          <div className="w-full max-w-xl text-center mb-8">
            <h2 className="font-semibold text-xl text-flourishgreen mb-6">
              {currentStepData.question}
            </h2>
            
            <div className="space-y-3">
              {currentStepData.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="w-full p-4 text-left bg-white border-2 border-gray-200 rounded-lg hover:border-flourishmint hover:bg-flourishmint/5 transition-colors"
                >
                  <span className="text-gray-700 text-base">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizCalmResetPlanBuilder;
