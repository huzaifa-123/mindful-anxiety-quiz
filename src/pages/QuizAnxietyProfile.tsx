
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { calculateQuizResults, getAnxietyTypeDescription, getSeverityDescription } from "../utils/quizScoring";
import { Progress } from "../components/ui/progress";
import { Card, CardContent } from "../components/ui/card";

const QuizAnxietyProfile = () => {
  const navigate = useNavigate();
  const { answers } = useQuizAnswers();
  
  // Calculate results based on user's answers
  const results = calculateQuizResults(answers);
  
  // Get colors and styling based on anxiety type
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "panic":
        return {
          bgColor: "bg-orange-100",
          borderColor: "border-orange-300",
          textColor: "text-orange-800",
          badgeColor: "bg-orange-200 text-orange-800",
          progressColor: "bg-orange-400"
        };
      case "ruminator":
        return {
          bgColor: "bg-red-100",
          borderColor: "border-red-300", 
          textColor: "text-red-800",
          badgeColor: "bg-red-200 text-red-800",
          progressColor: "bg-red-400"
        };
      case "avoidant":
        return {
          bgColor: "bg-green-100",
          borderColor: "border-green-300",
          textColor: "text-green-800", 
          badgeColor: "bg-green-200 text-green-800",
          progressColor: "bg-green-400"
        };
      default:
        return {
          bgColor: "bg-gray-100",
          borderColor: "border-gray-300",
          textColor: "text-gray-800",
          badgeColor: "bg-gray-200 text-gray-800",
          progressColor: "bg-gray-400"
        };
    }
  };

  const typeStyles = getTypeStyles(results.dominantType);

  const getTypeTitle = (type: string) => {
    switch (type) {
      case "panic": return "THE PANIC TYPE";
      case "ruminator": return "THE RUMINATOR";
      case "avoidant": return "THE AVOIDANT";
      default: return "YOUR TYPE";
    }
  };

  const getTypeDescription = (type: string) => {
    switch (type) {
      case "panic":
        return "It can feel like anxiety strikes suddenly, with your body reacting before your mind understands why. This response is your nervous system in protection mode but it's working too hard. The good news? This pattern can be softened and safely rewired.";
      case "ruminator": 
        return "Your mind tends to loop, analyze, and overthink especially when things feel uncertain. It's not just mental noise. It's your system trying to gain control through thinking. But thinking harder doesn't bring peace, calming the system does.";
      case "avoidant":
        return "You tend to pull back when things feel intense avoiding confrontation, delaying action, or isolating when overwhelmed. This is your nervous system's way of keeping you safe. But over time, it can make life feel smaller than it needs to be.";
      default:
        return "Your anxiety pattern is being analyzed.";
    }
  };

  const getSecondaryTypeDescription = (type: string, percentage: number) => {
    switch (type) {
      case "panic":
        return `There are signs of panic-driven anxiety as well — sudden emotional surges, physical tension, or fear that seems to come out of nowhere.`;
      case "ruminator":
        return `There's also a mental loop pattern — constantly replaying, predicting, or analyzing things in your mind, especially during stress.`;
      case "avoidant":
        return `There's also a tendency to pull away, delay, or avoid uncomfortable situations. This can create a loop where fear builds and action feels harder.`;
      default:
        return null;
    }
  };

  const getSeverityDescriptionExtended = (severity: string) => {
    switch (severity) {
      case "mild":
        return "Your answers suggest anxiety is present but still manageable. This is a powerful place to begin making gentle changes before patterns deepen and energy drains further.";
      case "moderate":
        return "Your answers show that anxiety is impacting how you think, feel, and function. It's not overwhelming every moment but it is present enough to affect your energy and clarity. This is the perfect window to begin resetting these patterns gently and effectively.";
      case "severe":
        return "Your quiz responses show a high-impact level. Anxiety may be affecting sleep, focus, decisions, and even your sense of self. This isn't permanent but it's a sign your system needs support now, not later.";
      default:
        return "Your anxiety severity is being assessed.";
    }
  };

  // Find secondary type - this logic needs to be more robust
  const typePercentages = [
    { type: "panic", percentage: results.typePercentages.panic },
    { type: "ruminator", percentage: results.typePercentages.ruminator },
    { type: "avoidant", percentage: results.typePercentages.avoidant }
  ].filter(t => t.type !== results.dominantType)
   .sort((a, b) => b.percentage - a.percentage);

  const secondaryType = typePercentages[0];

  console.log("Secondary type data:", secondaryType);
  console.log("Should show secondary:", secondaryType && secondaryType.percentage >= 20);

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          
          {/* Title */}
          <h1 className="font-semibold text-2xl text-gray-800 mb-6 text-center">
            Your Personalized Anxiety Profile
          </h1>
          
          {/* Dominant anxiety type badge */}
          <div className="flex justify-center mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${typeStyles.badgeColor}`}>
              Your Dominant Anxiety Style
            </span>
          </div>
          
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {getTypeTitle(results.dominantType)}
            </h2>
          </div>

          {/* Character illustration */}
          <div className="flex justify-center mb-6">
            <img 
              src="/placeholder-anxiety-character.png" 
              alt="Anxiety character illustration" 
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Progress bar with proper visualization */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
            <div className="relative w-full h-4 rounded-full overflow-hidden bg-gradient-to-r from-green-400 via-yellow-400 to-red-500">
              {/* Progress indicator circle */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-gray-600 rounded-full shadow-lg transition-all duration-300"
                style={{ 
                  left: `calc(${(results.severityScore / 40) * 100}% - 12px)`,
                  zIndex: 10
                }}
              />
            </div>
          </div>

          {/* Main type card */}
          <Card className={`mb-6 ${typeStyles.bgColor} ${typeStyles.borderColor} border-2`}>
            <CardContent className="p-6">
              <h3 className={`font-bold text-lg mb-3 ${typeStyles.textColor}`}>
                {getTypeTitle(results.dominantType)}
              </h3>
              <p className={`text-sm leading-relaxed ${typeStyles.textColor}`}>
                {getTypeDescription(results.dominantType)}
              </p>
            </CardContent>
          </Card>

          {/* Secondary style section - ALWAYS show if there's a secondary type with >= 20% */}
          {secondaryType && secondaryType.percentage >= 20 && (
            <div className="mb-6">
              {/* Styled heading for Secondary Style */}
              <div className="flex justify-center mb-4">
                <div className="bg-flourishgreen text-white px-6 py-2 rounded-full">
                  <span className="font-semibold text-sm">Your Secondary Style</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <h4 className="font-semibold text-lg mb-3 text-gray-800">
                  {getTypeTitle(secondaryType.type).replace("THE ", "The ")} ({secondaryType.percentage}%)
                </h4>
                <p className="text-sm leading-relaxed text-gray-600">
                  {getSecondaryTypeDescription(secondaryType.type, secondaryType.percentage)}
                </p>
              </div>
            </div>
          )}

          {/* Anxiety severity section with styled heading */}
          <div className="mb-6">
            {/* Styled heading for Anxiety Severity */}
            <div className="flex justify-center mb-4">
              <div className="bg-flourishgreen text-white px-6 py-2 rounded-full">
                <span className="font-semibold text-sm">Your Anxiety Severity</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h4 className="font-semibold text-lg mb-3 text-gray-800 capitalize">
                {results.severity}
              </h4>
              <p className="text-sm leading-relaxed text-gray-600">
                {getSeverityDescriptionExtended(results.severity)}
              </p>
            </div>
          </div>

          {/* Next steps section */}
          <div className="text-center mb-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              Next Step: Your Matched Therapeutic Tools
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Click below to view the best-fit techniques for your profile.
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/quiz/final-step")}
              className="bg-flourishmint text-white px-8 py-3 rounded-full font-semibold hover:bg-flourishmint/90 transition-colors"
            >
              Show My Best-Fit Techniques
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizAnxietyProfile;
