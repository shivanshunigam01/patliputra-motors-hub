import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Hero } from "@/components/Hero";
import { BrandHub } from "@/components/BrandHub";
import { NewArrivals } from "@/components/NewArrivals";
import { EMICalculator } from "@/components/EMICalculator";
import { TrustSection } from "@/components/TrustSection";
import { Testimonials } from "@/components/Testimonials";
import { OffersSection } from "@/components/OffersSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />
        <BrandHub />
        <NewArrivals />
        <OffersSection />
        <EMICalculator />
        <TrustSection />
        <Testimonials />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;