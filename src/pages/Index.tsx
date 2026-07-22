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
import { SEOHead } from "@/components/seo/SEOHead";
import { DistrictGrid } from "@/components/seo/DistrictGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Patliputra | JCB, Ashok Leyland, Switch EV Dealer Bihar"
        description="Bihar mein JCB Machines, Ashok Leyland Trucks, Switch Electric Vehicles aur Certified Used Machines – Easy Finance, Service, Genuine Parts. Authorized dealer since years."
        path="/"
        keywords={[
          "JCB dealer Patna",
          "Ashok Leyland Bihar",
          "Switch EV bus",
          "Used JCB Bihar",
          "Truck finance Bihar",
        ]}
      />
      <Navbar />

      <main>
        <Hero />
        <BrandHub />
        <NewArrivals />
        <OffersSection />
        <EMICalculator />
        <TrustSection />
        <Testimonials />
        <DistrictGrid categorySlug="jcb" title="JCB across Bihar districts" limit={12} />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;