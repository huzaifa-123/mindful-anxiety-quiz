
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const QuizPlanCompletion = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl mx-auto text-center">
          
          {/* Main heading */}
          <h1 className="font-semibold text-2xl text-gray-800 mb-4">
            Your personalized plan has been created.
          </h1>
          
          {/* Subheading */}
          <p className="text-gray-600 text-base mb-8 max-w-md mx-auto">
            Tayyaba Ali’s unique method brings together three clinically validated therapies, offering you a multi-angle solution designed to help you move forward faster and stay well longer.
          </p>
          
          {/* Illustration placeholder */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/QuizDesign/Personalized Plan.png" 
              alt="Therapist illustration" 
              className="w-48 h-48 object-contain"
            />
          </div>
          
          {/* Plan details box */}
          <div className="bg-white rounded-xl border border-gray-400 p-6 mb-8 text-left shadow-2xl">
            <p className="text-gray-700 font-medium mb-4">
              This plan is built using three proven therapies:
            </p>
             <hr className="my-2 border-gray-300 border-t-4 mb-8" />
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-gray-800">Cognitive Behavioral Therapy (CBT)</span>
                  <span className="text-gray-600"> - up to 70% success</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-gray-800">Metacognitive Therapy (MCT)</span>
                  <span className="text-gray-600"> - up to 80% success</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-gray-800">Cognitive Behavioral Hypnotherapy (CBH)</span>
                  <span className="text-gray-600"> - up to 75% success</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700">
                Tayyaba Ali’s unique method combines these for faster and more lasting results.
                By working on your thoughts, beliefs, and subconscious patterns at the same time, this method helps unlock deeper healing and sustained change.
                While exact studies on the combined approach are ongoing, early evidence suggests it brings people closer to 100% success offering a more comprehensive and transformative path to well-being.

              </p>
            </div>
          </div>
          
          {/* Continue button */}
          <button
            onClick={() => navigate("/quiz/email-preference")}
            className="bg-flourishmint text-white px-8 py-3 rounded-full  mb-4 font-semibold hover:bg-flourishmint/90 transition-colors"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizPlanCompletion;
