
import React from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizGenderQuestionProps {
  onAnswered?: () => void;
}

const AVATARS = [
  {
    label: "I'm Male",
    value: "male",
    img: "/QuizDesign/P1 - Male.png",
  },
  {
    label: "I'm Female",
    value: "female",
    img: "/QuizDesign/P1 - Female.png",
  },
];

const QuizGenderQuestion: React.FC<QuizGenderQuestionProps> = ({ onAnswered }) => {
  const { answers, setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const handleSelect = (gender: "male" | "female") => {
    setAnswer("gender", gender);
    navigate("/quiz/age"); // Go to QuizAge page after selecting
    if (onAnswered) onAnswered();
  };

  return (
    <div className="w-full max-w-2xl mt-6 flex flex-col items-center">
      <h1 className="font-playfair text-2xl md:text-3xl font-bold text-flourishgreen mb-1 mt-3 text-center">
        DISCOVER YOUR ANXIETY TYPE
      </h1>
      <p className="text-gray-700 font-inter mb-6 mt-2 text-center text-base md:text-lg px-2">
        Understand what’s really happening underneath – and how to finally feel calmer.
      </p>
      <div className="flex flex-row gap-8 justify-center mb-8 flex-wrap">
        {AVATARS.map((a) => (
          <div
            key={a.value}
            className="flex flex-col items-center w-44 sm:w-56 bg-white border-2 rounded-xl shadow-sm py-6 px-3"
          >
            <img
              src={a.img}
              alt={a.label}
              className="h-30 w-30 object-contain mb-4"
            />
            <button
              onClick={() => handleSelect(a.value as "male" | "female")}
              className={`w-full mt-2 flex items-center justify-center rounded-md transition font-semibold py-3 text-base
                ${
                  answers.gender === a.value
                    ? "bg-flourishmint text-flourishgreen border-2 border-flourishmint"
                    : "bg-flourishgreen text-flourishwhite border-2 border-flourishgreen hover:bg-flourishmint hover:text-flourishgreen"
                }
              `}
            >
              {a.label}
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        ))}
      </div>
      <span className="font-inter text-lg text-gray-700 mt-2 mb-6 text-center">
        Just 3 minutes to clarity
      </span>
    </div>
  );
};

export default QuizGenderQuestion;
