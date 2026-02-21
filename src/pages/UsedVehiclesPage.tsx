import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Shield,
  Calendar,
  RefreshCcw,
  Download,
  FileText,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

import { useLanguage } from "@/i18n/LanguageContext";
import { useLeadFlow, type LeadProduct } from "@/hooks/useLeadFlow";
import { LeadSelectionBar } from "@/components/LeadSelectionBar";
import { TCOPopup } from "@/components/TCOPopup";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

import usedVehiclesImg from "@/assets/used-vehicles.jpg";

interface ApiUsedVehicle {
  _id: string;
  vehicle_type: string;
  brand: string;
  model: string;
  year: number;
  kilometers: number;
  hours: number;
  price: number;
  featured_image: string;
  gallery_images?: string[];
  fuel_type: string;
  ownership: string;
  condition_report?: {
    engine: string;
    transmission: string;
    body: string;
    tyres_life_percent: number;
    notes?: string;
  };
  is_certified: boolean;
  inspection_report_url?: string;
  has_warranty: boolean;
  has_return_policy: boolean;
  finance_available: boolean;
  location: string;
  status: string;
  is_active: boolean;
}

const UsedVehiclesPage = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  const {
    selectedProducts, isTcoOpen, setIsTcoOpen,
    handleProductSelect, handleViewTco, handleTcoContinue,
    clearSelection, isSelected,
  } = useLeadFlow();

  const { data: apiVehicles = [], isLoading } = useQuery({
    queryKey: ['used-vehicles'],
    queryFn: async () => {
      const res = await api.get('/used-vehicles');
      return res.data.data as ApiUsedVehicle[];
    },
  });

  const vehicles = useMemo(() => {
    return apiVehicles.filter(v => v.is_active && v.status === 'available').map(v => ({
      id: v._id,
      name: `${v.brand} ${v.model}`,
      category: v.vehicle_type,
      subcategory: v.vehicle_type,
      year: String(v.year),
      km: v.kilometers ? `${v.kilometers.toLocaleString('en-IN')} km` : `${v.hours.toLocaleString('en-IN')} hrs`,
      price: `₹${v.price.toLocaleString('en-IN')}`,
      badge: v.is_certified ? 'CERTIFIED' : null,
      image: v.featured_image || usedVehiclesImg,
      condition: v.condition_report?.engine || 'Good',
      owner: v.ownership || '',
      fuelType: v.fuel_type,
      hasWarranty: v.has_warranty,
      financeAvailable: v.finance_available,
      specs: {
        fuel: v.fuel_type,
        warranty: v.has_warranty ? 'Available' : 'N/A',
      },
    }));
  }, [apiVehicles]);

  const categoryStructure = useMemo(() => {
    const cats: Record<string, string[]> = { "All": [] };
    vehicles.forEach(v => {
      if (!cats[v.category]) cats[v.category] = ["All"];
    });
    return cats;
  }, [vehicles]);

  const subcategories = useMemo(() => categoryStructure[selectedCategory] || [], [selectedCategory, categoryStructure]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (selectedCategory !== "All" && vehicle.category !== selectedCategory) return false;
      if (selectedSubcategory !== "All" && vehicle.subcategory !== selectedSubcategory) return false;
      return true;
    });
  }, [selectedCategory, selectedSubcategory, vehicles]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("All");
  };

  const toLeadProduct = (vehicle: typeof filteredVehicles[0]): LeadProduct => ({
    id: vehicle.id, name: vehicle.name, brand: 'Certified Refurbished',
    price: vehicle.price, image: vehicle.image, category: vehicle.category,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative min-h-[55vh] lg:min-h-[65vh] flex items-center pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="absolute inset-0">
            <img src={usedVehiclesImg} alt="Certified Refurbished Vehicles" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/20 text-success rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                {language === 'hi' ? '150-पॉइंट इंस्पेक्शन सर्टिफाइड' : '150-Point Inspection Certified'}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                {language === 'hi' ? (<><span className="text-jcb">सर्टिफाइड रिफर्बिश्ड</span> कमर्शियल वाहन</>) : (<><span className="text-jcb">Certified Refurbished</span> Commercial Vehicles</>)}
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8">
                {language === 'hi' ? 'वारंटी के साथ प्री-ओन्ड वाहन। इंस्पेक्टेड, सर्टिफाइड और काम के लिए तैयार। फाइनेंस उपलब्ध।' : 'Pre-owned vehicles with warranty. Inspected, certified, and ready for work. Finance available.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919876543210">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold">
                    <Phone className="h-5 w-5" />{language === 'hi' ? 'बेस्ट डील्स पाएं' : 'Get Best Deals'}
                  </Button>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold">
                    <MessageCircle className="h-5 w-5" />{language === 'hi' ? 'इंस्पेक्शन शेड्यूल करें' : 'Schedule Inspection'}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-muted border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Shield className="h-8 w-8 text-success mb-2" />
                <p className="font-semibold text-foreground">{language === 'hi' ? '150-पॉइंट इंस्पेक्शन' : '150-Point Inspection'}</p>
                <p className="text-sm text-muted-foreground">{language === 'hi' ? 'पूर्ण गुणवत्ता जांच' : 'Thorough quality check'}</p>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCcw className="h-8 w-8 text-jcb mb-2" />
                <p className="font-semibold text-foreground">{language === 'hi' ? '7-दिन रिटर्न पॉलिसी' : '7-Day Return Policy'}</p>
                <p className="text-sm text-muted-foreground">{language === 'hi' ? 'कोई सवाल नहीं' : 'No questions asked'}</p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-8 w-8 text-ev mb-2" />
                <p className="font-semibold text-foreground">{language === 'hi' ? 'फाइनेंस प्री-अप्रूव्ड' : 'Finance Pre-Approved'}</p>
                <p className="text-sm text-muted-foreground">{language === 'hi' ? 'आसान लोन प्रोसेस' : 'Easy loan process'}</p>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-8 w-8 text-leyland mb-2" />
                <p className="font-semibold text-foreground">{language === 'hi' ? 'वारंटी उपलब्ध' : 'Warranty Available'}</p>
                <p className="text-sm text-muted-foreground">{language === 'hi' ? '1 साल तक कवरेज' : 'Up to 1 year coverage'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {Object.keys(categoryStructure).map((category) => (
                <button key={category} onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>
                  {category}
                </button>
              ))}
            </div>
            {subcategories.length > 0 && (
              <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide border-t border-border/50 pt-2">
                {subcategories.map((sub) => (
                  <button key={sub} onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedSubcategory === sub ? "bg-primary/20 text-primary border border-primary" : "bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent"}`}>
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Results Count */}
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-muted-foreground">
            {isLoading ? (language === 'hi' ? 'लोड हो रहा है...' : 'Loading...') : (
              <>{language === 'hi' ? `${filteredVehicles.length} वाहन मिले` : `Showing ${filteredVehicles.length} vehicles`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {selectedSubcategory !== "All" && ` → ${selectedSubcategory}`}</>
            )}
          </p>
        </div>

        {/* Vehicle Grid */}
        <section className="pb-12 lg:pb-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle, index) => {
                  const selected = isSelected(vehicle.id);
                  return (
                    <motion.div key={vehicle.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                      <div className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border h-full ${selected ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          {vehicle.badge && (
                            <div className="absolute top-4 left-4 px-3 py-1.5 bg-success text-success-foreground rounded-full text-xs font-bold tracking-wide">🎖️ {vehicle.badge}</div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-primary font-medium px-2 py-0.5 bg-primary/10 rounded">{vehicle.category}</span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-2">{vehicle.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                            <span>{vehicle.year}</span><span>•</span><span>{vehicle.km}</span>
                            {vehicle.owner && <><span>•</span><span>{vehicle.owner}</span></>}
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm text-muted-foreground">{language === 'hi' ? 'स्थिति:' : 'Condition:'}</span>
                            <span className={`text-sm font-medium ${vehicle.condition === 'good' || vehicle.condition === 'Excellent' ? 'text-success' : 'text-jcb'}`}>
                              {vehicle.condition}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs px-2 py-1 bg-muted rounded">{vehicle.fuelType}</span>
                            {vehicle.hasWarranty && <span className="text-xs px-2 py-1 bg-success/10 text-success rounded">{language === 'hi' ? 'वारंटी' : 'Warranty'}</span>}
                            {vehicle.financeAvailable && <span className="text-xs px-2 py-1 bg-leyland/10 text-leyland rounded">{language === 'hi' ? 'फाइनेंस' : 'Finance'}</span>}
                          </div>
                          <div className="pt-4 border-t border-border">
                            <div className="flex items-center justify-between">
                              <p className="text-2xl font-bold text-foreground">{vehicle.price}</p>
                              <Button size="sm" variant={selected ? 'default' : 'outline'}
                                className={`gap-2 ${selected ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`}
                                onClick={() => handleProductSelect(toLeadProduct(vehicle))}>
                                <ShoppingCart className="h-4 w-4" />
                                {selected ? (language === 'hi' ? 'चयनित' : 'Selected') : (language === 'hi' ? 'तुलना करें' : 'Compare')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
            {!isLoading && filteredVehicles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">{language === 'hi' ? 'इस श्रेणी में कोई वाहन नहीं मिला' : 'No vehicles found in this category'}</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSelectedCategory("All"); setSelectedSubcategory("All"); }}>
                  {language === 'hi' ? 'फ़िल्टर साफ़ करें' : 'Clear Filters'}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              {language === 'hi' ? 'अपना वाहन बेचें' : 'Sell Your Vehicle'}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {language === 'hi' ? 'अपना कमर्शियल वाहन बेचना चाहते हैं? बिहार के सबसे भरोसेमंद डीलर से बेस्ट प्राइस पाएं।' : 'Looking to sell your commercial vehicle? Get the best price from Bihar\'s most trusted dealer.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210">
                <Button size="lg" className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold">
                  <Phone className="h-5 w-5" />{language === 'hi' ? 'फ्री वैल्यूएशन पाएं' : 'Get Free Valuation'}
                </Button>
              </a>
              <Link to="/finance">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold">
                  {language === 'hi' ? 'यूज्ड व्हीकल फाइनेंस' : 'Used Vehicle Finance'}<ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
      <LeadSelectionBar selectedCount={selectedProducts.length} onSelectClick={handleViewTco} onClearClick={clearSelection} />
      <TCOPopup isOpen={isTcoOpen} products={selectedProducts} onContinue={handleTcoContinue} onBack={() => setIsTcoOpen(false)} />
    </div>
  );
};

export default UsedVehiclesPage;
