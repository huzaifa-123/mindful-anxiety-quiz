
import Header from "../components/Header";
import RatingScaleQuestion from "../components/RatingScaleQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion12 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const handleRatingSelect = (rating: number) => {
    setAnswer("question12", rating);
    navigate("/quiz/question13-cbt");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="12 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <RatingScaleQuestion
          question="How distressed do you feel when the anxiety hits?"
          lowLabel="I can manage it easily"
          highLabel="It feels unbearable or terrifying"
          onRatingSelect={handleRatingSelect}
          questionNumber="12"
        />
      </main>
    </div>
  );
};

export default QuizQuestion12;
