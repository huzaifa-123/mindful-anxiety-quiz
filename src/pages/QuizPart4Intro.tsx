
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizPart4Intro = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/quiz/question14");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-md flex flex-col items-center text-center">
          {/* Meditation figure illustration */}
          <div className="mb-8">
            <img
              src="/QuizDesign/PART 4.png"
              alt="Personal Resonance Mapping"
              className="w-48 h-48 object-contain"
            />
          </div>
          
          <h1 className="font-bold text-2xl text-gray-800 mb-4">
            PERSONAL RESONANCE MAPPING
          </h1>
          
          <p className="text-gray-600 text-base mb-12">
            Let's match your journey to what truly supports you.
          </p>
          
          <button
            onClick={handleContinue}
            className="rounded-full bg-flourishmint text-flourishgreen text-base font-semibold px-8 py-3 shadow-md transition duration-150 hover:scale-105 hover:brightness-110"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizPart4Intro;
