
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizPart1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-flourishwhite flex flex-col font-inter">
      {/* Sticky header with green background and logo */}
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          {/* Illustration */}
          <img
            src="/images/profile-illustration.svg" // dummy path
            alt=""
            className="w-40 h-40 object-contain mb-6 mt-8"
            draggable={false}
          />
          {/* Heading */}
          <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-2 text-center tracking-tight">
            LET’S START WITH YOU
          </h1>
          {/* Subtitle */}
          <p className="text-gray-700 mb-8 text-base text-center">
            Let’s get to know you better.
          </p>
          <button
            onClick={() => navigate("/quiz/gender")}
            className="rounded-full bg-flourishmint text-flourishgreen text-base font-semibold px-8 py-2 shadow-md hover:scale-105 hover:brightness-110 transition duration-150"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizPart1;
