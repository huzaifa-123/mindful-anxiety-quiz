
import { useState } from "react";

interface RatingScaleQuestionProps {
  question: string;
  subtitle?: string;
  lowLabel: string;
  highLabel: string;
  onRatingSelect: (rating: number) => void;
  questionNumber: string;
}

const RatingScaleQuestion = ({ 
  question, 
  subtitle, 
  lowLabel, 
  highLabel, 
  onRatingSelect, 
  questionNumber 
}: RatingScaleQuestionProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    // Auto-navigate after selection
    setTimeout(() => {
      onRatingSelect(rating);
    }, 200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-4">
      <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-2 text-center tracking-tight">
        {question}
      </h1>
      
      {subtitle && (
        <p className="text-gray-600 text-sm mb-8 text-center italic">
          {subtitle}
        </p>
      )}
      
      {/* Rating scale */}
      <div className="w-full max-w-lg mb-8">
        {/* Scale background */}
        <div className="relative mb-6">
          <div className="h-2 bg-flourishmint/30 rounded-full"></div>
          <div className="absolute top-0 left-0 h-2 bg-flourishmint rounded-full transition-all duration-300"
               style={{ width: selectedRating ? `${(selectedRating / 10) * 100}%` : '0%' }}></div>
        </div>
        
        {/* Number buttons */}
        <div className="flex justify-between items-center mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingClick(rating)}
              className={`w-8 h-8 rounded-full border-2 font-semibold text-sm transition-all ${
                selectedRating === rating
                  ? "bg-flourishmint border-flourishgreen text-flourishgreen"
                  : "bg-white border-gray-300 text-gray-600 hover:border-flourishmint"
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
        
        {/* Labels */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default RatingScaleQuestion;
