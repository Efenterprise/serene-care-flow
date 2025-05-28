
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth.tsx";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import EmrIntegration from "./pages/EmrIntegration";
import Residents from "./pages/Residents";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminIntegrations from "./pages/AdminIntegrations";
import AiProact from "./pages/AiProact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/emr" element={<EmrIntegration />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/integrations" element={<AdminIntegrations />} />
            <Route path="/insights/ai-proact" element={<AiProact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
