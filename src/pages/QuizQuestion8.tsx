import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion8 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "When anxiety strikes, what do you feel most?";
  
  const options = [
    {
      id: "racing_thoughts",
      text: "Racing thoughts or mental overwhelm",
      icon: "/Icons/22.png"
    },
    {
      id: "chest_tightness",
      text: "Chest tightness or shallow breathing",
      icon: "/Icons/23.png"
    },
    {
      id: "dread",
      text: "Dread or a sense of impending doom",
      icon: "/Icons/24.png"
    },
    {
      id: "numbness",
      text: "Numbness or disconnection from the body",
      icon: "/Icons/25.png"
    },
    {
      id: "difficulty_concentrating",
      text: "Difficulty concentrating or making decisions",
      icon: "/Icons/26.png"
    },
    {
      id: "urge_escape",
      text: "Urge to escape or avoid the situation",
      icon: "/Icons/27.png"
    },
    {
      id: "irritability",
      text: "Irritability or emotional sensitivity",
      icon: "/Icons/28.png"
    },
    {
      id: "freeze",
      text: "I freeze or feel stuck",
      icon: "/Icons/29.png"
    },
    {
      id: "not_sure",
      text: "I'm not sure",
      icon: "/Icons/30.png"
    }
  ];

  const handleContinue = (selectedOptions: string[]) => {
    setAnswer("question8", selectedOptions);
    navigate("/quiz/part3-intro");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="8 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full text-base sm:text-lg">
          <MultiSelectQuestion
            question={question}
            options={options}
            onContinue={handleContinue}
            questionNumber="8"
          />
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion8;
