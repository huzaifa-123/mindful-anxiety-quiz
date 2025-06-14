
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizPart1 = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-flourishwhite flex flex-col">
      <Header withBack />
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center mt-8">
          <img
            src="/images/quiz-user.png"
            alt="Quiz Person"
            className="h-40 md:h-48 mx-auto mb-7"
            style={{ objectFit: "contain" }}
          />
          <h1 className="font-playfair text-2xl md:text-[2rem] font-bold text-flourishgreen mb-2">
            LET’S START WITH YOU
          </h1>
          <h2 className="text-base md:text-lg font-inter font-semibold text-gray-700 mb-5">
            Let’s get to know you better.
          </h2>
          <button
            onClick={() => alert('Next: Quiz questions not implemented')}
            className="rounded-full bg-flourishmint text-flourishgreen text-lg font-semibold px-9 py-2.5 shadow-md hover:scale-105 hover:brightness-110 transition mt-2"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizPart1;
