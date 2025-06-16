import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion22 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "What do you think needs to improve for you to feel more in control of anxiety?";
  
  const options = [
    {
      id: "my_willpower",
      text: "My willpower",
      icon: "/Icons/66.png"
    },
    {
      id: "my_calm_state",
      text: "My calm state",
      icon: "/Icons/67.png"
    },
    {
      id: "my_energy_levels",
      text: "My energy levels",
      icon: "/Icons/68.png"
    },
    {
      id: "less_attachment_thoughts",
      text: "Less attachment to thoughts",
      icon: "/Icons/69.png"
    },
    {
      id: "my_mental_strength",
      text: "My mental strength",
      icon: "/Icons/70.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question22", optionId);
    navigate("/quiz/analysis");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="22 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="22"
        />
      </main>
    </div>
  );
};

export default QuizQuestion22;
