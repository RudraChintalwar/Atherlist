
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "@/context/TaskContext";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import FocusPage from "./pages/FocusPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TaskProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/focus" element={<FocusPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TaskProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
