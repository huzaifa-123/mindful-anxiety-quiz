
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion14 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How long has anxiety been affecting your daily life?";
  
  const options = [
    {
      id: "few_weeks",
      text: "A few weeks",
      icon: "/Icons/31.png"
    },
    {
      id: "few_months",
      text: "A few months",
      icon: "/Icons/32.png"
    },
    {
      id: "over_year",
      text: "Over a year",
      icon: "/Icons/33.png"
    },
    {
      id: "several_years",
      text: "Several years",
      icon: "/Icons/34.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    console.log(`🟢 Q13 COMPONENT DEBUG: Selected ID:`, optionId);
    console.log(`🟢 Q13 COMPONENT DEBUG: Type:`, typeof optionId);
    
    // Store as question14 since this is actually question 14 in the sequence
    setAnswer("question14", optionId);
    navigate("/quiz/question15");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="14 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="14"
        />
      </main>
    </div>
  );
};

export default QuizQuestion14;
