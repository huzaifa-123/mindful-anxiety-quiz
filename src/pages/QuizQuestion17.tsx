
import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion17 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How do you want to feel 30 days from now?";
  
  const options = [
    {
      id: "clear_headed_control",
      text: "Clear-headed and in control",
      icon: "/Icons/44.png"
    },
    {
      id: "less_reactive",
      text: "Less reactive to stress",
      icon: "/Icons/45.png"
    },
    {
      id: "more_confident",
      text: "More confident in everyday situations",
      icon: "/Icons/46.png"
    },
    {
      id: "more_present",
      text: "More present and less in my head",
      icon: "/Icons/47.png"
    },
    {
      id: "calmer_busy",
      text: "Calmer, even when life gets busy",
      icon: "/Icons/48.png"
    }
  ];

  const handleContinue = (selectedOptions: string[]) => {
    setAnswer("question17", selectedOptions);
    navigate("/quiz/question18");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="17 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <MultiSelectQuestion
          question={question}
          options={options}
          onContinue={handleContinue}
          questionNumber="17"
        />
      </main>
    </div>
  );
};

export default QuizQuestion17;
