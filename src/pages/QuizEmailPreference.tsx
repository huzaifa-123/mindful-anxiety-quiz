import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import Header from "../components/Header";

const QuizEmailPage = () => {
  const navigate = useNavigate();
  const { setAnswer } = useQuizAnswers();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
    setAnswer("email_preference", { email });

    setTimeout(() => {
      navigate("/quiz/phone-number");
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-12">
        <div className="w-full max-w-xl mx-auto text-center mt-12">
          <h1 className="font-semibold text-2xl text-gray-800 mb-4 leading-relaxed">
            Want to Access Your Personalized Plan Now?
          </h1>
          <p className="text-gray-700 text-base mb-8 leading-snug max-w-2xl mx-auto">
            Enter your best email to instantly receive your customized plan plus calming tips and resources to support your transformation journey over the next 7 days.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-xl mx-auto">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-flourishmint ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="you@example.com"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-flourishmint text-white py-3 rounded-full text-base font-semibold shadow-md transition duration-150 hover:scale-105 hover:brightness-110"
            >
              Continue
            </button>
          </form>
        </div>
      </main>

    </div>
  );
};

export default QuizEmailPage;
