
import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion5 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "When does your anxiety feel worse?";
  
  const options = [
    {
      id: "ruminator2",
      text: "First thing in the morning",
      type: "ruminator" as const,
      icon: "/dummy-morning-icon.png"
    },
    {
      id: "avoidant2",
      text: "Before tasks or challenges",
      type: "avoidant" as const,
      icon: "/dummy-tasks-icon.png"
    },
    {
      id: "avoidant3",
      text: "In social situations",
      type: "avoidant" as const,
      icon: "/dummy-social-icon.png"
    },
    {
      id: "panic2",
      text: "At random times without a clear cause",
      type: "panic" as const,
      icon: "/dummy-random-icon.png"
    },
    {
      id: "ruminator3",
      text: "In the evening or before sleeping",
      type: "ruminator" as const,
      icon: "/dummy-evening-icon.png"
    },
    {
      id: "panic3",
      text: "When physical symptoms suddenly spike (like a racing heart or short breath)",
      type: "panic" as const,
      icon: "/dummy-physical-icon.png"
    }
  ];

  const handleContinue = (selectedOptions: string[]) => {
    setAnswer("question5", selectedOptions);
    navigate("/quiz/question6");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="5 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <MultiSelectQuestion
          question={question}
          options={options}
          onContinue={handleContinue}
          questionNumber="5"
        />
      </main>
    </div>
  );
};

export default QuizQuestion5;
