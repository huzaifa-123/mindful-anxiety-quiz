import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import Header from "../components/Header";

const QuizPhoneNumber = () => {
  const navigate = useNavigate();
  const { setAnswer, sendAnswersToAPI } = useQuizAnswers();
  const [phone, setPhone] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Format phone number as 03XX-XXXXXXX
  const formatPhoneNumber = (value: string): string => {
    return value.replace(/\s+/g, ''); // Keep '+' and digits, just remove spaces
  };
  
  // Validate number in E.164 format: +<country code><number>, up to 15 digits total
  const isValidPhoneNumber = (value: string): boolean => {
    const regex = /^\+[1-9]\d{1,14}$/; 
    return regex.test(value);
  };

  // Handle the first button (send hypnosis track)
  const handleSendTrack = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phone)) {
      alert("Please enter a valid phone number (e.g., 0301-2345678)");
      return;
    }

    setAnswer("email_preference", {
      phone: phone.trim() || null
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      sendAnswersToAPI();
      navigate("/quiz/anxiety-profile");
    }, 3000);
  };

  // Handle the skip button
  const handleSkip = () => {
    setAnswer("email_preference", {
      phone: null
    });
    sendAnswersToAPI();
    navigate("/quiz/anxiety-profile");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {showPopup && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-flourishmint text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
              <svg
                className="w-6 h-6 text-white mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              You will receive your hypnosis track shortly
            </div>
          </div>
        )}

        <div className="w-full max-w-lg mx-auto text-center">
          <h1 className="font-bold text-2xl text-gray-900 mb-4">
            Want a Free Hypnosis Track Sent Straight to Your Phone?
          </h1>
          <p className="text-gray-700 text-base mb-8 leading-relaxed">
            Enter your mobile number below to download a calming hypnosis audio designed to
            ease anxiety. Keep it on your phone and listen whenever you need a moment of calm.
          </p>
          <form onSubmit={handleSendTrack} className="space-y-6">
            <div className="text-left w-full max-w-md mx-auto">
              <label
                htmlFor="phone"
                className="block text-gray-800 font-semibold mb-1 text-base"
              >
                Phone Number <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                maxLength={13} // Prevent typing beyond format
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-base"
                placeholder="+44 7123 456789"
              />
              <p className="text-gray-500 text-center text-xs mt-2">
                No spam, no calls. Just your free hypnosis track, tips, and offers.
              </p>
              <p className="text-gray-500 text-center text-xs mt-2">
                – with the option to opt out anytime
              </p>
            </div>
            <button
              type="submit"
              disabled={!phone.trim()}
              className={`w-full py-3 rounded-full text-base font-semibold shadow transition duration-150 ${
                phone.trim()
                  ? "bg-flourishmint text-white hover:scale-105"
                  : "bg-emerald-100 text-white cursor-not-allowed"
              }`}
            >
              Send My Free Hypnosis Track
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-3 rounded-full text-base font-semibold shadow transition duration-150 bg-flourishmint text-emerald-800 hover:bg-emerald-300"
            >
              Skip & Proceed to Plan
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default QuizPhoneNumber;
