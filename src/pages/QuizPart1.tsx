
import Header from "../components/Header";
import QuizGenderQuestion from "../components/QuizGenderQuestion";
import { QuizAnswersProvider } from "../context/QuizAnswersContext";

const QuizPart1 = () => {
  // This page will eventually manage multiple questions and show progress, for now only first question
  return (
    <QuizAnswersProvider>
      <div className="min-h-screen bg-flourishwhite flex flex-col">
        <div className="w-full sticky top-0 z-10">
          <Header withBack />
        </div>
        <main className="flex-1 flex flex-col items-center justify-start px-4 md:px-0">
          <div className="w-full max-w-2xl mx-auto pt-8 flex flex-col items-center">
            {/* Simple progress bar and counter in the future */}
            <div className="self-end text-flourishgreen font-bold mb-2 mr-2 text-base">
              <span>1 / 22</span>
            </div>
            <QuizGenderQuestion />
          </div>
        </main>
      </div>
    </QuizAnswersProvider>
  );
};

export default QuizPart1;
