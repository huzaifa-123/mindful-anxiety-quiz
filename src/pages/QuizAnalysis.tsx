
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizAnalysis = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/quiz/anxiety-global-stats");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          {/* Main heading */}
          <h1 className="font-semibold text-xl md:text-2xl text-gray-800 mb-4 tracking-tight">
            We're tuning in to your unique pattern...
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-base mb-8 max-w-xl leading-relaxed">
            We're now decoding your answers to reveal your dominant anxiety type and the tools that match how your mind works, not just how it feels.
          </p>
          
          {/* Illustration of person with laptop */}
          <div className="w-full max-w-sm h-48 mb-8 flex items-center justify-center">
            <img
              src="/QuizDesign/Tuning in (2).png"
              alt="Person analyzing data on laptop"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          
          {/* Status text */}
          <p className="text-gray-700 text-base mb-8 font-medium">
            Aligning your next steps for deeper calm...
          </p>
          
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

export default QuizAnalysis;
