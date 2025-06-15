
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizPart2Intro = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/quiz/question4");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          {/* Brain icon with sparkles */}
          <div className="w-32 h-32 mb-8 flex items-center justify-center">
            <img
              src="/brain-icon.png"
              alt="Brain with sparkles"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          
          {/* Main heading */}
          <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-4 tracking-tight">
            WHAT'S REALLY GOING ON BENEATH THE SURFACE
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-base mb-8 max-w-xl">
            Let's uncover the anxiety pattern shaping your daily experience.
          </p>
        </div>
        
        {/* Continue button fixed at bottom */}
        <div className="w-full flex flex-col items-center absolute bottom-12">
          <button
            onClick={handleContinue}
            className="rounded-full bg-flourishmint text-flourishgreen text-base font-semibold px-10 py-2 shadow-md transition duration-150 hover:scale-105 hover:brightness-110"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizPart2Intro;
