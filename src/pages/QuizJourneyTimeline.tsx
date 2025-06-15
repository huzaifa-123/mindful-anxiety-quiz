import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useEffect, useState } from "react";

const QuizJourneyTimeline = () => {
  const navigate = useNavigate();
  const { answers } = useQuizAnswers();
  const [estimatedDate, setEstimatedDate] = useState<string>("");

  useEffect(() => {
    // Calculate estimated date based on quiz answers
    const calculateEstimatedDate = () => {
      // Base days from Q22 (anxiety duration)
      const baseDaysMap: Record<string, number> = {
        "started_recently": 10,
        "building_months": 14,
        "years_part_life": 21,
        "cant_remember": 28,
        "just_realized": 18
      };

      // Time multiplier from Q17 (daily time available)
      const timeMultiplierMap: Record<string, number> = {
        "5_minutes": 1.5,
        "10_minutes": 1.2,
        "15_minutes": 1,
        "20_plus_minutes": 0.85
      };

      const baseDays = baseDaysMap[answers.question22 || "building_months"] || 14;
      const timeMultiplier = timeMultiplierMap[answers.question17 || "15_minutes"] || 1;
      
      const estimatedDays = Math.round(baseDays * timeMultiplier);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + estimatedDays);
      
      const monthYear = futureDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
      
      setEstimatedDate(monthYear);
    };

    calculateEstimatedDate();
  }, [answers]);

  const handleContinue = () => {
    // Navigate to next step - you can update this destination
    console.log("Journey timeline completed!");
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
            Your Journey Toward Relief Has Already Begun
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-700 text-base mb-2 max-w-xl leading-relaxed">
            Based on your answers, we estimate you could begin experiencing noticeable improvement by:
          </p>
          
          {/* Estimated Date */}
          <div className="mb-6">
            <p className="text-gray-800 text-lg font-semibold">
              {estimatedDate}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              (based on anxiety duration and available daily time)
            </p>
          </div>
          
          {/* Timeline visualization with GIF */}
          <div className="w-full max-w-lg h-64 mb-6 flex items-center justify-center">
            <img
              src="/placeholder-timeline.gif"
              alt="Progress timeline showing journey from current state to goal integration"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          
          {/* Description paragraphs */}
          <p className="text-gray-700 text-base mb-4 max-w-xl leading-relaxed">
            This timeline is based on how long anxiety has been affecting you and how much time you can commit to your well-being each day. With consistent, intentional support, even small shifts create real momentum.
          </p>
          
          <p className="text-gray-700 text-base mb-8 max-w-xl leading-relaxed">
            This isn't a rigid schedule, it's an encouraging estimate that honors where you are and where you're headed.
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

export default QuizJourneyTimeline;
