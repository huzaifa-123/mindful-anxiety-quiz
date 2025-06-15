
import Header from "../components/Header";
import { useState, useEffect } from "react";

const QuizPlan = () => {
  // 15 minute countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer component for header
  const TimerDisplay = () => (
    <div className="flex items-center gap-4">
      <span className="text-white text-sm font-medium">
        Discount is reserved for: {formatTime(timeLeft)}
      </span>
      <button className="bg-flourishmint hover:bg-green-400 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors">
        GET MY PLAN
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header timer={<TimerDisplay />} />
      </div>
      
      <main className="flex-1 px-4 py-12">
        <div className="w-full max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Best-Fit Therapeutic Techniques for You:
            </h1>
          </div>

          {/* Now vs Goal Section */}
          <div className="flex justify-center items-center gap-8 mb-8">
            {/* Now Section */}
            <div className="text-center">
              <div className="bg-gray-800 text-white px-4 py-1 rounded text-sm font-medium mb-4 inline-block">
                Now
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/98ef91d6-131a-4a86-99b7-6fbb29dc3f45.png" 
                  alt="Current anxious state" 
                  className="w-48 h-64 object-contain mb-4"
                />
                {/* Progress bars card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-xs">
                  <div className="space-y-4 text-left">
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Energy Level</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">Low</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full w-1/4"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Well-being Level</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">Weak</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-400 h-2 rounded-full w-2/5"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Self-esteem Level</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">Low</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full w-1/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <div className="flex">
                <div className="w-8 h-8 bg-flourishgreen transform rotate-45 mr-2"></div>
                <div className="w-8 h-8 bg-flourishgreen transform rotate-45 mr-2"></div>
                <div className="w-8 h-8 bg-flourishgreen transform rotate-45"></div>
              </div>
            </div>

            {/* Goal Section */}
            <div className="text-center">
              <div className="bg-flourishmint text-white px-4 py-1 rounded text-sm font-medium mb-4 inline-block">
                Your Goal
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/98ef91d6-131a-4a86-99b7-6fbb29dc3f45.png" 
                  alt="Goal confident state" 
                  className="w-48 h-64 object-contain mb-4"
                />
                {/* Progress bars card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-xs">
                  <div className="space-y-4 text-left">
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Energy Level</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">High</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Well-being Level</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">Strong</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Self-esteem Level</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">High</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPlan;
