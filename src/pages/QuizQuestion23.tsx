
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion23 = () => {
  const { answers,setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "Which change would give you the biggest sense of control today?";
  
  const options = [
    {
      id: "calming_thoughts",
      text: "A calm switch you can use anywhere",
      icon: "/Icons/78.png"
    },
    {
      id: "safe_in_body",
      text: "A clear mind that stops over-thinking",
      icon: "/Icons/25.png"
    },
    {
      id: "restore_confidence",
      text: "Confidence to face the situations you now avoid",
      icon: "/Icons/38.png"
    },
    {
      id: "reclaim_energy",
      text: "Steady energy instead of anxiety fatigue",
      icon: "/Icons/68.png"
    },
    {
      id: "sleep_better",
      text: "Belief in yourself, no matter the trigger",
      icon: "/Icons/23.png"
    },
    {
      id: "safe_breathing",
      text: "Safe, relaxed breathing when stress hits",
      icon: "/Icons/75.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question23", optionId);
    navigate("/quiz/journey-timeline");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full text-base sm:text-lg">
          <SingleSelectQuestion
            question={question}
            options={options}
            onSelect={handleSelect}
            questionNumber="22"
            initialSelectedId={answers.question23 || ""}  
            subtitle="(Choose one that resonates most)"
          />
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion23;
