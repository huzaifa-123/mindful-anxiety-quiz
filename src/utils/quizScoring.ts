
interface QuizAnswers {
  question4?: string[];
  question5?: string[];
  question6?: string[];
  question7?: string;
  question8?: string[];
  // More questions will be added later
}

interface AnxietyTypeCount {
  panic: number;
  avoidant: number;
  ruminator: number;
}

interface QuizResults {
  dominantType: "panic" | "avoidant" | "ruminator";
  typePercentages: {
    panic: number;
    avoidant: number;
    ruminator: number;
  };
  severity: "mild" | "moderate" | "severe";
  severityScore: number;
}

// Mapping of answer IDs to anxiety types
const answerTypeMapping: Record<string, "panic" | "avoidant" | "ruminator"> = {
  // Question 4
  "panic1": "panic",
  "avoidant1": "avoidant",
  "ruminator1": "ruminator",
  
  // Question 5
  "ruminator2": "ruminator",
  "avoidant2": "avoidant",
  "avoidant3": "avoidant",
  "panic2": "panic",
  "ruminator3": "ruminator",
  "panic3": "panic",
  
  // Question 6
  "panic4": "panic",
  "avoidant4": "avoidant",
  "ruminator4": "ruminator",
  "panic5": "panic",
  "avoidant5": "avoidant",
  "ruminator5": "ruminator",
  
  // Question 7
  "avoidant6": "avoidant",
  "ruminator6": "ruminator",
  "panic6": "panic",
  "panic7": "panic",
  "avoidant7": "avoidant",
};

export const calculateQuizResults = (answers: QuizAnswers): QuizResults => {
  const typeCounts: AnxietyTypeCount = {
    panic: 0,
    avoidant: 0,
    ruminator: 0
  };

  let totalAnswers = 0;

  // Count answers for questions 4-7 (Question 8 is not scored)
  const scoredQuestions = ['question4', 'question5', 'question6', 'question7'];
  
  scoredQuestions.forEach(questionKey => {
    const questionAnswers = answers[questionKey as keyof QuizAnswers];
    
    if (Array.isArray(questionAnswers)) {
      // Multi-select questions
      questionAnswers.forEach(answerId => {
        const type = answerTypeMapping[answerId];
        if (type) {
          typeCounts[type]++;
          totalAnswers++;
        }
      });
    } else if (typeof questionAnswers === 'string') {
      // Single-select questions
      const type = answerTypeMapping[questionAnswers];
      if (type) {
        typeCounts[type]++;
        totalAnswers++;
      }
    }
  });

  // Calculate percentages
  const typePercentages = {
    panic: totalAnswers > 0 ? Math.round((typeCounts.panic / totalAnswers) * 100) : 0,
    avoidant: totalAnswers > 0 ? Math.round((typeCounts.avoidant / totalAnswers) * 100) : 0,
    ruminator: totalAnswers > 0 ? Math.round((typeCounts.ruminator / totalAnswers) * 100) : 0,
  };

  // Determine dominant type
  let dominantType: "panic" | "avoidant" | "ruminator" = "panic";
  let maxCount = typeCounts.panic;
  
  if (typeCounts.avoidant > maxCount) {
    dominantType = "avoidant";
    maxCount = typeCounts.avoidant;
  }
  
  if (typeCounts.ruminator > maxCount) {
    dominantType = "ruminator";
  }

  // TODO: Calculate severity based on scale questions from Part 3
  // For now, return placeholder values
  const severityScore = 0;
  const severity = "mild" as const;

  return {
    dominantType,
    typePercentages,
    severity,
    severityScore
  };
};
