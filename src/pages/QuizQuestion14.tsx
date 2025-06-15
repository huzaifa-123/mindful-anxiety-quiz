
import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion14 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "What has held you back from managing your anxiety in the past?";
  
  const options = [
    {
      id: "didnt_know_what_works",
      text: "I didn't know what would work",
      icon: "/dummy-question-icon.png"
    },
    {
      id: "didnt_need_help",
      text: "I didn't feel I needed outside help",
      icon: "/dummy-independent-icon.png"
    },
    {
      id: "things_didnt_stick",
      text: "I tried things before but they didn't stick",
      icon: "/dummy-struggle-icon.png"
    },
    {
      id: "manage_myself",
      text: "I thought I could manage it myself",
      icon: "/dummy-self-icon.png"
    },
    {
      id: "afraid_root",
      text: "I was afraid to face the root of it",
      icon: "/dummy-fear-icon.png"
    }
  ];

  const handleContinue = (selectedOptions: string[]) => {
    setAnswer("question14", selectedOptions);
    navigate("/quiz/question15");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="14 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <MultiSelectQuestion
          question={question}
          options={options}
          onContinue={handleContinue}
          questionNumber="14"
        />
      </main>
    </div>
  );
};

export default QuizQuestion14;
