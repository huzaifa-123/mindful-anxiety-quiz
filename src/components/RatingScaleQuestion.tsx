
import { useState } from "react";
import { Slider } from "./ui/slider";

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
  const [selectedRating, setSelectedRating] = useState<number>(5);

  const handleSliderChange = (value: number[]) => {
    const rating = value[0];
    setSelectedRating(rating);
  };

  const handleSliderCommit = (value: number[]) => {
    const rating = value[0];
    // Auto-navigate after selection with slight delay
    setTimeout(() => {
      onRatingSelect(rating);
    }, 300);
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
        {/* Slider component */}
        <div className="mb-6">
          <Slider
            value={[selectedRating]}
            onValueChange={handleSliderChange}
            onValueCommit={handleSliderCommit}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
        
        {/* Number labels */}
        <div className="flex justify-between items-center mb-6 px-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <span
              key={rating}
              className={`text-sm font-medium transition-all ${
                selectedRating === rating
                  ? "text-flourishgreen font-bold scale-110"
                  : "text-gray-500"
              }`}
            >
              {rating}
            </span>
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
