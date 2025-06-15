
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
import { QuizAnswersProvider } from "./context/QuizAnswersContext";

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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
