import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion19 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "Do you find it difficult to stop or control worrying?";
  
  const options = [
    {
      id: "almost_always",
      text: "Almost always",
      icon: "/Icons/53.png"
    },
    {
      id: "often",
      text: "Often",
      icon: "/Icons/54.png"
    },
    {
      id: "sometimes",
      text: "Sometimes",
      icon: "/Icons/55.png"
    },
    {
      id: "almost_never",
      text: "Almost never",
      icon: "/Icons/56.png"
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
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full text-base sm:text-lg">
          <SingleSelectQuestion
            question={question}
            options={options}
            onSelect={handleSelect}
            questionNumber="19"
          />
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion19;
