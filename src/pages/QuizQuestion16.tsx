
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion16 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "What's your biggest motivation for taking this quiz today?";
  
  const options = [
    {
      id: "understand_whats_going_on",
      text: "I want to understand what's really going on",
      icon: "/Icons/40.png"
    },
    {
      id: "want_tools",
      text: "I want tools to help me in anxious moments",
      icon: "/Icons/41.png"
    },
    {
      id: "stop_overthinking",
      text: "I want to stop overthinking and feel more calm",
      icon: "/Icons/42.png"
    },
    {
      id: "take_control",
      text: "I want to take control of my anxiety for good",
      icon: "/Icons/43.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question16", optionId);
    navigate("/quiz/question17");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="16 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="16"
        />
      </main>
    </div>
  );
};

export default QuizQuestion16;
