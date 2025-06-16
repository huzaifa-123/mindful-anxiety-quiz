
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type QuizAnswer = {
  gender?: "male" | "female";
  age?: string;
  name?: string;
  question4?: string[];
  question5?: string[];
  question6?: string[];
  question7?: string;
  question8?: string[];
  question9?: number;
  question10?: number;
  question11?: number;
  question12?: number;
  question13_cbt?: string;
  question13_mct?: string;
  question13_cbh?: string;
  question13?: string;
  question14?: string; // Duration of anxiety (formerly question13)
  question15?: string[];
  question16?: string;
  question17?: string[];
  question18?: string; // Time available daily (formerly question17)
  question19?: string; // Worry control (formerly question18)
  question20?: string;
  question21?: string;
  question22?: string;
  question23?: string;
  question24?: string;
  plan_journaling?: string;
  plan_tools?: string;
  plan_support_style?: string;
  email_preference?: string;
  // More fields will be added for additional questions
};

type QuizAnswersContextType = {
  answers: QuizAnswer;
  setAnswer: (key: keyof QuizAnswer, value: any) => void;
  resetAnswers: () => void;
};

const QuizAnswersContext = createContext<QuizAnswersContextType | undefined>(undefined);

export const useQuizAnswers = () => {
  const ctx = useContext(QuizAnswersContext);
  if (!ctx) throw new Error("useQuizAnswers must be inside QuizAnswersProvider");
  return ctx;
};

const STORAGE_KEY = "quiz_answers";

export const QuizAnswersProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<QuizAnswer>({});

  // Load answers from localStorage on component mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem(STORAGE_KEY);
      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        console.log(`🟡 CONTEXT INIT: Loaded answers from localStorage:`, JSON.stringify(parsedAnswers, null, 2));
        setAnswers(parsedAnswers);
      } else {
        console.log(`🟡 CONTEXT INIT: No saved answers found in localStorage`);
      }
    } catch (error) {
      console.error(`🟡 CONTEXT ERROR: Failed to load answers from localStorage:`, error);
    }
  }, []);

  const setAnswer = (key: keyof QuizAnswer, value: any) => {
    console.log(`🟡 CONTEXT SETANSWER: Called with key: "${key}", value:`, value);
    console.log(`🟡 CONTEXT SETANSWER: Value type:`, typeof value);
    console.log(`🟡 CONTEXT SETANSWER: Is array:`, Array.isArray(value));
    console.log(`🟡 CONTEXT SETANSWER: JSON stringified value:`, JSON.stringify(value));
    console.log(`🟡 CONTEXT SETANSWER: Current answers before update:`, JSON.stringify(answers, null, 2));
    
    setAnswers((prev) => {
      const newAnswers = { ...prev, [key]: value };
      console.log(`🟡 CONTEXT SETANSWER: Updated answers object for ${key}:`, newAnswers[key]);
      console.log(`🟡 CONTEXT SETANSWER: Full answers object after update:`, JSON.stringify(newAnswers, null, 2));
      console.log(`🟡 CONTEXT SETANSWER: Keys in answers object:`, Object.keys(newAnswers));
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
        console.log(`🟡 CONTEXT SETANSWER: Saved to localStorage successfully`);
      } catch (error) {
        console.error(`🟡 CONTEXT ERROR: Failed to save to localStorage:`, error);
      }
      
      return newAnswers;
    });
  };

  const resetAnswers = () => {
    console.log(`🟡 CONTEXT RESET: Resetting all answers`);
    setAnswers({});
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log(`🟡 CONTEXT RESET: Cleared localStorage`);
    } catch (error) {
      console.error(`🟡 CONTEXT ERROR: Failed to clear localStorage:`, error);
    }
  };

  // Log the current state whenever component re-renders
  console.log(`🟡 CONTEXT RENDER: QuizAnswersProvider rendered with answers:`, JSON.stringify(answers, null, 2));
  console.log(`🟡 CONTEXT RENDER: Available answer keys:`, Object.keys(answers));

  return (
    <QuizAnswersContext.Provider value={{ answers, setAnswer, resetAnswers }}>
      {children}
    </QuizAnswersContext.Provider>
  );
};
