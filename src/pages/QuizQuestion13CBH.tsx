
import Header from "../components/Header";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion13CBH = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How familiar are you with the following therapies?";
  
  const options = [
    {
      id: "never_heard_cbh",
      text: "I've never heard of it"
    },
    {
      id: "heard_not_sure_cbh",
      text: "I've heard of it but not sure how it works"
    },
    {
      id: "understand_cbh",
      text: "I understand it"
    },
    {
      id: "tried_cbh",
      text: "I've tried it before"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question13_cbh", optionId);
    navigate("/quiz/part4-intro");
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite overflow-hidden">
      <div className="w-full sticky top-0 z-10">
        <Header withBack questionCount="13 / 22" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-4">
          <h1 className="font-semibold text-xl md:text-2xl text-flourishgreen mb-8 text-center tracking-tight">
            {question}
          </h1>
          
          {/* Image and therapy name */}
          <div className="flex flex-col items-center mb-8">
            <img
<<<<<<< HEAD
              src="/QuizDesign/P3 - CBH.png"
=======
              src="/lovable-uploads/acbdbad4-7ee9-409c-8c56-a9bf88d8dcdd.png"
>>>>>>> cb7ce3b161fbd11c9b89ff1f7fb9de35267ad61f
              alt="Therapy illustration"
              className="w-32 h-32 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-700">
              Cognitive Behavioral Hypnotherapy (CBH)
            </h2>
          </div>
          
          <div className="w-full space-y-3">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer bg-white hover:border-flourishmint/50 hover:bg-flourishmint/5 transition-colors"
                onClick={() => handleSelect(option.id)}
              >
                <span className="text-gray-700 text-base text-center">
                  {option.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizQuestion13CBH;
