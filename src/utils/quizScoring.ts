interface QuizAnswers {
  question4?: string[] | any;
  question5?: string[] | any;
  question6?: string[] | any;
  question7?: string | any;
  question8?: string[] | any;
  question9?: number | any;
  question10?: number | any;
  question11?: number | any;
  question12?: number | any;
  question13?: string | any;
  question17?: string | any;
  // Add other questions as needed
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

// Fixed mapping of answer IDs to anxiety types - these should match the actual IDs from the quiz questions
const answerTypeMapping: Record<string, "panic" | "avoidant" | "ruminator"> = {
  // Question 4 - Which statement best describes your anxiety?
  "panic1": "panic",        // I feel a sudden, overwhelming panic that seems to come out of nowhere
  "avoidant1": "avoidant",  // I often avoid situations because of anxiety and fear
  "ruminator1": "ruminator", // I get stuck in endless overthinking, doubts, and "what if" scenarios
  
  // Question 5 - When does your anxiety feel worse?
  "ruminator2": "ruminator", // First thing in the morning
  "avoidant2": "avoidant",   // Before tasks or challenges
  "avoidant3": "avoidant",   // In social situations
  "panic2": "panic",         // At random times without a clear cause
  "ruminator3": "ruminator", // In the evening or before sleeping
  "panic3": "panic",         // When physical symptoms suddenly spike
  
  // Question 6 - What triggers your anxiety most often?
  "panic4": "panic",         // Fear of losing control or panicking
  "avoidant4": "avoidant",   // Fear of being judged or failing
  "ruminator4": "ruminator", // Fear of uncertainty or bad outcomes
  "panic5": "panic",         // No clear trigger, it just "hits" sometimes
  "avoidant5": "avoidant",   // Fear of confrontation or having to express myself
  "ruminator5": "ruminator", // Fear of making the wrong decision or overthinking consequences
  
  // Question 7 - What do you usually do when you feel anxious?
  "avoidant6": "avoidant",   // Try to distract myself or escape the situation
  "ruminator6": "ruminator", // Try to "think my way out" of the anxiety
  "panic6": "panic",         // Fight against the anxious feelings
  "panic7": "panic",         // Freeze due to overwhelming panic and fear
  "avoidant7": "avoidant",   // Shut down emotionally to avoid discomfort
};

// Helper function to extract actual values from malformed data
const extractValue = (value: any): any => {
  console.log(`🔧 EXTRACT DEBUG: Input value:`, value);
  console.log(`🔧 EXTRACT DEBUG: Type:`, typeof value);
  console.log(`🔧 EXTRACT DEBUG: JSON:`, JSON.stringify(value));
  
  // If it's a malformed object with _type and value properties
  if (value && typeof value === 'object' && '_type' in value && 'value' in value) {
    console.log(`🔧 EXTRACT DEBUG: Found malformed object, checking value:`, value.value);
    
    // If the nested value is the string "undefined", return undefined
    if (value.value === "undefined") {
      console.log(`🔧 EXTRACT DEBUG: Nested value is string "undefined", returning undefined`);
      return undefined;
    }
    
    console.log(`🔧 EXTRACT DEBUG: Extracting nested value:`, value.value);
    return value.value;
  }
  
  // If it's the string "undefined", return undefined
  if (value === "undefined") {
    console.log(`🔧 EXTRACT DEBUG: Value is string "undefined", returning undefined`);
    return undefined;
  }
  
  // If it's a normal value, return as is
  console.log(`🔧 EXTRACT DEBUG: Normal value, returning as is:`, value);
  return value;
};

export const calculateQuizResults = (answers: QuizAnswers): QuizResults => {
  console.log("🚀 SCORING DEBUG: Starting calculation with raw answers:", JSON.stringify(answers, null, 2));
  
  // Step 1: Extract and clean the answers
  const cleanedAnswers = {
    question4: extractValue(answers.question4),
    question5: extractValue(answers.question5),
    question6: extractValue(answers.question6),
    question7: extractValue(answers.question7),
    question9: extractValue(answers.question9),
    question10: extractValue(answers.question10),
    question11: extractValue(answers.question11),
    question12: extractValue(answers.question12),
    question13: extractValue(answers.question13),
    question17: extractValue(answers.question17),
  };
  
  console.log("🧹 SCORING DEBUG: Cleaned answers:", JSON.stringify(cleanedAnswers, null, 2));
  
  // Step 2: Calculate anxiety type percentages
  const typeCounts: AnxietyTypeCount = {
    panic: 0,
    avoidant: 0,
    ruminator: 0
  };

  let totalTypedAnswers = 0;

  // Count answers for questions 4-7 (these determine anxiety type)
  const typeQuestions = ['question4', 'question5', 'question6', 'question7'];
  
  typeQuestions.forEach(questionKey => {
    const questionAnswers = cleanedAnswers[questionKey as keyof typeof cleanedAnswers];
    console.log(`🔍 SCORING DEBUG: Processing ${questionKey}:`, questionAnswers);
    
    // Skip if the answer is undefined or null
    if (questionAnswers === undefined || questionAnswers === null) {
      console.log(`⚠️ SCORING DEBUG: ${questionKey} is undefined/null, skipping`);
      return;
    }
    
    if (Array.isArray(questionAnswers)) {
      // Multi-select questions (4, 5, 6)
      console.log(`📝 SCORING DEBUG: ${questionKey} is array with ${questionAnswers.length} items`);
      questionAnswers.forEach(answerId => {
        console.log(`🎯 SCORING DEBUG: Looking up answer ID: "${answerId}"`);
        const type = answerTypeMapping[answerId];
        if (type) {
          typeCounts[type]++;
          totalTypedAnswers++;
          console.log(`✅ SCORING DEBUG: Mapped "${answerId}" to "${type}". New count: ${typeCounts[type]}`);
        } else {
          console.log(`❌ SCORING DEBUG: No mapping found for answer ID: "${answerId}"`);
          console.log(`🗺️ SCORING DEBUG: Available mappings:`, Object.keys(answerTypeMapping));
        }
      });
    } else if (typeof questionAnswers === 'string' && questionAnswers !== '') {
      // Single-select questions (7)
      console.log(`📝 SCORING DEBUG: ${questionKey} is string: "${questionAnswers}"`);
      const type = answerTypeMapping[questionAnswers];
      if (type) {
        typeCounts[type]++;
        totalTypedAnswers++;
        console.log(`✅ SCORING DEBUG: Mapped "${questionAnswers}" to "${type}". New count: ${typeCounts[type]}`);
      } else {
        console.log(`❌ SCORING DEBUG: No mapping found for single answer ID: "${questionAnswers}"`);
        console.log(`🗺️ SCORING DEBUG: Available mappings:`, Object.keys(answerTypeMapping));
      }
    } else {
      console.log(`⚠️ SCORING DEBUG: ${questionKey} is not a valid format:`, typeof questionAnswers, questionAnswers);
    }
  });

  console.log("📊 SCORING DEBUG: Final type counts:", typeCounts);
  console.log("🔢 SCORING DEBUG: Total typed answers:", totalTypedAnswers);

  // Calculate percentages for anxiety types
  const typePercentages = {
    panic: totalTypedAnswers > 0 ? Math.round((typeCounts.panic / totalTypedAnswers) * 100) : 0,
    avoidant: totalTypedAnswers > 0 ? Math.round((typeCounts.avoidant / totalTypedAnswers) * 100) : 0,
    ruminator: totalTypedAnswers > 0 ? Math.round((typeCounts.ruminator / totalTypedAnswers) * 100) : 0,
  };

  console.log("📈 SCORING DEBUG: Type percentages:", typePercentages);

  // Determine dominant anxiety type
  let dominantType: "panic" | "avoidant" | "ruminator" = "panic";
  let maxCount = typeCounts.panic;
  
  if (typeCounts.avoidant > maxCount) {
    dominantType = "avoidant";
    maxCount = typeCounts.avoidant;
  }
  
  if (typeCounts.ruminator > maxCount) {
    dominantType = "ruminator";
  }

  console.log("🏆 SCORING DEBUG: Dominant type:", dominantType, "with count:", maxCount);

  // Step 3: Calculate severity based on scale questions (9, 10, 11, 12)
  const scaleQuestions = [
    cleanedAnswers.question9 || 0,   // How effective have techniques been
    cleanedAnswers.question10 || 0,  // How much anxiety affects daily life
    cleanedAnswers.question11 || 0,  // How often experience anxiety symptoms
    cleanedAnswers.question12 || 0   // How distressed when anxiety hits
  ];

  console.log("📏 SCORING DEBUG: Scale question answers:", scaleQuestions);

  // Convert any non-numeric values to 0
  const numericScaleQuestions = scaleQuestions.map(val => {
    const num = typeof val === 'number' ? val : parseInt(val) || 0;
    console.log(`🔢 SCORING DEBUG: Converting scale value ${val} to ${num}`);
    return num;
  });

  // Sum up all scale ratings (each question is rated 1-10)
  const severityScore = numericScaleQuestions.reduce((sum, rating) => sum + rating, 0);
  console.log("🎯 SCORING DEBUG: Severity score:", severityScore);

  // Classify severity based on total score (out of 40 max)
  let severity: "mild" | "moderate" | "severe";
  if (severityScore <= 13) {
    severity = "mild";
  } else if (severityScore <= 26) {
    severity = "moderate";
  } else {
    severity = "severe";
  }

  console.log("🎨 SCORING DEBUG: Final severity:", severity);

  const results = {
    dominantType,
    typePercentages,
    severity,
    severityScore
  };

  console.log("🏁 SCORING DEBUG: Final results:", JSON.stringify(results, null, 2));

  return results;
};

// Helper function to get anxiety type description
export const getAnxietyTypeDescription = (type: "panic" | "avoidant" | "ruminator"): string => {
  switch (type) {
    case "panic":
      return "You experience sudden, intense episodes of anxiety that can feel overwhelming and unpredictable.";
    case "avoidant":
      return "You tend to avoid situations or experiences that trigger your anxiety, often limiting your activities.";
    case "ruminator":
      return "You get caught in cycles of overthinking, worry, and 'what if' scenarios that are hard to break.";
    default:
      return "Your anxiety pattern is being analyzed.";
  }
};

// Helper function to get severity description
export const getSeverityDescription = (severity: "mild" | "moderate" | "severe"): string => {
  switch (severity) {
    case "mild":
      return "Your anxiety has a manageable impact on your daily life.";
    case "moderate":
      return "Your anxiety significantly affects your daily activities and well-being.";
    case "severe":
      return "Your anxiety has a major impact on multiple areas of your life.";
    default:
      return "Your anxiety severity is being assessed.";
  }
};
