
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizPart3Intro = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/quiz/question9");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          {/* Illustration */}
          <div className="w-48 h-48 mb-8 flex items-center justify-center">
            <img
              src="/anxiety-illustration.png"
              alt="Person with anxiety illustration"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          
          {/* Main heading */}
          <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-4 tracking-tight">
            HOW IS ANXIETY SHOWING UP IN YOUR LIFE?
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-base mb-8 max-w-xl">
            Let's gently explore how anxiety affects your energy, focus, and well-being.
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

export default QuizPart3Intro;
