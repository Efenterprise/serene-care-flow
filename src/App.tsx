
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth.tsx";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import DropdownMainLayout from "./components/layout/DropdownMainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
            <Route path="/app" element={
              <ProtectedRoute>
                <DropdownMainLayout />
              </ProtectedRoute>
            } />
            {/* Redirect old routes to main app */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DropdownMainLayout />
              </ProtectedRoute>
            } />
            <Route path="/residents" element={
              <ProtectedRoute>
                <DropdownMainLayout />
              </ProtectedRoute>
            } />
            <Route path="/emr" element={
              <ProtectedRoute>
                <DropdownMainLayout />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <DropdownMainLayout />
              </ProtectedRoute>
            } />
            <Route path="/insights/ai-proact" element={
              <ProtectedRoute>
                <DropdownMainLayout />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
