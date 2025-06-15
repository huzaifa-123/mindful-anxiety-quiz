
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useState } from "react";

const QuizEmailPreference = () => {
  const navigate = useNavigate();
  const { setAnswer } = useQuizAnswers();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setAnswer("email_preference", optionId);
    
    // Navigate to blank screen for now (can be updated later)
    setTimeout(() => {
      navigate("/quiz/final-step"); // This will be a 404 for now as requested
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto text-center">
          
          {/* Main question */}
          <h1 className="font-semibold text-xl text-gray-800 mb-8 leading-relaxed">
            Would you like to receive calming prompts and reminders via email?
          </h1>
          
          {/* Options */}
          <div className="space-y-4">
            <button
              onClick={() => handleOptionSelect("yes_gentle_support")}
              className={`w-full p-4 text-left border-2 rounded-xl transition-colors ${
                selectedOption === "yes_gentle_support"
                  ? "border-flourishmint bg-flourishmint/5 text-flourishgreen"
                  : "border-gray-200 bg-white text-gray-700 hover:border-flourishmint hover:bg-flourishmint/5"
              }`}
            >
              Yes - I'd like gentle email support
            </button>
            
            <button
              onClick={() => handleOptionSelect("no_just_results")}
              className={`w-full p-4 text-left border-2 rounded-xl transition-colors ${
                selectedOption === "no_just_results"
                  ? "border-flourishmint bg-flourishmint/5 text-flourishgreen"
                  : "border-gray-200 bg-white text-gray-700 hover:border-flourishmint hover:bg-flourishmint/5"
              }`}
            >
              No - just show me my results
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizEmailPreference;
