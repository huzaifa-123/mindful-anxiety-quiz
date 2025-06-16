import Header from "../components/Header";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

const QuizQuestion13MCT = () => {
  const { setAnswer } = useQuizAnswers();
  const navigate = useNavigate();

  const question = "How familiar are you with the following therapies?";
  
  const options = [
    {
      id: "never_heard_mct",
      text: "I've never heard of it"
    },
    {
      id: "heard_not_sure_mct",
      text: "I've heard of it but not sure how it works"
    },
    {
      id: "understand_mct",
      text: "I understand it"
    },
    {
      id: "tried_mct",
      text: "I've tried it before"
    }
  ];

  const handleSelect = (optionId: string) => {
    setAnswer("question13_mct", optionId);
    navigate("/quiz/question13-cbh");
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
              src="/QuizDesign/P3 - MCT.png"
              alt="Therapy illustration"
              className="w-32 h-32 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-700">
              Metacognitive Therapy (MCT)
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

export default QuizQuestion13MCT;
