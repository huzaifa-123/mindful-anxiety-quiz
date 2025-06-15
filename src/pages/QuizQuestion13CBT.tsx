
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion13CBT = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How familiar are you with Cognitive Behavioral Therapy (CBT)?";
  
  const options = [
    {
      id: "never_heard_cbt",
      text: "I've never heard of it",
      icon: "/dummy-therapy-icon.png"
    },
    {
      id: "heard_not_sure_cbt",
      text: "I've heard of it but not sure how it works",
      icon: "/dummy-therapy-icon.png"
    },
    {
      id: "understand_cbt",
      text: "I understand it",
      icon: "/dummy-therapy-icon.png"
    },
    {
      id: "tried_cbt",
      text: "I've tried it before",
      icon: "/dummy-therapy-icon.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question13_cbt", optionId);
    navigate("/quiz/question13-mct");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="13 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="13"
        />
      </main>
    </div>
  );
};

export default QuizQuestion13CBT;
