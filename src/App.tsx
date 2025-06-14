
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz/part1" element={<QuizPart1 />} />
          {/* >>> Wrap all quiz questions in the same provider for answer persistence <<< */}
          <Route
            element={
              <QuizAnswersProvider>
                {/* This outlet will render all children below */}
                {/* React Router 6.4+ nested layout pattern, or just direct elements */}
                {/* We'll nest individual quiz steps below */}
                <Routes>
                  <Route path="/quiz/gender" element={<QuizGender />} />
                  <Route path="/quiz/age" element={<QuizAge />} />
                  <Route path="/quiz/name" element={<QuizName />} />
                </Routes>
              </QuizAnswersProvider>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

