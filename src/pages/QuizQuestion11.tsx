
import Header from "../components/Header";
import RatingScaleQuestion from "../components/RatingScaleQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion11 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const handleRatingSelect = (rating: number) => {
    setAnswer("question11", rating);
    navigate("/quiz/question12");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="11 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <RatingScaleQuestion
          question="How often do you experience anxiety symptoms?"
          lowLabel="Rarely (once a month or less)"
          highLabel="Daily or multiple times a day"
          onRatingSelect={handleRatingSelect}
          questionNumber="11"
        />
      </main>
    </div>
  );
};

export default QuizQuestion11;
