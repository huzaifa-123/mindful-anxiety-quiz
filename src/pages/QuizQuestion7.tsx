
import Header from "../components/Header";
import SingleSelectQuestion from "../components/SingleSelectQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion7 = () => {
  const { setAnswer, answers } = useQuizAnswers();
  const navigate = useNavigate();

  console.log(`🟢 Q7 COMPONENT MOUNT: Component mounted with current answers:`, JSON.stringify(answers, null, 2));

  const question = "What do you usually do when you feel anxious?";
  
  const options = [
    {
      id: "avoidant6",
      text: "Try to distract myself or escape the situation",
      icon: "/Icons/17.png"
    },
    {
      id: "ruminator6",
      text: "Try to \"think my way out\" of the anxiety",
      icon: "/Icons/18.png"
    },
    {
      id: "panic6",
      text: "Fight against the anxious feelings",
      icon: "/Icons/19.png"
    },
    {
      id: "panic7",
      text: "Freeze due to overwhelming panic and fear",
      icon: "/Icons/20.png"
    },
    {
      id: "avoidant7",
      text: "Shut down emotionally to avoid discomfort",
      icon: "/Icons/21.png"
    }
  ];

  const handleSelect = (optionId: string) => {
    console.log(`🟢 Q7 HANDLE SELECT: Called with optionId:`, optionId);
    console.log(`🟢 Q7 HANDLE SELECT: Type:`, typeof optionId);
    console.log(`🟢 Q7 HANDLE SELECT: About to call setAnswer("question7", optionId)`);
    
    setAnswer("question7", optionId);
    
    console.log(`🟢 Q7 HANDLE SELECT: setAnswer called, now navigating to question8`);
    navigate("/quiz/question8");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="7 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <SingleSelectQuestion
          question={question}
          options={options}
          onSelect={handleSelect}
          questionNumber="7"
          subtitle="(Choose the one that fits best)"
        />
      </main>
    </div>
  );
};

export default QuizQuestion7;
