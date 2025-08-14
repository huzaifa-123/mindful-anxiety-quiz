# Mindful Anxiety Quiz

---

## Overview

The **Mindful Anxiety Quiz** is a React-based web application designed to guide users through a personalized anxiety assessment and deliver a customized calming plan. The quiz collects user data through a multi-step flow, analyzes responses, and presents a tailored plan to support mental wellness.

---

## Table of Contents

- [Project Structure](#project-structure)  
- [Key Technologies](#key-technologies)  
- [Application Flow](#application-flow)  
- [Code Architecture & Flow](#code-architecture--flow)  
- [Context & State Management](#context--state-management)  
- [Pages & Components](#pages--components)  
- [Styling & Assets](#styling--assets)  
- [Running the Project](#running-the-project)  
- [Scoring Logic](#scoring-logic)  
- [Contributing](#contributing)  
- [Contact](#contact)  
- [Summary](#summary)  

---

## Project Structure

src/
├── components/ # Reusable UI components (buttons, headers, cards, etc.)
├── context/ # React context providers for global state (QuizAnswersContext)
├── hooks/ # Custom React hooks
├── lib/ # Utility libraries and helpers
├── pages/ # Page components for each route/step of the quiz
├── utils/ # Utility functions
├── App.tsx # Main app component with route setup
├── main.tsx # Entry point rendering the app
├── index.css # Global styles
├── App.css # App-specific styles
└── vite-env.d.ts # Vite environment typings

text

---

## Key Technologies

- **React + TypeScript**: Frontend UI and logic  
- **React Router**: Client-side routing and navigation between quiz steps  
- **Context API**: Global state management for quiz answers  
- **Tailwind CSS**: Utility-first CSS framework for styling  
- **Vite**: Build tool and development server  

---

## Application Flow

1. **User Entry & Onboarding**  
   The user starts the quiz and is guided through a series of pages collecting personal information, preferences, and anxiety-related data.

2. **Quiz Steps**  
   - **Demographics & Preferences**: Gender (`QuizGender.tsx`), Age (`QuizAge.tsx`), Email (`QuizEmailPreference.tsx`), Phone (`QuizPhoneNumber.tsx`)  
   - **Anxiety Assessment**: Multiple question pages (`QuizQuestion4.tsx` through `QuizQuestion24.tsx`) gather detailed anxiety profile data.  
   - **Analysis & Stats**: Pages like `QuizAnxietyStats.tsx`, `QuizAnxietyProfile.tsx`, and `QuizAnxietyGlobalStats.tsx` analyze and present user data.  
   - **Plan Building**: `QuizCalmResetPlanBuilder.tsx` and `QuizPlan.tsx` generate a personalized calming plan based on answers.  
   - **Completion**: `QuizPlanCompletion.tsx` confirms completion and next steps.

3. **Navigation**  
   Navigation is handled via React Router, with each page representing a route. The `Header` component provides back navigation where appropriate.

4. **State Management**  
   User answers are stored in a global context (`QuizAnswersContext`) and updated as the user progresses.

---

## Code Architecture & Flow

### 1. Routing & Page Navigation

- The app uses **React Router** (see `App.tsx`) to define all quiz steps as routes.  
- Each quiz step (e.g., `QuizGender.tsx`, `QuizAge.tsx`, `QuizEmailPreference.tsx`, etc.) is a separate page component under `src/pages/`.  
- Navigation between pages is handled using the `useNavigate` hook from React Router.

### 2. Global State with Context

- **QuizAnswersContext** (in `src/context/QuizAnswersContext.tsx`) holds all user answers and preferences.  
- It provides:  
  - `answers`: The current state of all quiz answers.  
  - `setAnswer(key, value)`: A function to update a specific answer.  
- *Usage example:*  
import { useQuizAnswers } from "../context/QuizAnswersContext";
// ...
const { answers, setAnswer } = useQuizAnswers();
setAnswer("gender", "female");

text
- The context is provided at the top-level (likely in `main.tsx` or `App.tsx`), so all pages/components can access and update quiz answers.

### 3. Data Flow Example

- User lands on `/quiz/gender` → chooses gender → calls `setAnswer("gender", value)` → navigates to `/quiz/age`.  
- User lands on `/quiz/age` → chooses age → calls `setAnswer("age", value)` → navigates to next step.  
- This pattern continues through all quiz steps.  
- Summary/Results Pages (like `QuizAnxietyProfile.tsx`, `QuizPlan.tsx`) read all answers from context and display analysis or a personalized plan.

### 4. Reusable Components

- Common UI elements (buttons, headers, cards, progress bars, etc.) live in `src/components/`.  
- Example: The `Header` component is imported and used at the top of most pages for consistent navigation/back button.

### 5. Styling

- **Tailwind CSS** is used throughout for utility-first styling.  
- Custom colors and fonts are set in the Tailwind config.  
- Example of a styled button:  
<button className="bg-flourishmint py-3 px-6 rounded-full font-semibold">Continue</button>

text

### 6. Error Handling & Validation

- Input pages (email, phone, etc.) include validation logic.  
- Errors are shown inline using conditional rendering and Tailwind classes.

### 7. Page Completion & Plan Generation

- After the last quiz question, the app navigates to analysis and plan pages.  
- These pages use the full `answers` object from context to generate and display the personalized plan.

---

## Context & State Management

- **QuizAnswersContext** (in `src/context/QuizAnswersContext.tsx`) stores all user answers and preferences.  
- Methods like `setAnswer` update answers.  
- The context ensures data persistence across pages and enables analysis components to access user data.

---

## Pages & Components

### Important Pages (`src/pages/`)

- `QuizGender.tsx`: Collects gender information.  
- `QuizAge.tsx`: Collects age.  
- `QuizEmailPreference.tsx`: Collects email for plan delivery.  
- `QuizPhoneNumber.tsx`: Optional phone number for SMS.  
- `QuizQuestionX.tsx`: Series of quiz questions (X = 4 to 24).  
- `QuizAnxietyProfile.tsx`: Displays personalized anxiety profile.  
- `QuizCalmResetPlanBuilder.tsx`: Builds personalized calming plan.  
- `QuizPlan.tsx`: Shows the generated plan.  
- `QuizPlanCompletion.tsx`: Final confirmation page.  
- `NotFound.tsx`: 404 page for unmatched routes.

### Key Components (`src/components/`)

- `Header.tsx`: Top navigation bar with optional back button.  
- Various UI components for buttons, cards, progress bars, etc.

---

## Styling & Assets

- **Tailwind CSS** is used extensively for layout, typography, colors, and responsive design.  
- Custom colors like `flourishmint`, `flourishgreen`, and `flourishwhite` are defined in Tailwind config.  
- Images and icons are stored in `src/assets` or imported directly in components.

---

## Running the Project

### Prerequisites

- Node.js (v16+ recommended)  
- npm or yarn package manager

### Setup

Clone the repo
git clone <repo-url>
cd mindful-anxiety-quiz

Install dependencies
npm install

or
yarn install

Start development server
npm run dev

or
yarn dev

text

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Scoring Logic

The Mindful Anxiety Quiz uses a combination of user inputs to calculate personalized anxiety profiles and severity levels. The scoring logic is implemented primarily in the `calculateQuizResults` utility function (located in `src/utils/quizScoring.ts`).

### Anxiety Type Determination

- User answers to core questions (such as question 4, 5, and 6) are mapped to distinct anxiety types:  
  - **Panic:** Sudden physical panic symptoms and unpredictable attacks.  
  - **Avoidant:** Avoidance behaviors due to fear of judgment or discomfort.  
  - **Ruminator:** Tendency to overthink, obsess, and ruminate.

- Each answer choice is associated with one or more anxiety types through mappings like `answerTextMap`.

- The quiz tallies counts or weighted scores for each type across relevant questions to determine the dominant anxiety type.

### Severity and Symptom Scores

- Additional questions (e.g., frequency of symptoms, distress levels, daily impact) contribute numeric scores representing severity.

- Severity scores are aggregated into categories such as "low," "moderate," or "severe" to tailor the user's plan.

- Specific symptom metrics (like panic attack frequency or worry control) are converted into percentage values used for progress bars and visualization components.

### Plan Personalization

- Based on dominant anxiety type and severity scores, the app selects tailored therapeutic focuses and treatment strategies.

- The scoring results influence which modules (CBT, MCT, CBH) and plan components are recommended.

- Custom progress bars and labels in the UI visually reflect the user's profile and goals.

### Implementation Details

- Scoring calculations happen inside `calculateQuizResults.ts` based on the current answers state.

- Data mappings such as `answerTextMap` link user options to anxiety types and numeric scoring parameters.

- The global answers context (`QuizAnswersContext`) provides the live state used to compute scores dynamically.

### Example Pseudo-code Snippet

function calculateQuizResults(answers) {
let panicScore = 0;
let avoidantScore = 0;
let ruminatorScore = 0;

if (answers.question4?.includes("panic1")) panicScore += 2;
if (answers.question5?.includes("ruminator2")) ruminatorScore += 1;
if (answers.question6?.includes("avoidant4")) avoidantScore += 1;
// ... additional scoring logic

// Determine dominant type by highest score
const maxScore = Math.max(panicScore, avoidantScore, ruminatorScore);
let dominantType = "";
if (maxScore === panicScore) dominantType = "panic";
else if (maxScore === avoidantScore) dominantType = "avoidant";
else if (maxScore === ruminatorScore) dominantType = "ruminator";

// Calculate severity based on distress and frequency
const severity = computeSeverity(answers);

return { dominantType, severity, panicScore, avoidantScore, ruminatorScore };
}

text

---

## Contributing

- Follow the existing code style (TypeScript + Tailwind CSS).  
- Use React functional components and hooks.  
- Add new quiz questions or modify plans within the `pages/` directory.  
- Update global state using `QuizAnswersContext`.  
- Test navigation and data persistence thoroughly.

---

## Contact

For any questions or contributions, please reach out via the project repository or linked social profiles.

---

## Summary

This project is a multi-step React quiz app that collects user data, analyzes anxiety profiles, and generates personalized calming plans. It uses React Router for navigation, Context API for state management, and Tailwind CSS for styling. The modular code structure enables easy extension and maintenance.

**Page Connection Summary:**  
All pages are connected via React Router. User answers are stored globally via Context API. Each page collects data, updates global state, and navigates smoothly to the next, with final analysis pages aggregating all information for personalization.

---

*If you need more technical details or specific sections, feel free to ask!*