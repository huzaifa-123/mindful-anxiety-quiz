
import Header from "../components/Header";
import QuizGenderQuestion from "../components/QuizGenderQuestion";
import { QuizAnswersProvider } from "../context/QuizAnswersContext";

const QuizPart1 = () => {
  // This page will eventually manage multiple questions and show progress, for now only first question
  return (
    <QuizAnswersProvider>
      <div className="min-h-screen bg-flourishwhite flex flex-col font-inter">
        <div className="w-full sticky top-0 z-10">
          {/* Show progress (1/22) in the header, and remove from body */}
          <Header withBack questionCount="1 / 22" />
        </div>
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-0">
          <div className="w-full max-w-2xl mx-auto pt-6 flex flex-col items-center">
            {/* Progress bar/counter moved to header */}
            <QuizGenderQuestion />
          </div>
        </main>
      </div>
    </QuizAnswersProvider>
  );
};

export default QuizPart1;
