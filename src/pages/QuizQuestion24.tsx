
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion24 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "If one part of your life could feel lighter or easier starting today, what would it be?";
  
  const options = [
    {
      id: "calming_thoughts",
      text: "Calming the nonstop thoughts or spirals",
      icon: "/Icons/75.png"
    },
    {
      id: "safe_in_body",
      text: "Feeling safe in my body again",
      icon: "/Icons/76.png"
    },
    {
      id: "restore_confidence",
      text: "Restoring my confidence and inner trust",
      icon: "/Icons/77.png"
    },
    {
      id: "reclaim_energy",
      text: "Reclaiming my energy and focus",
      icon: "/Icons/78.png"
    },
    {
      id: "sleep_better",
      text: "Finally sleeping through the night",
      icon: "/Icons/79.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question24", optionId);
    navigate("/quiz/journey-timeline");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="24 / 24" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="24"
          subtitle="(Choose one that resonates most)"
        />
      </main>
    </div>
  );
};

export default QuizQuestion24;
