
import Header from "../components/Header";
import RatingScaleQuestion from "../components/RatingScaleQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion10 = () => {
  const { answers,setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const handleRatingSelect = (rating: number) => {
    setAnswer("question10", rating);
    navigate("/quiz/question11");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="8 / 19" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <RatingScaleQuestion
          question="How much is anxiety affecting your daily life right now?"
          lowLabel="Barely affects me"
          highLabel="It's taking over my life"
          onRatingSelect={handleRatingSelect}
          questionNumber="10"
          storedValue={answers.question10}  
        />
      </main>
    </div>
  );
};

export default QuizQuestion10;
