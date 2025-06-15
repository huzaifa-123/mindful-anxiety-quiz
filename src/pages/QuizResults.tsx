
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizResults = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/quiz/question22");
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
          
          {/* Brain illustration with cycle */}
          <div className="w-full max-w-sm h-48 mb-6 flex items-center justify-center">
            <div className="relative">
              {/* Brain silhouette */}
              <div className="w-32 h-32 bg-flourishgreen rounded-full flex items-center justify-center relative">
                <div className="w-20 h-20 bg-flourishmint rounded-full opacity-80"></div>
              </div>
              
              {/* Cycle arrows and labels */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-flourishgreen">
                Fight
              </div>
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-sm font-medium text-flourishgreen">
                Flight
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-flourishgreen">
                Fawn
              </div>
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-sm font-medium text-flourishgreen">
                Freeze
              </div>
              
              {/* Circular arrow indicators */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-4 h-4 border-2 border-flourishgreen border-t-transparent rounded-full"></div>
              </div>
            </div>
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

export default QuizResults;
