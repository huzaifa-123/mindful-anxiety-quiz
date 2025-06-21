
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizResults = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/quiz/question23");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          {/* Main heading */}
          <h1 className="font-semibold text-xl md:text-2xl text-gray-800 mb-6 tracking-tight max-w-lg">
            What you're feeling isn't failure. It's your nervous system in protection mode.
          </h1>
          
          <div className="w-full max-w-sm h-48 mb-8 flex items-center justify-center">
            <img
              src="/QuizDesign/Nervous system.png"
              alt="Person analyzing data on laptop"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          
          {/* Description paragraphs */}
          <p className="text-gray-700 text-base mb-4 max-w-xl leading-relaxed">
            Your nervous system is designed to protect you from danger.
          </p>
          
          <p className="text-gray-700 text-base mb-4 max-w-xl leading-relaxed">
            But when it gets stuck in <span className="font-semibold">fight, flight, freeze, or fawn</span>, it can mistake modern stress for real threat. This isn't a flaw. It's a learned pattern.
          </p>
          
          <p className="text-gray-700 text-base mb-8 max-w-xl leading-relaxed">
            And the powerful truth is <span className="font-semibold">patterns can be rewired</span>.
          </p>
        </div>
        
        {/* Continue button */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={handleContinue}
            className="rounded-full bg-flourishmint text-white text-base font-semibold px-10 py-2 shadow-md transition duration-150 hover:scale-105 hover:brightness-110"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizResults;
