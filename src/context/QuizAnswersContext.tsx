
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
const questionTextMap: Record<keyof QuizAnswer, string> = {
  question4: "Which statement best describes your anxiety?",
  question5: "When does your anxiety feel worse?",
  question6: "What triggers your anxiety most often?",
  question7: "What do you usually do when you feel anxious?",
  question8: "When anxiety strikes, what do you feel most?",
  question9: "How effective have the techniques been for you?",
  question10: "How much is anxiety affecting your daily life right now?",
  question11: "How often do you experience anxiety symptoms?",
  question12: "How distressed do you feel when the anxiety hits?",
  question13_cbt: "CBT familiarity",
  question13_mct: "MCT familiarity",
  question13_cbh: "CBH familiarity",
  question14: "How long have you been dealing with anxiety?",
  question15: "What has held you back from managing your anxiety in the past?",
  question16: "What’s your biggest motivation for taking this quiz today?",
  question17: "How do you want to feel 30 days from now?",
  question18: "How much time can you realistically dedicate each day to your mental wellbeing?",
  question19: "Do you find it difficult to stop or control worrying?",
  question20: "How often do you have trouble relaxing?",
  question21: "What consequences of anxiety do you feel the most?",
  question22: "What do you think needs to improve for you to feel more in control of anxiety?",
  question23: "When was the last time you felt a real sense of calm?",
  question24: "What is your primary goal from this plan?",
  plan_journaling: "Familiarity with journaling",
  plan_tools: "Response to body-based tools",
  plan_support_style: "Preferred support style",
  email_preference: "Email & SMS Preferences",
  gender: "",
  age: "",
  name: "",
  question13: ""
};

const answerTextMap: Record<string, string> = {
  // Q4 — Which statement best describes your anxiety?
  panic1: "I feel a sudden, overwhelming panic that seems to come out of nowhere.",
  avoidant1: "I often avoid situations because of anxiety and fear.",
  ruminator1: "I get stuck in endless overthinking, doubts, and 'what if' scenarios.",

  // Q5 — When does your anxiety feel worse?
  ruminator2: "First thing in the morning",
  avoidant2: "Before tasks or challenges",
  avoidant3: "In social situations",
  panic2: "At random times without a clear cause",
  ruminator3: "In the evening or before sleeping",
  panic3: "When physical symptoms suddenly spike (like a racing heart or short breath)",

  // Q6 — What triggers your anxiety most often?
  panic4: "Fear of losing control or panicking",
  avoidant4: "Fear of being judged or failing",
  ruminator4: "Fear of uncertainty or bad outcomes",
  panic5: "No clear trigger, it just 'hits' sometimes",
  avoidant5: "Fear of confrontation or having to express myself",
  ruminator5: "Fear of making the wrong decision or overthinking consequences",

  // Q7 — What do you usually do when you feel anxious?
  avoidant6: "Try to distract myself or escape the situation",
  ruminator6: "Try to 'think my way out' of the anxiety",
  panic6: "Fight against the anxious feelings",
  panic7: "Freeze due to overwhelming panic and fear",
  avoidant7: "Shut down emotionally to avoid discomfort",

  // Q8 — When anxiety strikes, what do you feel most?
  racing_thoughts: "Racing thoughts or mental overwhelm",
  chest_tightness: "Chest tightness or shallow breathing",
  dread: "Dread or a sense of impending doom",
  numbness: "Numbness or disconnection from the body",
  difficulty_concentrating: "Difficulty concentrating or making decisions",
  urge_escape: "Urge to escape or avoid the situation",
  irritability: "Irritability or emotional sensitivity",
  freeze_stuck: "I freeze or feel stuck",
  not_sure: "I’m not sure",

  // Q13 — Therapy familiarity
  never_heard: "I’ve never heard of it",
  heard_not_sure: "I’ve heard of it but not sure how it works",
  understand: "I understand it",
  tried_before: "I’ve tried it before",

  understand_cbt: "I understand CBT",
  heard_not_sure_cbt: "I’ve heard of CBT but not sure how it works",
  never_heard_cbt: "I’ve never heard of CBT",
  tried_cbt: "I’ve tried CBT before",

  understand_mct: "I understand MCT",
  heard_not_sure_mct: "I’ve heard of MCT but not sure how it works",
  never_heard_mct: "I’ve never heard of MCT",
  tried_mct: "I’ve tried MCT before",

  understand_cbh: "I understand CBH",
  heard_not_sure_cbh: "I’ve heard of CBH but not sure how it works",
  never_heard_cbh: "I’ve never heard of CBH",
  tried_cbh: "I’ve tried CBH before",

  // Q14 — How long have you been dealing with anxiety?
  few_weeks: "A few weeks",
  few_months: "A few months",
  over_year: "Over a year",
  several_years: "Several years",

  // Q15 — What has held you back from managing your anxiety in the past?
  didnt_know_what_work: "I didn’t know what would work",
  didnt_need_help: "I didn’t feel I needed outside help",
  tried_didnt_stick: "I tried things before but they didn’t stick",
  thought_could_manage: "I thought I could manage it myself",
  afraid_root: "I was afraid to face the root of it",

  // Q16 — Motivation for taking this quiz
  understand_whats_going_on: "I want to understand what’s really going on",
  want_tools: "I want tools to help me in anxious moments",
  want_stop_overthinking: "I want to stop overthinking and feel more calm",
  take_control: "I want to take control of my anxiety for good",

  // Q17 — How do you want to feel 30 days from now?
  clear_control: "Clear-headed and in control",
  less_reactive: "Less reactive to stress",
  more_confident: "More confident in everyday situations",
  more_present: "More present and less in my head",
  calmer_busy: "Calmer, even when life gets busy",

  // Q18 — Time available daily
  five_min: "5 minutes",
  ten_min: "10 minutes",
  fifteen_min: "15 minutes",
  twenty_plus_minutes: "20+ minutes",

  // Q19 — Worry control
  almost_always: "Almost always",
  often: "Often",
  sometimes: "Sometimes",
  almost_never: "Almost never",

  // Q20 — Trouble relaxing
  trouble_always: "Almost always",
  trouble_often: "Often",
  trouble_sometimes: "Sometimes",
  trouble_never: "Almost never",

  // Q21 — Consequences of anxiety
  overthinking_racing: "Overthinking and racing thoughts",
  panic_attacks: "Panic attacks",
  avoidance: "Avoidance",
  fear_rejection: "Fear of rejection",
  low_self_esteem: "Low self-esteem",

  // Q22 — What needs improvement?
  willpower: "My willpower",
  calm_state: "My calm state",
  energy_levels: "My energy levels",
  detach_thoughts: "Less attachment to thoughts",
  mental_strength: "My mental strength",

  // Q23 and Q24 (custom goals or subjective)
  past_month: "Within the past month",
  reclaim_energy: "Reclaim my energy",

  // Plan building — journaling, tools, support
  yes_used_before: "Yes, I’ve used journaling before",
  no_but_open: "No, but I’m open to it",
  yes_respond_well: "Yes, I respond well to breath/body-based tools",
  more_mental_focus: "I’m more mentally focused",
  prefer_guidance: "I prefer guidance and structure",
  go_own_pace: "I like to go at my own pace",
};



