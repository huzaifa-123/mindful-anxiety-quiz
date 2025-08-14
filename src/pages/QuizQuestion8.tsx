import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion8 = () => {
  const { answers,setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "Which techniques have you already tried?";
  
  const options = [
    {
      id: "racing_thoughts",
      text: "Deep breathing exercises",
      icon: "/Icons/22.png"
    },
    {
      id: "chest_tightness",
      text: "Positive affirmations",
      icon: "/Icons/23.png"
    },
    {
      id: "dread",
      text: "Thought reframing (challenging negative thoughts)",
      icon: "/Icons/24.png"
    },
    {
      id: "numbness",
      text: "Mindfulness or meditation",
      icon: "/Icons/25.png"
    },
    {
      id: "difficulty_concentrating",
      text: "Hypnosis or relaxation audios",
      icon: "/Icons/26.png"
    },
    {
      id: "urge_escape",
      text: "Avoidance (staying away from triggers)",
      icon: "/Icons/27.png"
    },
    {
      id: "irritability",
      text: "None / I’m not sure",
      icon: "/Icons/28.png"
    }
  ];

  const handleContinue = (selectedOptions: string[]) => {
    setAnswer("question8", selectedOptions);
    navigate("/quiz/question9");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="8 / 21" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-3 sm:px-0">
        <div className="w-full text-base sm:text-lg">
          <MultiSelectQuestion
            question={question}
            options={options}
            onContinue={handleContinue}
            questionNumber="8"
            initialSelectedOptions={answers.question8 || []}  
          />
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion8;
