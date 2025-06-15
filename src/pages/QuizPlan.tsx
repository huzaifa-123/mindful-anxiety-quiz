
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import { calculateQuizResults } from "../utils/quizScoring";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Card, CardContent } from "../components/ui/card";

const QuizPlan = () => {
  const { answers } = useQuizAnswers();
  const results = calculateQuizResults(answers);
  
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

  const getTherapyDescriptions = (dominantType: string) => {
    switch (dominantType) {
      case "panic":
        return {
          cbt: "Break the panic cycle by changing the thoughts that trigger your body's fear response",
          mct: "Stop the mental loops that keep you trapped in 'what if' thinking",
          cbh: "Calm your nervous system so your body stops reacting before your mind catches up"
        };
      case "ruminator":
        return {
          cbt: "Interrupt thought spirals by challenging the mental patterns that keep you stuck",
          mct: "Learn to step back from overthinking instead of getting pulled deeper into it",
          cbh: "Access the calm beneath the mental noise to think more clearly"
        };
      case "avoidant":
        return {
          cbt: "Build confidence to face what you've been avoiding without feeling overwhelmed", 
          mct: "Reduce the mental pressure that makes everything feel too hard to handle",
          cbh: "Feel safe in your body so you can move toward what matters to you"
        };
      default:
        return {
          cbt: "Change unhelpful thought patterns and behaviors",
          mct: "Reduce overthinking and mental loops", 
          cbh: "Calm your nervous system response"
        };
    }
  };

  const therapyDescriptions = getTherapyDescriptions(results.dominantType);

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      
      <main className="flex-1 px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          
          {/* Timer Header */}
          <div className="text-center mb-8">
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-orange-600 font-semibold">⏰ Limited Time Offer</span>
              </div>
              <div className="text-2xl font-bold text-orange-700">
                {formatTime(timeLeft)}
              </div>
              <p className="text-sm text-orange-600 mt-1">
                This personalized plan expires soon
              </p>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Best-Fit Therapeutic Techniques for You
            </h1>
          </div>

          {/* Therapy Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            
            {/* CBT Card */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src="/placeholder-therapist-1.png" 
                    alt="CBT illustration" 
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-green-800 mb-1">
                      Cognitive Behavioral Therapy
                    </h3>
                    <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded">
                      Your Match: 85%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  {therapyDescriptions.cbt}
                </p>
                <div className="space-y-2 text-xs text-green-600">
                  <div>• Thought record exercises</div>
                  <div>• Behavioral experiments</div> 
                  <div>• Cognitive restructuring</div>
                  <div>• Exposure therapy techniques</div>
                </div>
              </CardContent>
            </Card>

            {/* MCT Card */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src="/placeholder-therapist-2.png" 
                    alt="MCT illustration" 
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-blue-800 mb-1">
                      Metacognitive Therapy
                    </h3>
                    <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded">
                      Your Match: 78%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-blue-700 mb-4">
                  {therapyDescriptions.mct}
                </p>
                <div className="space-y-2 text-xs text-blue-600">
                  <div>• Attention training techniques</div>
                  <div>• Worry postponement</div>
                  <div>• Detached mindfulness</div>
                  <div>• Metacognitive beliefs work</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CBH Full Width Card */}
          <Card className="border-2 border-purple-200 bg-purple-50 mb-12">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/placeholder-therapist-3.png" 
                  alt="CBH illustration" 
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="font-bold text-lg text-purple-800 mb-1">
                    Cognitive Behavioral Hypnotherapy
                  </h3>
                  <span className="text-sm bg-purple-200 text-purple-800 px-2 py-1 rounded">
                    Your Match: 72%
                  </span>
                </div>
              </div>
              <p className="text-sm text-purple-700 mb-4">
                {therapyDescriptions.cbh}
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-purple-600">
                <div>• Progressive muscle relaxation</div>
                <div>• Self-hypnosis techniques</div>
                <div>• Visualization exercises</div>
                <div>• Subconscious pattern work</div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-flourishgreen text-white rounded-xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Get The Method</h2>
            <p className="text-lg mb-6">Try the 7-Day Activity Reset - Free</p>
            <p className="text-sm mb-6 max-w-2xl mx-auto">
              Start with the first 7 days of your personalized plan. If it works for you, 
              continue with the full method. If not, you've lost nothing.
            </p>
            <button className="bg-white text-flourishgreen px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors mb-4">
              Start Your Free 7-Day Reset
            </button>
            <div className="flex justify-center gap-8 text-sm">
              <div>✓ No commitment required</div>
              <div>✓ Personalized to your quiz results</div>
              <div>✓ Evidence-based techniques</div>
            </div>
          </div>

          {/* Our Goals Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Goals For You</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Stop the mental loops</h4>
                <p className="text-sm text-gray-600">Break free from overthinking and worry cycles</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Calm your nervous system</h4>
                <p className="text-sm text-gray-600">Reduce physical anxiety symptoms</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Build lasting confidence</h4>
                <p className="text-sm text-gray-600">Face life with clarity and courage</p>
              </div>
            </div>
          </div>

          {/* Therapy Results Section */}
          <div className="bg-gray-50 rounded-xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Therapy Results + "Life Without Ix" With Support
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              When you combine proven therapeutic techniques with ongoing support, 
              you get faster results that actually last.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
                Start Free Trial
              </button>
              <button className="border-2 border-gray-800 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                View Full Program
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="diagnosis" className="bg-white border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Do I need a diagnosis?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    No. This quiz and plan are designed to support anyone experiencing anxiety symptoms.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="therapy" className="bg-white border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Is this therapy?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    It's not formal therapy, but it is built on real clinical approaches used in therapy settings.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cbt" className="bg-white border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    What if I've already tried CBT?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    This combines CBT with other tools that address overthinking and subconscious reactions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="results" className="bg-white border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    How fast can I feel results?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Some people feel a shift within 1–2 weeks. Most see significant change within 4–6 weeks.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="daily" className="bg-white border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Do I have to use it every day?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    No. You'll learn tools you can return to when needed. This is flexible, not rigid.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Testimonials
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                  <p className="text-sm text-gray-700 mb-4">
                    "This is the first plan that actually matched how I think. It finally felt designed for someone like me."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                  <p className="text-sm text-gray-700 mb-4">
                    "I used to spiral every evening. Now I have a way to stop it before it starts."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                  <p className="text-sm text-gray-700 mb-4">
                    "I didn't think I'd ever feel calm again but this gave me back hope."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-flourishgreen text-white rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Begin Your Calm Reset Plan</h2>
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-white text-flourishgreen px-4 py-2 rounded-full text-sm font-semibold">
                ✓ GET THE METHOD
              </div>
              <div className="bg-flourishmint text-white px-4 py-2 rounded-full text-sm font-semibold">
                ✓ 7-DAY INSTALLMENT PLAN
              </div>
            </div>
            <p className="text-sm mb-6">
              You've completed your personalized anxiety profile.
            </p>
            <button className="bg-white text-flourishgreen px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Your 7-Day Trial
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPlan;
