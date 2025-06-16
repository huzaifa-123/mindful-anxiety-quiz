
import Header from "../components/Header";
import MultiSelectQuestion from "../components/MultiSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion15 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "What has held you back from managing your anxiety in the past?";
  
  const options = [
    {
      id: "didnt_know_what_works",
      text: "I didn't know what would work",
      icon: "/Icons/35.png"
    },
    {
      id: "didnt_need_help",
      text: "I didn't feel I needed outside help",
      icon: "/Icons/36.png"
    },
    {
      id: "things_didnt_stick",
      text: "I tried things before but they didn't stick",
      icon: "/Icons/37.png"
    },
    {
      id: "manage_myself",
      text: "I thought I could manage it myself",
      icon: "/Icons/38.png"
    },
    {
      id: "afraid_root",
      text: "I was afraid to face the root of it",
      icon: "/Icons/39.png"
    }
  ];

  const handleContinue = (selectedOptions: string[]) => {
    setAnswer("question15", selectedOptions);
    navigate("/quiz/question16");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="15 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <MultiSelectQuestion
          question={question}
          options={options}
          onContinue={handleContinue}
          questionNumber="15"
        />
      </main>
    </div>
  );
};

export default QuizQuestion15;
