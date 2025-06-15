
import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion4 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "Which statement best describes your anxiety?";
  
  const options = [
    {
      id: "panic1",
      text: "I feel a sudden, overwhelming panic that seems to come out of nowhere",
      icon: "/dummy-panic-icon.png"
    },
    {
      id: "avoidant1", 
      text: "I often avoid situations because of anxiety and fear",
      icon: "/dummy-avoid-icon.png"
    },
    {
      id: "ruminator1",
      text: "I get stuck in endless overthinking, doubts, and \"what if\" scenarios",
      icon: "/dummy-overthink-icon.png"
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
        <Header withBack questionCount="4 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <MultiSelectQuestion
          question={question}
          options={options}
          onContinue={handleContinue}
          questionNumber="4"
        />
      </main>
    </div>
  );
};

export default QuizQuestion4;
