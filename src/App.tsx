import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JCBPage from "./pages/JCBPage";
import AshokLeylandPage from "./pages/AshokLeylandPage";
import SwitchEVPage from "./pages/SwitchEVPage";
import UsedVehiclesPage from "./pages/UsedVehiclesPage";
import FinancePage from "./pages/FinancePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jcb" element={<JCBPage />} />
          <Route path="/ashok-leyland" element={<AshokLeylandPage />} />
          <Route path="/switch-ev" element={<SwitchEVPage />} />
          <Route path="/used-vehicles" element={<UsedVehiclesPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
