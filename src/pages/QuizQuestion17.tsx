
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion17 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How much time can you realistically commit to your well-being each day?";
  
  const options = [
    {
      id: "5_minutes",
      text: "5 minutes",
      icon: "/dummy-time-icon.png"
    },
    {
      id: "10_minutes",
      text: "10 minutes",
      icon: "/dummy-time-icon.png"
    },
    {
      id: "15_minutes",
      text: "15 minutes",
      icon: "/dummy-time-icon.png"
    },
    {
      id: "20_plus_minutes",
      text: "20+ minutes",
      icon: "/dummy-time-icon.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    console.log(`🟢 Q17 COMPONENT DEBUG: Selected ID:`, optionId);
    console.log(`🟢 Q17 COMPONENT DEBUG: Type:`, typeof optionId);
    
    // Pass the string directly without any wrapping
    setAnswer("question17", optionId);
    navigate("/quiz/question18");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="17 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="17"
        />
      </main>
    </div>
  );
};

export default QuizQuestion17;
