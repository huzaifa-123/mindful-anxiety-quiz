import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useState } from "react";

const QuizEmailPreference = () => {
  const navigate = useNavigate();
  const { setAnswer,readableAnswers} = useQuizAnswers();

  // Form state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Simple email validation regex
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

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
    // Save answers to context
    setAnswer("email_preference", {
      email,
      phone: phone.trim() || null,
      smsOptIn,
    });
    console.log("🟢 READABLE ANSWERS FOR SUBMISSION:");
    console.log(JSON.stringify(readableAnswers, null, 2));
  
    // Navigate after short delay
    setTimeout(() => {
      navigate("/quiz/anxiety-profile");
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto text-center">
          {/* Main question */}
          <h1 className="font-semibold text-xl text-gray-800 mb-4 leading-relaxed">
            Want to Access Your Personalized Plan Now?
          </h1>
          <p className="text-gray-700 text-sm mb-8 leading-relaxed">
            Enter your best email to instantly receive your customized plan plus calming tips and resources to support your transformation journey over the next 7 days.
            <br />
            Your full results will be sent straight to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Email (required) */}
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

            {/* SMS opt-in */}
            <div className="flex items-center gap-3">
              <input
                id="smsOptIn"
                type="checkbox"
                checked={smsOptIn}
                onChange={() => setSmsOptIn(!smsOptIn)}
                className="w-4 h-4"
              />
              <label htmlFor="smsOptIn" className="text-gray-700 text-sm select-none">
                I’d also like to receive a 7-day mini lesson with daily calming tips via SMS.
              </label>
            </div>

            {/* Phone number (optional) */}
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
                Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flourishmint"
                placeholder="+1 234 567 8901"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-flourishmint hover:bg-green-400 text-white py-3 rounded-full text-base font-semibold shadow-md transition duration-150 hover:scale-105 hover:brightness-110"
            >
              Show My Personalized Plan
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default QuizEmailPreference;
