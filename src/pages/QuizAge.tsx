
import Header from "../components/Header";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const AGE_OPTIONS = [
  "Under 18",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65+"
];

const QuizAge = () => {
  const { answers, setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const handleSelect = (age: string) => {
    setAnswer("age", age);
    navigate("/quiz/name");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="2 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
          <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-6 text-center tracking-tight mt-6">
            What is your age range?
          </h1>
          <div className="w-full flex flex-col gap-3">
            {AGE_OPTIONS.map(option => (
              <button
                key={option}
                className={`w-full py-2 px-3 border-2 rounded-md text-flourishgreen font-medium bg-white
                  border-flourishmint hover:bg-flourishmint/10 transition
                `}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizAge;
