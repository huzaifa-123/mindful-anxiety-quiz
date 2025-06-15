
import React, { createContext, useContext, useState, ReactNode } from "react";

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
  question14?: string[];
  question15?: string;
  question16?: string[];
  question17?: string;
  question18?: string;
  question19?: string;
  question20?: string[];
  question21?: string;
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

export const QuizAnswersProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<QuizAnswer>({});

  const setAnswer = (key: keyof QuizAnswer, value: any) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const resetAnswers = () => setAnswers({});

  return (
    <QuizAnswersContext.Provider value={{ answers, setAnswer, resetAnswers }}>
      {children}
    </QuizAnswersContext.Provider>
  );
};
