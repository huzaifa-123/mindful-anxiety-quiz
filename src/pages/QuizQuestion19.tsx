import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion19 = () => {
  const { answers,setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How often do you have trouble relaxing?";
  
  const options = [
    {
      id: "almost_always",
      text: "Almost always",
      icon: "/Icons/57.png"
    },
    {
      id: "often",
      text: "Often",
      icon: "/Icons/58.png"
    },
    {
      id: "sometimes",
      text: "Sometimes",
      icon: "/Icons/59.png"
    },
    {
      id: "almost_never",
      text: "Almost never",
      icon: "/Icons/60.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question19", optionId);
    navigate("/quiz/question20");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="17 / 19" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full text-base sm:text-lg">
          <SingleSelectQuestion
            question={question}
            options={options}
            onSelect={handleSelect}
            questionNumber="19"
            initialSelectedId={answers.question19 || ""}  
          />
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion19;
