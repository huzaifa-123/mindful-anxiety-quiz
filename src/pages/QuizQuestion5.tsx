import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion5 = () => {
  const { setAnswer, answers } = useQuizAnswers();
  const navigate = useNavigate();

  console.log(`🟢 Q5 COMPONENT MOUNT: Component mounted with current answers:`, JSON.stringify(answers, null, 2));

  const question = "Which statement best describes your anxiety?";
  
  const options = [
    {
      id: "panic1",
      text: "I feel a sudden, overwhelming panic that seems to come out of nowhere",
      icon: "/Icons/2.png"
    },
    {
      id: "avoidant1", 
      text: "I often avoid situations because of anxiety and fear",
      icon: "/Icons/3.png"
    },
    {
      id: "ruminator1",
      text: "I get stuck in endless overthinking, doubts, and \"what if\" scenarios",
      icon: "/Icons/4.png"
    }
  ];

  const handleContinue = (selectedIds: string[]) => {
    console.log(`🟢 Q5 HANDLE CONTINUE: Called with selectedIds:`, selectedIds);
    console.log(`🟢 Q5 HANDLE CONTINUE: Type:`, typeof selectedIds);
    console.log(`🟢 Q5 HANDLE CONTINUE: Is array:`, Array.isArray(selectedIds));
    console.log(`🟢 Q5 HANDLE CONTINUE: About to call setAnswer("question5", selectedIds)`);
    
    setAnswer("question5", selectedIds);
    
    console.log(`🟢 Q5 HANDLE CONTINUE: setAnswer called, now navigating to question5`);
    navigate("/quiz/question6");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="5 / 21" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full text-base sm:text-lg">
          <MultiSelectQuestion
            question={question}
            options={options}
            onContinue={handleContinue}
            questionNumber="5"
          />
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion5;
