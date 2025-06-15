
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion19 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How often do you have trouble relaxing?";
  
  const options = [
    {
      id: "almost_always",
      text: "Almost always",
      icon: "/dummy-relax-icon.png"
    },
    {
      id: "often",
      text: "Often",
      icon: "/dummy-relax-icon.png"
    },
    {
      id: "sometimes",
      text: "Sometimes",
      icon: "/dummy-relax-icon.png"
    },
    {
      id: "almost_never",
      text: "Almost never",
      icon: "/dummy-relax-icon.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question19", optionId);
    navigate("/quiz/question20");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="19 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="19"
        />
      </main>
    </div>
  );
};

export default QuizQuestion19;
