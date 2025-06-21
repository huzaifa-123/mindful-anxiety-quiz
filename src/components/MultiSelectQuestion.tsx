
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

interface Option {
  id: string;
  text: string;
  type?: "panic" | "avoidant" | "ruminator";
  icon?: string;
}

interface MultiSelectQuestionProps {
  question: string;
  options: Option[];
  onContinue: (selectedOptions: string[]) => void;
  questionNumber: string;
}

const MultiSelectQuestion = ({ question, options, onContinue, questionNumber }: MultiSelectQuestionProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (optionId: string) => {
    console.log(`🔵 MULTI-SELECT DEBUG: Toggling option ${optionId}`);
    setSelectedOptions(prev => {
      const newSelection = prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId];
      console.log(`🔵 MULTI-SELECT DEBUG: New selection:`, newSelection);
      return newSelection;
    });
  };

  const handleContinue = () => {
    console.log(`🔵 MULTI-SELECT DEBUG: Continue button clicked with selections:`, selectedOptions);
    console.log(`🔵 MULTI-SELECT DEBUG: Selected options length:`, selectedOptions.length);
    console.log(`🔵 MULTI-SELECT DEBUG: About to call onContinue with:`, selectedOptions);
    onContinue(selectedOptions);
  };

  console.log(`🔵 MULTI-SELECT DEBUG: Component rendered for question ${questionNumber}`);
  console.log(`🔵 MULTI-SELECT DEBUG: Current selected options:`, selectedOptions);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-4">
      <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-2 text-center tracking-tight">
        {question}
      </h1>
      
      <p className="text-gray-600 text-sm mb-8 text-center">
        (Select all that apply)
      </p>
      
      <div className="w-full space-y-3 mb-12">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedOptions.includes(option.id)
                ? "border-flourishmint bg-flourishmint/10"
                : "border-gray-200 bg-white hover:border-flourishmint/50"
            }`}
            onClick={() => handleOptionToggle(option.id)}
          >
            <div className="w-8 h-8 mr-4 flex-shrink-0">
              <img
                src={option.icon || "/dummy-icon.png"}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <span className="flex-1 text-gray-700 text-base">
              {option.text}
            </span>
            <Checkbox
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionToggle(option.id)}
              className="ml-4"
            />
          </div>
        ))}
      </div>
      
      <div className="w-full flex flex-col items-center">
        <button
          onClick={handleContinue}
          disabled={selectedOptions.length === 0}
          className="rounded-full bg-flourishmint text-white text-base font-semibold px-10 py-2 shadow-md transition duration-150 disabled:opacity-50 hover:scale-105 hover:brightness-110"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MultiSelectQuestion;
