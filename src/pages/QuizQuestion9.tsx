
import Header from "../components/Header";
import RatingScaleQuestion from "../components/RatingScaleQuestion";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion9 = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const handleRatingSelect = (rating: number) => {
    setAnswer("question9", rating);
    navigate("/quiz/question10");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="9 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <RatingScaleQuestion
          question="How effective have the techniques been for you?"
          subtitle="(Rating Scale — not scored for type)"
          lowLabel="Didn't help at all"
          highLabel="Helped a lot"
          onRatingSelect={handleRatingSelect}
          questionNumber="9"
        />
      </main>
    </div>
  );
};

export default QuizQuestion9;
