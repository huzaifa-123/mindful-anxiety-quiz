import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion21 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "What do you think needs to improve for you to feel more in control of anxiety?";
  
  const options = [
    {
      id: "my_willpower",
      text: "My willpower",
      icon: "/dummy-willpower-icon.png"
    },
    {
      id: "my_calm_state",
      text: "My calm state",
      icon: "/dummy-calm-state-icon.png"
    },
    {
      id: "my_energy_levels",
      text: "My energy levels",
      icon: "/dummy-energy-icon.png"
    },
    {
      id: "less_attachment_thoughts",
      text: "Less attachment to thoughts",
      icon: "/dummy-attachment-icon.png"
    },
    {
      id: "my_mental_strength",
      text: "My mental strength",
      icon: "/dummy-mental-strength-icon.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question21", optionId);
    navigate("/quiz/analysis");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="21 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="21"
        />
      </main>
    </div>
  );
};

export default QuizQuestion21;
