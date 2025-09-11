
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
      console.log("🗓️ TIMELINE DEBUG: Starting date calculation");
      console.log("🗓️ TIMELINE DEBUG: All quiz answers:", JSON.stringify(answers, null, 2));
      
      // Use question22 (when anxiety started) and question17 (time available daily)
      const q22Value = answers.question22; // When anxiety started affecting daily life
      const q17Value = answers.question17; // Time available daily 
      
      console.log("🗓️ TIMELINE DEBUG: Q22 answer (when anxiety started):", q22Value);
      console.log("🗓️ TIMELINE DEBUG: Q17 answer (time available):", q17Value);

      // Base days from Q22 (when anxiety started) - CORRECTED MAPPING
      const baseDaysMap: Record<string, number> = {
        "past_month": 10,      // Recent onset - faster progress
        "few_months": 14,      // Building up - moderate timeline  
        "years": 21,          // Long-term - more time needed
        "cant_remember": 28,   // Very long-term - longest timeline
        "just_realized": 12,   // Just realized - moderate-fast timeline
      };

      // Time multiplier from Q17 (daily time available) - CORRECTED MAPPING
      const timeMultiplierMap: Record<string, number> = {
        "5_minutes": 1.5,      // Less time = longer timeline
        "10_minutes": 1.2,     // Moderate time = slight longer
        "15_minutes": 1,       // Good time = baseline
        "20_plus_minutes": 0.85 // More time = faster progress
      };

      // Get Q22 answer (when anxiety started) - use default if undefined
      const baseDays = q22Value ? baseDaysMap[q22Value] || 14 : 14;
      
      // Get Q17 answer (daily time available) - use default if undefined
      // Handle case where Q17 might be an array (from multi-select) or string
      const q17TimeValue = Array.isArray(q17Value) ? q17Value[0] : q17Value;
      const timeMultiplier = q17TimeValue ? timeMultiplierMap[q17TimeValue] || 1 : 1;
      
      console.log("🗓️ TIMELINE DEBUG: Base days:", baseDays, "for when started:", q22Value);
      console.log("🗓️ TIMELINE DEBUG: Time multiplier:", timeMultiplier, "for time:", q17TimeValue);
      console.log("🗓️ TIMELINE DEBUG: Available mappings for Q22:", Object.keys(baseDaysMap));
      console.log("🗓️ TIMELINE DEBUG: Available mappings for Q17:", Object.keys(timeMultiplierMap));
      
      // Apply the correct formula: estimated_days = base_days × multiplier
      const estimatedDays = Math.round(baseDays * timeMultiplier);
      console.log("🗓️ TIMELINE DEBUG: Estimated days calculation:", baseDays, "×", timeMultiplier, "=", estimatedDays);
      
      // Calculate future date: estimated_date = today + estimated_days
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + estimatedDays);
      
      const monthYear = futureDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
      
      console.log("🗓️ TIMELINE DEBUG: Today:", today.toLocaleDateString());
      console.log("🗓️ TIMELINE DEBUG: Adding", estimatedDays, "days to today");
      console.log("🗓️ TIMELINE DEBUG: Future date:", futureDate.toLocaleDateString());
      console.log("🗓️ TIMELINE DEBUG: Estimated date string:", monthYear);
      
      // Check if calculation is working correctly
      if (monthYear === "June 2025" && estimatedDays === 14) {
        console.log("🚨 TIMELINE DEBUG: Still getting default calculation - check Q22/Q17 values");
        console.log("🚨 TIMELINE DEBUG: Q22 exists in answers?", q22Value !== undefined);
        console.log("🚨 TIMELINE DEBUG: Q17 exists in answers?", q17Value !== undefined);
      } else {
        console.log("✅ TIMELINE DEBUG: Calculation appears to be working correctly");
      }
      
      setEstimatedDate(monthYear);
    };

    calculateEstimatedDate();
  }, [answers]);

  const handleContinue = () => {
    navigate("/quiz/calm-reset-plan-builder");
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
              {estimatedDate || "Calculating..."}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              (based on when anxiety started and available daily time)
            </p>
          </div>
          
          {/* Timeline visualization container */}
          <div className="w-full max-w-md mb-2 flex flex-col items-center">
            <h2 className="text-gray-800 font-semibold text-lg mt-8  tracking-wide">
              30 DAYS TIMELINE
            </h2>
            <div>
              <img
                src="/QuizDesign/Final_Quiz Section Design (2).gif"
                alt="Progress timeline showing journey from current state to goal integration"
                className="w-full h-auto object-contain max-h-64 block m-0 p-0"
                draggable={false}
                loading="lazy"
              />
            </div>
            {/* Labels under bars */}
            <div className="grid grid-cols-5 text-center text-[9px] font-bold leading-none -mt-7 gap-x-1">
            <div className="leading-tight">
              <div>Current</div>
              <div>State</div>
            </div>
            <div className="leading-tight">
              <div>Early</div>
              <div>Shifts</div>
            </div>
            <div className="leading-tight">
              <div>Ongoing</div>
              <div>Shift</div>
            </div>
            <div className="leading-tight">
              <div>Target</div>
              <div>Relief</div>
            </div>
            <div className="leading-tight">
              <div>Goal</div>
              <div>Integration</div>
            </div>
          </div>

            <img
              src="/QuizDesign/Progress bar after timeline.png"
              alt="Progress bar showing stages of anxiety relief journey"
              className="w-full h-auto object-contain  max-h-64 block m-0 p-0 -mt-24"
              draggable={false}
            />
          </div>

            {/* Description paragraphs */}
           <p className="text-gray-700 text-base mb-4 max-w-xl leading-relaxed -mt-16">
             This timeline is based on when anxiety started affecting you and how much time you can commit to your well-being each day. With consistent, intentional support, even small shifts create real momentum.
           </p>
           
           <p className="text-gray-700 text-base mb-8 max-w-xl leading-relaxed">
             This isn't a rigid schedule, it's an encouraging estimate that honors where you are and where you're headed.
           </p>
          
          <button
            onClick={handleContinue}
            className="rounded-full bg-flourishmint text-white text-base font-semibold px-10 py-2 mb-6 shadow-md transition duration-150 hover:scale-105 hover:brightness-110"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizJourneyTimeline;
