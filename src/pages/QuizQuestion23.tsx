
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion23 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "When did you first notice anxiety starting to affect your daily life?";
  
  const options = [
    {
      id: "past_month",
      text: "It started recently, in the past month",
      icon: "/Icons/70.png"
    },
    {
      id: "few_months",
      text: "It's been building over the past few months",
      icon: "/Icons/71.png"
    },
    {
      id: "years",
      text: "It's been a part of my life for years",
      icon: "/Icons/72.png"
    },
    {
      id: "cant_remember",
      text: "I honestly can't remember a time without it",
      icon: "/Icons/73.png"
    },
    {
      id: "just_realized",
      text: "I've only just realized it's been anxiety all along",
      icon: "/Icons/74.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question23", optionId);
    navigate("/quiz/question24");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="23 / 24" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="23"
          subtitle="(Choose the option that feels most true)"
        />
      </main>
    </div>
  );
};

export default QuizQuestion23;
