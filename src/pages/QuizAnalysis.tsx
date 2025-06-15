
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const QuizAnalysis = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate after 3 seconds to simulate processing
    const timer = setTimeout(() => {
      navigate("/quiz/anxiety-global-stats");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
            <div className="w-64 h-40 bg-gradient-to-br from-flourishgreen to-flourishmint rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-flourishgreen rounded-full"></div>
                </div>
                <div className="w-20 h-12 bg-gray-700 rounded mx-auto mb-2"></div>
                <div className="w-24 h-2 bg-gray-600 rounded mx-auto"></div>
              </div>
            </div>
          </div>
          
          {/* Status text */}
          <p className="text-gray-700 text-base mb-8 font-medium">
            Aligning your next steps for deeper calm...
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

export default QuizAnalysis;
