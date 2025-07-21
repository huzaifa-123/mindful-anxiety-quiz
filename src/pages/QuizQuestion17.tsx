
import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion17 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How do you want to feel 30 days from now?";
  
  const options = [
    // PANICKER
    { id: "grounded_steady", text: "Feel grounded and steady", icon: "/Icons/44.png" },
    { id: "body_calm", text: "Body responds calmly", icon: "/Icons/45.png" },
    { id: "confidence_daily", text: "Confidence in daily life", icon: "/Icons/46.png" },
    // RUMINATOR
    { id: "thoughts_calmer", text: "Thoughts feel calmer", icon: "/Icons/44.png" },
    { id: "able_pause", text: "Able to pause", icon: "/Icons/45.png" },
    { id: "mentally_clear", text: "Mentally clear", icon: "/Icons/46.png" },
    // AVOIDER
    { id: "empowered_action", text: "Taking empowered action", icon: "/Icons/44.png" },
    { id: "safe_body", text: "Safe in your body", icon: "/Icons/45.png" },
    { id: "trust_decisions", text: "Trust in decisions", icon: "/Icons/46.png" },
  ];

  const handleContinue = (selectedOptions: string[]) => {
    setAnswer("question17", selectedOptions);
    navigate("/quiz/question18");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="17 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <MultiSelectQuestion
          question={question}
          options={options}
          onContinue={handleContinue}
          questionNumber="17"
        />
      </main>
    </div>
  );
};

export default QuizQuestion17;
