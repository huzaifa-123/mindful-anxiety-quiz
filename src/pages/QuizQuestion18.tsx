
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion18 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "Do you find it difficult to stop or control worrying?";
  
  const options = [
    {
      id: "almost_always",
      text: "Almost always",
      icon: "/dummy-worry-icon.png"
    },
    {
      id: "often",
      text: "Often",
      icon: "/dummy-worry-icon.png"
    },
    {
      id: "sometimes",
      text: "Sometimes",
      icon: "/dummy-worry-icon.png"
    },
    {
      id: "almost_never",
      text: "Almost never",
      icon: "/dummy-worry-icon.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question18", optionId);
    navigate("/quiz/question19");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="18 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="18"
        />
      </main>
    </div>
  );
};

export default QuizQuestion18;
