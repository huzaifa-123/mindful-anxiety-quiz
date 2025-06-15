
// Flourish Mind - Landing Page

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen h-screen bg-flourishwhite flex flex-col font-inter">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center"
          style={{ flex: 1, justifyContent: "center", minHeight: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-1 text-flourishgreen tracking-tight font-inter">
            WELCOME!
          </h1>
          <h2 className="text-base md:text-lg font-semibold text-gray-700 mb-6 font-inter">
            Feel calmer, clearer, and more in control.
          </h2>
          <img
            src="/Icons/5.png"
            alt="MindFlourish Tree"
            className="h-32 md:h-40 mx-auto mb-3"
            style={{ objectFit: "contain" }}
          />
          <div className="flex flex-col items-center w-full">
            <p className="text-sm md:text-base text-gray-600 mt-0 mb-7 max-w-md font-inter">
              Take our 60-second anxiety pattern quiz designed by Clinical Psychologist Tayyaba Ali. Discover how your system reacts under pressure and the personalized strategy that actually fits your life.
            </p>
            <button
              onClick={() => navigate("/quiz/part1")}
              className="rounded-full bg-flourishmint text-flourishgreen text-base font-semibold px-8 py-2 shadow-md hover:scale-105 hover:brightness-110 transition mt-1"
              style={{ minWidth: "170px" }}
            >
              Yes, I'm ready
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
