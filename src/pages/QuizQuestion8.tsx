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
      icon: "/dummy-racing-icon.png"
    },
    {
      id: "chest_tightness",
      text: "Chest tightness or shallow breathing",
      icon: "/dummy-chest-icon.png"
    },
    {
      id: "dread",
      text: "Dread or a sense of impending doom",
      icon: "/dummy-dread-icon.png"
    },
    {
      id: "numbness",
      text: "Numbness or disconnection from the body",
      icon: "/dummy-numbness-icon.png"
    },
    {
      id: "difficulty_concentrating",
      text: "Difficulty concentrating or making decisions",
      icon: "/dummy-concentration-icon.png"
    },
    {
      id: "urge_escape",
      text: "Urge to escape or avoid the situation",
      icon: "/dummy-escape-icon.png"
    },
    {
      id: "irritability",
      text: "Irritability or emotional sensitivity",
      icon: "/dummy-irritability-icon.png"
    },
    {
      id: "freeze",
      text: "I freeze or feel stuck",
      icon: "/dummy-stuck-icon.png"
    },
    {
      id: "not_sure",
      text: "I'm not sure",
      icon: "/dummy-unsure-icon.png"
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
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <MultiSelectQuestion
          question={question}
          options={options}
          onContinue={handleContinue}
          questionNumber="8"
        />
      </main>
    </div>
  );
};

export default QuizQuestion8;
