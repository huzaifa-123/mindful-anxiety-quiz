
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
        return "You feel like you're always walking on eggshells, with your body reacting to stress with physical symptoms like rapid heartbeat, sweating, or feeling like you can't breathe. Your nervous system goes into overdrive, and you feel like you're losing control.";
      case "ruminator": 
        return "Your mind feels like it never stops - you get stuck in endless loops of worry, replay past events, and spiral into "what if" scenarios. You feel like your brain is working against you, and you can't turn off the constant thinking about potential problems.";
      case "avoidant":
        return "You tend to shy away from situations that make you uncomfortable, which can make your world feel smaller and smaller. You might avoid social situations, new experiences, or challenging tasks because they feel too overwhelming.";
      default:
        return "Your anxiety pattern is being analyzed.";
    }
  };

  const getSecondaryTypeDescription = (type: string, percentage: number) => {
    if (percentage < 20) return null;
    
    switch (type) {
      case "panic":
        return `There's also a tendency to experience panic-like symptoms or emotional outbursts, which can make situations feel more overwhelming or unpredictable.`;
      case "ruminator":
        return `You also tend to overthink and get caught up in mental loops, which can make decision-making and moving forward more challenging.`;
      case "avoidant":
        return `There's also a pattern of avoidance, where you might step back from challenging situations, which can limit your growth and experiences.`;
      default:
        return null;
    }
  };

  // Find secondary type
  const typePercentages = [
    { type: "panic", percentage: results.typePercentages.panic },
    { type: "ruminator", percentage: results.typePercentages.ruminator },
    { type: "avoidant", percentage: results.typePercentages.avoidant }
  ].filter(t => t.type !== results.dominantType)
   .sort((a, b) => b.percentage - a.percentage);

  const secondaryType = typePercentages[0];

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

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
            <div className="relative">
              <Progress 
                value={(results.severityScore / 40) * 100} 
                className="h-3 bg-gray-200"
              />
              <div 
                className={`absolute top-0 left-0 h-3 rounded-full transition-all ${typeStyles.progressColor}`}
                style={{ width: `${(results.severityScore / 40) * 100}%` }}
              />
            </div>
          </div>

          {/* Main type card */}
          <Card className={`mb-6 ${typeStyles.bgColor} ${typeStyles.borderColor} border-2`}>
            <CardContent className="p-4">
              <h3 className={`font-bold text-lg mb-2 ${typeStyles.textColor}`}>
                {getTypeTitle(results.dominantType).replace("THE ", "The ")}
              </h3>
              <p className={`text-sm leading-relaxed ${typeStyles.textColor}`}>
                {getTypeDescription(results.dominantType)}
              </p>
            </CardContent>
          </Card>

          {/* Secondary style section */}
          {secondaryType && secondaryType.percentage >= 20 && (
            <Card className="mb-6 bg-gray-50 border border-gray-200">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  Your Secondary Style
                </h3>
                <h4 className="font-semibold text-base mb-2 text-gray-700">
                  {getTypeTitle(secondaryType.type).replace("THE ", "The ")} ({secondaryType.percentage}%)
                </h4>
                <p className="text-sm leading-relaxed text-gray-600">
                  {getSecondaryTypeDescription(secondaryType.type, secondaryType.percentage)}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Anxiety severity section */}
          <Card className="mb-6 bg-white border border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                Your Anxiety Severity
              </h3>
              <h4 className="font-semibold text-base mb-2 text-gray-700 capitalize">
                {results.severity}
              </h4>
              <p className="text-sm leading-relaxed text-gray-600">
                {getSeverityDescription(results.severity)} Your anxiety affects your daily life and relationships, but there's hope. This is exactly where our proven methodology can help you gain control.
              </p>
            </CardContent>
          </Card>

          {/* Next steps section */}
          <div className="text-center mb-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              Next Step: Your Matched Therapeutic Tools
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Click below to view the best-fit techniques for your profile.
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/quiz/final-step")} // Will be 404 for now as requested
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
