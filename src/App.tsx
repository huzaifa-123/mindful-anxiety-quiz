import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QuizPart1 from "./pages/QuizPart1";
import QuizGender from "./pages/QuizGender";
import QuizAge from "./pages/QuizAge";
import QuizName from "./pages/QuizName";
import QuizAnxietyStats from "./pages/QuizAnxietyStats";
import QuizPart2Intro from "./pages/QuizPart2Intro";
import QuizQuestion4 from "./pages/QuizQuestion4";
import QuizQuestion5 from "./pages/QuizQuestion5";
import QuizQuestion6 from "./pages/QuizQuestion6";
import QuizQuestion7 from "./pages/QuizQuestion7";
import QuizQuestion8 from "./pages/QuizQuestion8";
import QuizPart3Intro from "./pages/QuizPart3Intro";
import QuizQuestion9 from "./pages/QuizQuestion9";
import QuizQuestion10 from "./pages/QuizQuestion10";
import QuizQuestion11 from "./pages/QuizQuestion11";
import QuizQuestion12 from "./pages/QuizQuestion12";
import QuizQuestion13CBT from "./pages/QuizQuestion13CBT";
import QuizQuestion13MCT from "./pages/QuizQuestion13MCT";
import QuizQuestion13CBH from "./pages/QuizQuestion13CBH";
import QuizPart4Intro from "./pages/QuizPart4Intro";
import QuizQuestion13 from "./pages/QuizQuestion13";
import QuizQuestion14 from "./pages/QuizQuestion14";
import QuizQuestion15 from "./pages/QuizQuestion15";
import QuizQuestion16 from "./pages/QuizQuestion16";
import QuizQuestion17 from "./pages/QuizQuestion17";
import QuizQuestion18 from "./pages/QuizQuestion18";
import QuizQuestion19 from "./pages/QuizQuestion19";
import QuizQuestion20 from "./pages/QuizQuestion20";
import QuizQuestion21 from "./pages/QuizQuestion21";
import { QuizAnswersProvider } from "./context/QuizAnswersContext";
import QuizAnalysis from "./pages/QuizAnalysis";
import QuizAnxietyGlobalStats from "./pages/QuizAnxietyGlobalStats";

const queryClient = new QueryClient();

// Wrapper component for quiz pages that need the provider
const QuizWrapper = ({ children }: { children: React.ReactNode }) => (
  <QuizAnswersProvider>{children}</QuizAnswersProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz/part1" element={<QuizPart1 />} />
          <Route path="/quiz/gender" element={<QuizWrapper><QuizGender /></QuizWrapper>} />
          <Route path="/quiz/age" element={<QuizWrapper><QuizAge /></QuizWrapper>} />
          <Route path="/quiz/name" element={<QuizWrapper><QuizName /></QuizWrapper>} />
          <Route path="/quiz/anxiety-stats" element={<QuizAnxietyStats />} />
          <Route path="/quiz/part2-intro" element={<QuizPart2Intro />} />
          <Route path="/quiz/question4" element={<QuizWrapper><QuizQuestion4 /></QuizWrapper>} />
          <Route path="/quiz/question5" element={<QuizWrapper><QuizQuestion5 /></QuizWrapper>} />
          <Route path="/quiz/question6" element={<QuizWrapper><QuizQuestion6 /></QuizWrapper>} />
          <Route path="/quiz/question7" element={<QuizWrapper><QuizQuestion7 /></QuizWrapper>} />
          <Route path="/quiz/question8" element={<QuizWrapper><QuizQuestion8 /></QuizWrapper>} />
          <Route path="/quiz/part3-intro" element={<QuizPart3Intro />} />
          <Route path="/quiz/question9" element={<QuizWrapper><QuizQuestion9 /></QuizWrapper>} />
          <Route path="/quiz/question10" element={<QuizWrapper><QuizQuestion10 /></QuizWrapper>} />
          <Route path="/quiz/question11" element={<QuizWrapper><QuizQuestion11 /></QuizWrapper>} />
          <Route path="/quiz/question12" element={<QuizWrapper><QuizQuestion12 /></QuizWrapper>} />
          <Route path="/quiz/question13-cbt" element={<QuizWrapper><QuizQuestion13CBT /></QuizWrapper>} />
          <Route path="/quiz/question13-mct" element={<QuizWrapper><QuizQuestion13MCT /></QuizWrapper>} />
          <Route path="/quiz/question13-cbh" element={<QuizWrapper><QuizQuestion13CBH /></QuizWrapper>} />
          <Route path="/quiz/part4-intro" element={<QuizPart4Intro />} />
          <Route path="/quiz/question13" element={<QuizWrapper><QuizQuestion13 /></QuizWrapper>} />
          <Route path="/quiz/question14" element={<QuizWrapper><QuizQuestion14 /></QuizWrapper>} />
          <Route path="/quiz/question15" element={<QuizWrapper><QuizQuestion15 /></QuizWrapper>} />
          <Route path="/quiz/question16" element={<QuizWrapper><QuizQuestion16 /></QuizWrapper>} />
          <Route path="/quiz/question17" element={<QuizWrapper><QuizQuestion17 /></QuizWrapper>} />
          <Route path="/quiz/question18" element={<QuizWrapper><QuizQuestion18 /></QuizWrapper>} />
          <Route path="/quiz/question19" element={<QuizWrapper><QuizQuestion19 /></QuizWrapper>} />
          <Route path="/quiz/question20" element={<QuizWrapper><QuizQuestion20 /></QuizWrapper>} />
          <Route path="/quiz/question21" element={<QuizWrapper><QuizQuestion21 /></QuizWrapper>} />
          <Route path="/quiz/analysis" element={<QuizAnalysis />} />
          <Route path="/quiz/anxiety-global-stats" element={<QuizAnxietyGlobalStats />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
