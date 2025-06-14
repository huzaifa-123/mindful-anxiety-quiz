
import React from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { ArrowRight } from "lucide-react";

interface QuizGenderQuestionProps {
  onAnswered?: () => void; // for proceeding to next question if needed
}

const AVATARS = [
  {
    label: "I'm Male",
    value: "male",
    img: "/images/avatar-male.png", // Replace with dummy path like "/images/avatar-male.png"
  },
  {
    label: "I'm Female",
    value: "female",
    img: "/images/avatar-female.png", // Replace with dummy path like "/images/avatar-female.png"
  },
];

const QuizGenderQuestion: React.FC<QuizGenderQuestionProps> = ({ onAnswered }) => {
  const { answers, setAnswer } = useQuizAnswers();

  const handleSelect = (gender: "male" | "female") => {
    setAnswer("gender", gender);
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
          <button
            key={a.value}
            onClick={() => handleSelect(a.value as "male" | "female")}
            className={`flex flex-col items-center group border-2 ${
              answers.gender === a.value
                ? "border-flourishmint"
                : "border-gray-200"
            } rounded-xl shadow-sm hover:shadow-md transition bg-white focus:outline-none focus:ring-2 focus:ring-flourishmint focus:border-flourishmint px-6 py-5 cursor-pointer w-40`}
          >
            <img
              src={a.img}
              alt={a.label}
              className="h-24 w-24 object-contain mb-4"
            />
            <span className="bg-flourishgreen text-flourishwhite font-semibold py-2 px-5 w-full rounded-b-full flex items-center justify-between text-base group-hover:bg-flourishmint group-hover:text-flourishgreen transition">
              {a.label}
              <ArrowRight className="inline ml-2" size={20} />
            </span>
          </button>
        ))}
      </div>
      <span className="font-inter text-lg text-gray-700 mt-2 mb-6 text-center">
        Just 3 minutes to clarity
      </span>
    </div>
  );
};

export default QuizGenderQuestion;
