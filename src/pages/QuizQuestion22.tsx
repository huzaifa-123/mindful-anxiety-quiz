import Header from "../components/Header";
import { useState } from "react";
import { Checkbox } from "../components/ui/checkbox";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion22 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const question = "Which anxiety struggle hits you hardest right now?";
  
  const options = [
    {
      id: "past_month",
      text: "Sudden panic or heart-racing moments",
      icon: "/Icons/86.png"
    },
    {
      id: "few_months",
      text: "Over-thinking loops you can't switch off",
      icon: "/Icons/24.png"
    },
    {
      id: "years",
      text: "Avoiding places or situations you'd rather face",
      icon: "/Icons/63.png"
    },
    {
      id: "cant_remember",
      text: "Chest tightness or breathing feels stuck",
      icon: "/Icons/75.png"
    },
    {
      id: "just_realized",
      text: "Fear of being judged or rejected",
      icon: "/Icons/3.png"
    },
    {
      id: "feeling_frozen",
      text: "Feeling frozen or mentally blank under pressure",
      icon: "/Icons/29.png"
    },
    {
      id: "low_confidence",
      text: "Low confidence or self-worth",
      icon: "/Icons/71.png"
    }
  ];

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else if (prev.length < 3) {
        return [...prev, optionId];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    setAnswer("question21", selectedOptions);
    navigate("/quiz/question23");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="22 / 23" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-2">
          <h1 className="font-semibold text-base sm:text-2xl text-flourishgreen mb-2 text-center tracking-tight">
            {question}
          </h1>
          
          <p className="text-gray-600 text-xs sm:text-sm mb-8 text-center">
            (Select up to 3)
          </p>
          
          <div className="w-full space-y-3 mb-12">
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              const isDisabled = !isSelected && selectedOptions.length >= 3;
              return(
              <div
                key={option.id}
                className={`flex items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedOptions.includes(option.id)
                    ? "border-flourishmint bg-flourishmint/10"
                    : isDisabled
                    ? "border-gray-200 bg-white opacity-50 cursor-not-allowed"
                    : "border-gray-200 bg-white hover:border-flourishmint/50"
                }`}
                onClick={() => handleOptionToggle(option.id)}
              >
                <div className="w-8 h-8 mr-4 flex-shrink-0">
                  <img
                    src={option.icon}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="flex-1 text-gray-700 text-sm sm:text-base">
                  {option.text}
                </span>
                <Checkbox
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleOptionToggle(option.id)}
                  className="ml-4"
                />
              </div>
              );
            })}
          </div>
          
          <div className="w-full flex flex-col items-center">
            <button
              onClick={handleContinue}
              disabled={selectedOptions.length === 0}
              className="rounded-full bg-flourishmint text-flourishgreen text-base font-semibold px-10 py-2 shadow-md transition duration-150 disabled:opacity-50 hover:scale-105 hover:brightness-110"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion22;