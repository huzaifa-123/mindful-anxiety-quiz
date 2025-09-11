import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-flourishwhite font-inter">
      {/* Themed image (same as homepage tree for consistency) */}
      <img
        src="/QuizDesign/WELCOME.png"
        alt="MindFlourish Tree"
        className="h-32 md:h-40 mx-auto mb-6"
        style={{ objectFit: "contain" }}
      />

      {/* Friendly message */}
      <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">
        Oops! This page doesn’t exist.  
        Please return to the home page.
      </p>

      {/* Themed button */}
      <a
        href="/"
        className="flex items-center justify-center rounded-full bg-flourishmint text-white text-base font-semibold px-8 py-2 shadow-md hover:scale-105 hover:brightness-110 transition"
        style={{ minWidth: "170px" }}
      >
        Go to Home
      </a>
    </div>
  );
};

export default NotFound;