type QuizAnswersContextType = {
  answers: QuizAnswer;
  setAnswer: (key: keyof QuizAnswer, value: any) => void;
  resetAnswers: () => void;
   readableAnswers: Record<string, { question: string; answer: string }>;
  sendAnswersToAPI: () => Promise<void>;
};

const QuizAnswersContext = createContext<QuizAnswersContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
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
  const readableAnswers: Record<string, { question: string; answer: string }> = {};

  Object.entries(answers).forEach(([key, value]) => {
    const questionText = questionTextMap[key as keyof QuizAnswer] || key;

    let answerString: string = "";

    if (typeof value === "string" || typeof value === "number") {
      answerString = answerTextMap[value] || value.toString();
    } else if (Array.isArray(value)) {
      answerString = value
        .map((item) => answerTextMap[item] || item)
        .join(", ");
    } else if (typeof value === "object" && value !== null) {
      answerString = Object.entries(value)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
    } else {
      answerString = JSON.stringify(value);
    }

    readableAnswers[key] = {
      question: questionText,
      answer: answerString,
    };
  });
  const sendAnswersToAPI = async () => {
    try {
      const response = await fetch("https://services.leadconnectorhq.com/hooks/eowSraffPUqh7LbVROw5/webhook-trigger/smCWSOp0FkuqsIoWx9f3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(readableAnswers),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("✅ Submission successful:", result);
    } catch (error) {
      console.error("❌ Submission failed:", error);
    }
  };



  // Log the current state whenever component re-renders
  console.log(`🟡 CONTEXT RENDER: QuizAnswersProvider rendered with answers:`, JSON.stringify(answers, null, 2));
  console.log(`🟡 CONTEXT RENDER: Available answer keys:`, Object.keys(answers));
  console.log("🟢 READABLE ANSWERS FOR SUBMISSION:");
  console.log(JSON.stringify(readableAnswers, null, 2));

  return (
    <QuizAnswersContext.Provider value={{ answers, setAnswer, resetAnswers,readableAnswers,sendAnswersToAPI  }}>
      {children}
    </QuizAnswersContext.Provider>
  );
  
};
