
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WizardPage from "./pages/WizardPage";
import ComparisonPage from "./pages/ComparisonPage";
import NewsDealsPage from "./pages/NewsDealsPage";
import StreamingProviderPage from "./pages/StreamingProviderPage";
import ClubPage from "./pages/ClubPage";
import LeaguePage from "./pages/LeaguePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/wizard" element={<WizardPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/news-deals" element={<NewsDealsPage />} />
          <Route path="/streaming/:provider" element={<StreamingProviderPage />} />
          <Route path="/club/:club" element={<ClubPage />} />
          <Route path="/league/:league" element={<LeaguePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
