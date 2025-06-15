
import Header from "../components/Header";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizName = () => {
  const { answers, setAnswer } = useQuizAnswers();
  const navigate = useNavigate();
  const [name, setName] = useState(answers.name ?? "");
  // Button should only enable if input isn't empty
  const isButtonDisabled = name.trim().length === 0;

  const handleContinue = () => {
    setAnswer("name", name.trim());
    navigate("/quiz/anxiety-stats");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="3 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
          <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-10 text-center tracking-tight mt-8">
            What is your first name?
          </h1>
          <input
            type="text"
            className="mb-8 w-full border-2 border-flourishmint rounded-md py-2 px-4 text-base text-flourishgreen outline-none placeholder-gray-400 bg-white"
            placeholder="Enter your first name..."
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            maxLength={30}
          />
          <button
            disabled={isButtonDisabled}
            onClick={handleContinue}
            className="rounded-full bg-flourishmint text-flourishgreen text-base font-semibold px-10 py-2 shadow-md transition duration-150 disabled:opacity-60 hover:scale-105 hover:brightness-110"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizName;
