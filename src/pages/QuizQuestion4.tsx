import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion4 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "When does your anxiety feel worse?";
  
  const options = [
    {
      id: "ruminator2",
      text: "First thing in the morning",
      icon: "/Icons/5.png"
    },
    {
      id: "avoidant2",
      text: "Before tasks or challenges",
      icon: "/Icons/6.png"
    },
    {
      id: "avoidant3",
      text: "In social situations",
      icon: "/Icons/7.png"
    },
    {
      id: "panic2",
      text: "At random times without a clear cause",
      icon: "/Icons/8.png"
    },
    {
      id: "ruminator3",
      text: "In the evening or before sleeping",
      icon: "/Icons/9.png"
    },
    {
      id: "panic3",
      text: "When physical symptoms suddenly spike",
      icon: "/Icons/10.png"
    }
  ];

  const handleContinue = (selectedIds: string[]) => {
    console.log(`🟢 Q4 COMPONENT DEBUG: Selected IDs:`, selectedIds);
    console.log(`🟢 Q4 COMPONENT DEBUG: Type:`, typeof selectedIds);
    console.log(`🟢 Q4 COMPONENT DEBUG: Is array:`, Array.isArray(selectedIds));
    
    setAnswer("question4", selectedIds);
    navigate("/quiz/question5");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="4 / 21" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full text-base sm:text-lg">
          <MultiSelectQuestion
            question={question}
            options={options}
            onContinue={handleContinue}
            questionNumber="4"
          />
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion4;
