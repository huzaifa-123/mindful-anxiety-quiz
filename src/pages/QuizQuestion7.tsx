
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion7 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "What do you usually do when you feel anxious?";
  
  const options = [
    {
      id: "avoidant6",
      text: "Try to distract myself or escape the situation",
      type: "avoidant" as const,
      icon: "/dummy-distract-icon.png"
    },
    {
      id: "ruminator6",
      text: "Try to \"think my way out\" of the anxiety",
      type: "ruminator" as const,
      icon: "/dummy-think-icon.png"
    },
    {
      id: "panic6",
      text: "Fight against the anxious feelings",
      type: "panic" as const,
      icon: "/dummy-fight-icon.png"
    },
    {
      id: "panic7",
      text: "Freeze due to overwhelming panic and fear",
      type: "panic" as const,
      icon: "/dummy-freeze-icon.png"
    },
    {
      id: "avoidant7",
      text: "Shut down emotionally to avoid discomfort",
      type: "avoidant" as const,
      icon: "/dummy-shutdown-icon.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    console.log(`🟡 Q7 DEBUG: Raw optionId received:`, optionId);
    console.log(`🟡 Q7 DEBUG: optionId type:`, typeof optionId);
    console.log(`🟡 Q7 DEBUG: JSON.stringify(optionId):`, JSON.stringify(optionId));
    
    setAnswer("question7", optionId);
    navigate("/quiz/question8");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="7 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="7"
        />
      </main>
    </div>
  );
};

export default QuizQuestion7;
