
import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion6 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "What triggers your anxiety most often?";
  
  const options = [
    {
      id: "panic4",
      text: "Fear of losing control or panicking",
      icon: "/dummy-control-icon.png"
    },
    {
      id: "avoidant4",
      text: "Fear of being judged or failing",
      icon: "/dummy-judged-icon.png"
    },
    {
      id: "ruminator4",
      text: "Fear of uncertainty or bad outcomes",
      icon: "/dummy-uncertainty-icon.png"
    },
    {
      id: "panic5",
      text: "No clear trigger, it just \"hits\" sometimes",
      icon: "/dummy-sudden-icon.png"
    },
    {
      id: "avoidant5",
      text: "Fear of confrontation or having to express myself",
      icon: "/dummy-confrontation-icon.png"
    },
    {
      id: "ruminator5",
      text: "Fear of making the wrong decision or overthinking consequences",
      icon: "/dummy-decision-icon.png"
    }
  ];

  const handleContinue = (selectedIds: string[]) => {
    console.log(`🟢 Q6 COMPONENT DEBUG: Selected IDs:`, selectedIds);
    console.log(`🟢 Q6 COMPONENT DEBUG: Type:`, typeof selectedIds);
    console.log(`🟢 Q6 COMPONENT DEBUG: Is array:`, Array.isArray(selectedIds));
    
    setAnswer("question6", selectedIds);
    navigate("/quiz/question7");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="6 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <MultiSelectQuestion
          question={question}
          options={options}
          onContinue={handleContinue}
          questionNumber="6"
        />
      </main>
    </div>
  );
};

export default QuizQuestion6;
