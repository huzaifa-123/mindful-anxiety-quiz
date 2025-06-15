
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion23 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "If one part of your life could feel lighter or easier starting today, what would it be?";
  
  const options = [
    {
      id: "calming_thoughts",
      text: "Calming the nonstop thoughts or spirals",
      icon: "/dummy-thoughts-icon.png"
    },
    {
      id: "safe_in_body",
      text: "Feeling safe in my body again",
      icon: "/dummy-body-icon.png"
    },
    {
      id: "restore_confidence",
      text: "Restoring my confidence and inner trust",
      icon: "/dummy-confidence-icon.png"
    },
    {
      id: "reclaim_energy",
      text: "Reclaiming my energy and focus",
      icon: "/dummy-energy-icon.png"
    },
    {
      id: "sleep_better",
      text: "Finally sleeping through the night",
      icon: "/dummy-sleep-icon.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question23", optionId);
    // TODO: Navigate to final results or next step
    console.log("Quiz completed! All answers:", { question23: optionId });
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="23 / 23" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="23"
          subtitle="(Choose one that resonates most)"
        />
      </main>
    </div>
  );
};

export default QuizQuestion23;
