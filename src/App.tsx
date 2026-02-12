import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import JCBPage from "./pages/JCBPage";
import AshokLeylandPage from "./pages/AshokLeylandPage";
import SwitchEVPage from "./pages/SwitchEVPage";
import UsedVehiclesPage from "./pages/UsedVehiclesPage";
import FinancePage from "./pages/FinancePage";
import ComparePage from "./pages/ComparePage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/scrollToTop";
import CheckCibilScore from "./pages/CheckCibilScore";
import { CompareProvider } from "./context/CompareContext";
import { CompareFloatingBar } from "./components/CompareFloatingBar";
import { LanguageProvider } from "./i18n/LanguageContext";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import OffersPage from "./pages/OffersPage";
import ProductFinderPage from "./pages/ProductFinderPage";
import DealerLocatorPage from "./pages/DealerLocatorPage";
import ServiceWarrantyPage from "./pages/ServiceWarrantyPage";
import PartsLubricantsPage from "./pages/PartsLubricantsPage";
import CompanyAlbumPage from "./pages/CompanyAlbumPage";
import { AdminSettingsProvider } from "./context/AdminSettingsContext";
import ProductDetail from "./pages/ProductDetail";
import { LeadReviewPage } from "./pages/LeadReviewPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
        <AdminSettingsProvider> 
    <LanguageProvider>
      <TooltipProvider>
        <CompareProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/jcb" element={<JCBPage />} />
              <Route path="/ashok-leyland" element={<AshokLeylandPage />} />
              <Route path="/switch-ev" element={<SwitchEVPage />} />
              <Route path="/used-vehicles" element={<UsedVehiclesPage />} />
              <Route path="/certified-refurbished" element={<Navigate to="/used-vehicles" replace />} />
              <Route path="/cibil-score" element={<CheckCibilScore />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/product-finder" element={<ProductFinderPage />} />
              <Route path="/dealer-locator" element={<DealerLocatorPage />} />
              <Route path="/service-warranty" element={<ServiceWarrantyPage />} />
              <Route path="/parts-lubricants" element={<PartsLubricantsPage />} />
              <Route path="/company-album" element={<CompanyAlbumPage />} />
              <Route path="/review" element={<LeadReviewPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CompareFloatingBar />
          </BrowserRouter>
        </CompareProvider>
      </TooltipProvider>
    </LanguageProvider>
    </AdminSettingsProvider>  
  </QueryClientProvider>
);

export default App;