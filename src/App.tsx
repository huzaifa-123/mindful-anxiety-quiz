
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
