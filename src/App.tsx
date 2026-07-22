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
import CareersPage from "./pages/CareersPage";
import JcbServiceKit100Page from "./pages/jcbServiceKits/JcbServiceKit100Page";
import JcbServiceKit500Page from "./pages/jcbServiceKits/JcbServiceKit500Page";
import JcbServiceKit1000Page from "./pages/jcbServiceKits/JcbServiceKit1000Page";
import JcbServiceKit1500Page from "./pages/jcbServiceKits/JcbServiceKit1500Page";
import JcbServiceKit2000Page from "./pages/jcbServiceKits/JcbServiceKit2000Page";
import DistrictLandingPage from "./pages/DistrictLandingPage";
import FaqPage from "./pages/seo/FaqPage";
import EmiCalculatorPage from "./pages/seo/EmiCalculatorPage";
import LoanPage from "./pages/seo/LoanPage";
import InsurancePage from "./pages/seo/InsurancePage";
import RtoPage from "./pages/seo/RtoPage";
import GovernmentSchemesPage from "./pages/seo/GovernmentSchemesPage";
import BlogsHubPage from "./pages/seo/BlogsHubPage";
import { JsonLd } from "./components/seo/JsonLd";
import { organizationSchema, localBusinessSchema } from "./seo/schema";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminSettingsProvider>
      <LanguageProvider>
        <TooltipProvider>
          <CompareProvider>
            <Toaster />
            <Sonner />
            <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/jcb" element={<JCBPage />} />
                <Route path="/ashok-leyland" element={<AshokLeylandPage />} />
                <Route path="/switch-ev" element={<SwitchEVPage />} />
                <Route path="/switch" element={<Navigate to="/switch-ev" replace />} />
                <Route path="/used-vehicles" element={<UsedVehiclesPage />} />
                <Route path="/used-jcb" element={<Navigate to="/used-vehicles" replace />} />
                <Route path="/certified-refurbished" element={<Navigate to="/used-vehicles" replace />} />

                {/* Hyperlocal SEO: /jcb/patna, /ashok-leyland/gaya, /switch/patna, /used-jcb/patna */}
                <Route path="/jcb/:district" element={<DistrictLandingPage />} />
                <Route path="/ashok-leyland/:district" element={<DistrictLandingPage />} />
                <Route path="/switch/:district" element={<DistrictLandingPage />} />
                <Route path="/used-jcb/:district" element={<DistrictLandingPage />} />

                {/* SEO architecture layers */}
                <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
                <Route path="/loan" element={<LoanPage />} />
                <Route path="/insurance" element={<InsurancePage />} />
                <Route path="/rto" element={<RtoPage />} />
                <Route path="/government-schemes" element={<GovernmentSchemesPage />} />
                <Route path="/blogs" element={<BlogsHubPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/spare-parts" element={<Navigate to="/parts-lubricants" replace />} />
                <Route path="/service" element={<Navigate to="/service-warranty" replace />} />

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
                <Route path="/jcb-service-kit/100-hrs" element={<JcbServiceKit100Page />} />
                <Route path="/jcb-service-kit/500-hrs" element={<JcbServiceKit500Page />} />
                <Route path="/jcb-service-kit/1000-hrs" element={<JcbServiceKit1000Page />} />
                <Route path="/jcb-service-kit/1500-hrs" element={<JcbServiceKit1500Page />} />
                <Route path="/jcb-service-kit/2000-hrs" element={<JcbServiceKit2000Page />} />
                <Route path="/company-album" element={<CompanyAlbumPage />} />
                <Route path="/careers" element={<CareersPage />} />
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