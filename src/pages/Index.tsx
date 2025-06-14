
// Flourish Mind - Landing Page

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-flourishwhite flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center mt-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-2 text-flourishgreen tracking-tight">
            WELCOME!
          </h1>
          <h2 className="text-lg md:text-xl font-inter font-semibold text-gray-700 mb-7">
            Feel calmer, clearer, and more in control.
          </h2>
          <img
            src="/images/landing-mindflourish.png"
            alt="MindFlourish Tree"
            className="h-36 md:h-44 mx-auto mb-5"
            style={{ objectFit: "contain" }}
          />
          <div className="flex flex-col items-center">
            <p className="text-[1rem] md:text-lg text-gray-600 mt-0 mb-8 max-w-md font-inter">
              Take our 60-second anxiety pattern quiz designed by Clinical Psychologist Tayyaba Ali. Discover how your system reacts under pressure and the personalized strategy that actually fits your life.
            </p>
            <button
              onClick={() => navigate("/quiz/part1")}
              className="rounded-full bg-flourishmint text-flourishgreen text-lg font-semibold px-10 py-3 shadow-md hover:scale-105 hover:brightness-110 transition mt-1"
            >
              Yes, I’m ready
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
