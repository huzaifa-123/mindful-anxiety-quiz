
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion18 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How much time can you realistically commit to your well-being each day?";
  
  const options = [
    {
      id: "5_minutes",
      text: "5 minutes",
      icon: "/Icons/49.png"
    },
    {
      id: "10_minutes",
      text: "10 minutes",
      icon: "/Icons/50.png"
    },
    {
      id: "15_minutes",
      text: "15 minutes",
      icon: "/Icons/51.png"
    },
    {
      id: "20_plus_minutes",
      text: "20+ minutes",
      icon: "/Icons/52.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    
    // Store as question18 since this will become question 18 in the sequence
    setAnswer("question18", optionId);
    navigate("/quiz/question19");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="18 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="18"
        />
      </main>
    </div>
  );
};

export default QuizQuestion18;
