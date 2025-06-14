
import React, { createContext, useContext, useState, ReactNode } from "react";

type QuizAnswer = {
  gender?: "male" | "female";
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
