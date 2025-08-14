import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion13 = () => {
  const { answers,setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How long has anxiety felt like a daily companion?";
  
  const options = [
    {
      id: "few_weeks",
      text: "Just in the last month",
      icon: "/Icons/31.png"
    },
    {
      id: "few_months",
      text: "About 1–6 months",
      icon: "/Icons/32.png"
    },
    {
      id: "over_year",
      text: "6–24 months",
      icon: "/Icons/33.png"
    },
    {
      id: "several_years",
      text: "More than 2 years",
      icon: "/Icons/34.png"
    },
    {
      id: "no_idea",
      text: "Honestly, I can’t remember a time without it",
      icon: "/Icons/28.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    console.log(`🟢 Q13 COMPONENT DEBUG: Selected ID:`, optionId);
    console.log(`🟢 Q13 COMPONENT DEBUG: Type:`, typeof optionId);
    setAnswer("question13", optionId);
    navigate("/quiz/question14");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="13 / 21" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full text-base sm:text-lg">
          <SingleSelectQuestion
            question={question}
            options={options}
            onSelect={handleSelect}
            questionNumber="13"
            initialSelectedId={answers.question13 || ""}  
          />
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion13;


