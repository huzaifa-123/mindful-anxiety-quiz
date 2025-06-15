
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion15 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "What's your biggest motivation for taking this quiz today?";
  
  const options = [
    {
      id: "understand_whats_going_on",
      text: "I want to understand what's really going on",
      icon: "/dummy-understand-icon.png"
    },
    {
      id: "want_tools",
      text: "I want tools to help me in anxious moments",
      icon: "/dummy-tools-icon.png"
    },
    {
      id: "stop_overthinking",
      text: "I want to stop overthinking and feel more calm",
      icon: "/dummy-calm-icon.png"
    },
    {
      id: "take_control",
      text: "I want to take control of my anxiety for good",
      icon: "/dummy-control-icon.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question15", optionId);
    navigate("/quiz/question16");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="15 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="15"
        />
      </main>
    </div>
  );
};

export default QuizQuestion15;
