
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizPart1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-flourishwhite flex flex-col font-inter">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-2xl mx-auto pt-6 flex flex-col items-center">
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-flourishgreen mb-2 text-center">
            Welcome to the Mind Flourish Assessment
          </h1>
          <p className="text-gray-700 font-inter mb-8 mt-2 text-center text-base md:text-lg px-2">
            This quiz will help you discover your anxiety type and the personalized strategy that actually fits your life.<br /><br />
            Click Continue to get started.
          </p>
          <button
            onClick={() => navigate("/quiz/gender")}
            className="rounded-full bg-flourishmint text-flourishgreen text-lg font-semibold px-12 py-3 shadow-md hover:scale-105 hover:brightness-110 transition"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizPart1;

