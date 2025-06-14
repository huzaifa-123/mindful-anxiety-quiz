
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizAnxietyStats = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // TODO: Navigate to next quiz section (part 2 or next question)
    console.log("Continue to next section");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          {/* Main heading */}
          <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-2 tracking-tight">
            Over 280 million people worldwide experience anxiety.
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-base mb-8 max-w-xl">
            Evidence-based approaches like CBT, MCT, and CBH have helped millions reduce symptoms and restore calm.
          </p>
          
          {/* World map with location pins - placeholder for GIF */}
          <div className="w-full max-w-lg h-64 mb-8 flex items-center justify-center bg-gray-100 rounded-lg">
            <img
              src="/placeholder-world-map.gif"
              alt="World map showing anxiety statistics"
              className="w-full h-full object-contain rounded-lg"
              draggable={false}
            />
          </div>
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

export default QuizAnxietyStats;
