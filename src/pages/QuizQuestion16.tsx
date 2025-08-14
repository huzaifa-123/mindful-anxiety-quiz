import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useQuizAnswers } from "../context/QuizAnswersContext";

const QuizQuestion16 = () => {
  const { answers, setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How do you want to feel 30 days from now?";

  const options = [
    { id: "grounded_steady", text: "Clear-headed and in control", icon: "/Icons/44.png" },
    { id: "body_calm", text: "Less reactive to stress", icon: "/Icons/45.png" },
    { id: "confidence_daily", text: "More confident in everyday situations", icon: "/Icons/46.png" },
    { id: "thoughts_calmer", text: "More present and less in my head", icon: "/Icons/47.png" },
    { id: "able_pause", text: "Calmer, even when life gets busy", icon: "/Icons/48.png" }
  ];

  // Initialize selectedOptions as empty array, then sync with answers.question16 from context
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(answers.question16)) {
      setSelectedOptions(answers.question16);
    } else {
      setSelectedOptions([]);
    }
  }, [answers.question16]);

  const handleOptionToggle = (id: string) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== id));
    } else if (selectedOptions.length < 5) {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      setAnswer("question16", selectedOptions);
      navigate("/quiz/question17");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="16 / 21" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-2">
          <h1 className="font-semibold text-base sm:text-2xl text-flourishgreen mb-2 text-center tracking-tight">
            {question}
          </h1>

          <p className="text-gray-600 text-xs sm:text-sm mb-8 text-center">
            (Select all that apply)
          </p>

          <div className="w-full space-y-3 mb-12">
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);

              return (
                <div
                  key={option.id}
                  className={`flex items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "border-flourishmint bg-flourishmint/10"
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
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleOptionToggle(option.id)}
                    className="ml-4 accent-flourishmint" 
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full flex flex-col items-center">
            <button
              onClick={handleContinue}
              disabled={selectedOptions.length === 0}
              className="rounded-full bg-flourishmint text-flourishgreen text-base font-semibold px-10 py-2 shadow-md transition duration-160 disabled:opacity-50 hover:scale-105 hover:brightness-110"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion16;
