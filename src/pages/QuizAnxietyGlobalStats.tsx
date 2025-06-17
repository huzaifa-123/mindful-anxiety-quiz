
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizAnxietyGlobalStats = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/quiz/results");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          {/* Main heading */}
          <h1 className="font-semibold text-xl md:text-2xl text-gray-800 mb-6 tracking-tight">
            Anxiety is more common and more solvable than you think.
          </h1>
           <div className="w-full flex justify-center items-center px-6">
            <img
              src="/QuizDesign/Final_Quiz Section Design.gif" 
              alt="World map showing anxiety statistics with location pins"
              className="w-full max-w-2xl object-contain"
              draggable={false}
            />
          </div>
          {/* Statistics text */}
          <p className="text-gray-700 text-base mb-2">
            Over <span className="font-semibold">280 million people</span> around the world experience anxiety.
          </p>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-8 max-w-xl leading-relaxed">
            The good news? Proven methods like CBT, MCT, and CBH have helped millions shift from survival mode to inner calm without years of trial and error.
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

export default QuizAnxietyGlobalStats;
