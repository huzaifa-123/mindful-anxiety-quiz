import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion22 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "Which anxiety struggle hits you hardest right now?";
  
  const options = [
    {
      id: "past_month",
      text: "Sudden panic or heart-racing moments",
      icon: "/Icons/86.png"
    },
    {
      id: "few_months",
      text: "Over-thinking loops you can’t switch off",
      icon: "/Icons/24.png"
    },
    {
      id: "years",
      text: "Avoiding places or situations you’d rather face",
      icon: "/Icons/63.png"
    },
    {
      id: "cant_remember",
      text: "Chest tightness or breathing feels stuck",
      icon: "/Icons/75.png"
    },
    {
      id: "just_realized",
      text: "Fear of being judged or rejected",
      icon: "/Icons/3.png"
    },
    {
      id: "feeling_frozen",
      text: "Feeling frozen or mentally blank under pressure",
      icon: "/Icons/29.png"
    },
    {
      id: "low_confidence",
      text: "Low confidence or self-worth",
      icon: "/Icons/71.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question21", optionId);
    navigate("/quiz/question23");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
            questionNumber="21"
          subtitle="(Choose the option that feels most true)"
        />
      </main>
    </div>
  );
};

export default QuizQuestion22;
