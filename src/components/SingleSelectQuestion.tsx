import { useState, useEffect } from "react";

interface Option {
  id: string;
  text: string;
  type?: "panic" | "avoidant" | "ruminator";
  icon?: string;
}

interface SingleSelectQuestionProps {
  question: string;
  options: Option[];
  onSelect: (optionId: string) => void;
  questionNumber: string;
  subtitle?: string;
  initialSelectedId?: string;        // New prop for the preselected option id
}

const SingleSelectQuestion = ({
  question,
  options,
  onSelect,
  questionNumber,
  subtitle,
  initialSelectedId = "",            // default to empty string
}: SingleSelectQuestionProps) => {
  const [selectedId, setSelectedId] = useState<string>(initialSelectedId);

  // Sync with prop changes (if user navigates back and the initialSelectedId changes)
  useEffect(() => {
    setSelectedId(initialSelectedId);
  }, [initialSelectedId]);

  const handleClick = (optionId: string) => {
    setSelectedId(optionId);  // update local selection
    onSelect(optionId);       // notify parent
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-4">
      <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-2 text-center tracking-tight">
        {question}
      </h1>

      {subtitle && (
        <p className="text-gray-600 text-sm mb-6 text-center">
          {subtitle}
        </p>
      )}

      <div className="w-full space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedId === option.id
                ? "border-flourishmint bg-flourishmint/10"
                : "border-gray-200 bg-white hover:border-flourishmint/50 hover:bg-flourishmint/5"
            }`}
            onClick={() => handleClick(option.id)}
          >
            <div className="w-8 h-8 mr-4 flex-shrink-0">
              <img
                src={option.icon || "/dummy-icon.png"}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <span className="flex-1 text-gray-700 text-base">{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleSelectQuestion;
