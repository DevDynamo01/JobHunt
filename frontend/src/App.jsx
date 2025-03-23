import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JobProvider } from "@/context/JobContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import JobListings from "./pages/JobListings";
import JobDetail from "./pages/JobDetail";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobs from "./pages/AppliedJobs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="job-board-theme">
      <JobProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/saved" element={<SavedJobs />} />
              <Route path="/applied" element={<AppliedJobs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </JobProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
