import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import Header from "../components/Header";

const QuizPhoneNumber = () => {
  const navigate = useNavigate();
  const { setAnswer,sendAnswersToAPI } = useQuizAnswers();
  const [phone, setPhone] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Handle the first button (send hypnosis track)
  const handleSendTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setAnswer("email_preference", {
      phone: phone.trim() || null
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      sendAnswersToAPI(); // Send answers to API before navigatin
      navigate("/quiz/anxiety-profile");
    }, 3000);
  };

  // Handle the skip button
  const handleSkip = () => {
    setAnswer("email_preference", {
      phone: null
    });
    sendAnswersToAPI(); // Send answers to API before navigating
    navigate("/quiz/anxiety-profile");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Popup message */}
        {showPopup && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-flourishmint text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
              <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              You will receive your plan shortly
            </div>
          </div>
        )}

        <div className="w-full max-w-lg mx-auto text-center">
          <h1 className="font-bold text-2xl text-gray-900 mb-4">
            Want a Free Hypnosis Track Sent Straight to Your Phone?
          </h1>
          <p className="text-gray-700 text-base mb-8 leading-relaxed">
            Enter your phone number below, and we'll instantly text you a calming hypnosis audio designed specifically to ease anxiety, yours to keep.
          </p>
          <form onSubmit={handleSendTrack} className="space-y-6">
            <div className="text-left w-full max-w-md mx-auto">
              <label htmlFor="phone" className="block text-gray-800 font-semibold mb-1 text-base">
                Phone Number <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-base"
                placeholder=""
              />
              <p className="text-gray-500 text-xs mt-2">We respect your privacy, no spam, just calm.</p>
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
