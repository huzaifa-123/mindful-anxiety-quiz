
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion13 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How long have you been dealing with anxiety?";
  
  const options = [
    {
      id: "few_weeks",
      text: "A few weeks",
      icon: "/dummy-time-icon.png"
    },
    {
      id: "few_months",
      text: "A few months",
      icon: "/dummy-time-icon.png"
    },
    {
      id: "over_year",
      text: "Over a year",
      icon: "/dummy-time-icon.png"
    },
    {
      id: "several_years",
      text: "Several years",
      icon: "/dummy-time-icon.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    console.log(`🟡 Q13 DEBUG: Raw optionId received:`, optionId);
    console.log(`🟡 Q13 DEBUG: optionId type:`, typeof optionId);
    console.log(`🟡 Q13 DEBUG: JSON.stringify(optionId):`, JSON.stringify(optionId));
    
    setAnswer("question13", optionId);
    navigate("/quiz/question14");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="14 / 23" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="13"
        />
      </main>
    </div>
  );
};

export default QuizQuestion13;
