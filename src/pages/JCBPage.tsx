import { useState, useMemo, useEffect } from "react";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Fuel,
  Gauge,
  Weight,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrochureDownloadButton } from "@/components/BrochureDownloadButton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

import { useLanguage } from "@/i18n/LanguageContext";
import { useLeadFlow, type LeadProduct } from "@/hooks/useLeadFlow";
import { LeadSelectionBar } from "@/components/LeadSelectionBar";
import { TCOPopup } from "@/components/TCOPopup";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

import heroJcb from "@/assets/hero-jcb.jpg";

interface ApiProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  shortDescription?: string;
  specifications?: Record<string, any>;
  images?: string[];
  tcoItems?: Array<{ key: string; label: string; value: number; unit: string }>;
  isActive?: boolean;
  isNewLaunch?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  brochureUrl?: string;
}

const JCBPage = () => {
  const { language } = useLanguage();
  const { settings } = useAdminSettings();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  const {
    selectedProducts,
    isTcoOpen,
    setIsTcoOpen,
    handleProductSelect,
    handleViewTco,
    handleTcoContinue,
    clearSelection,
    isSelected,
  } = useLeadFlow();

  const { data: apiProducts = [], isLoading } = useQuery({
    queryKey: ['products', 'JCB'],
    queryFn: async () => {
      const res = await api.get('/products', { params: { brand: 'JCB' } });
      return res.data.data as ApiProduct[];
    },
  });

  const products = useMemo(() => {
    return apiProducts.filter(p => p.isActive !== false).map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      subcategory: p.specifications?.subcategory || p.category,
      price: `₹${p.price.toLocaleString('en-IN')}`,
      bestFor: p.shortDescription || p.specifications?.application || '',
      badge: p.isNewLaunch ? 'NEW LAUNCH' : p.isBestseller ? 'BESTSELLER' : p.isFeatured ? 'FEATURED' : null,
      image: p.images?.[0] || heroJcb,
      featured: p.isFeatured || false,
      brochureUrl: p.brochureUrl || null,
      specs: {
        power: p.specifications?.power || '',
        fuel: p.specifications?.fuel || 'Diesel',
        weight: p.specifications?.weight || '',
      },
      tcoItems: p.tcoItems || [],
    }));
  }, [apiProducts]);

  const categoryStructure = useMemo(() => {
    const cats: Record<string, string[]> = { "All": [] };
    products.forEach(p => {
      if (!cats[p.category]) cats[p.category] = ["All"];
      if (p.subcategory && p.subcategory !== p.category && !cats[p.category].includes(p.subcategory)) {
        cats[p.category].push(p.subcategory);
      }
    });
    return cats;
  }, [products]);

  const subcategories = useMemo(() => {
    return categoryStructure[selectedCategory] || [];
  }, [selectedCategory, categoryStructure]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
      if (selectedSubcategory !== "All" && product.subcategory !== selectedSubcategory) return false;
      return true;
    });
  }, [selectedCategory, selectedSubcategory, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("All");
  };

  const toLeadProduct = (product: typeof filteredProducts[0]): LeadProduct => ({
    id: product.id,
    name: product.name,
    brand: 'JCB',
    price: product.price,
    image: product.image,
    category: product.category,
    tcoItems: product.tcoItems,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Banner */}
        <section className="relative min-h-[55vh] lg:min-h-[65vh] flex items-center pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="absolute inset-0">
            <img src={heroJcb} alt="JCB Construction Equipment" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-jcb/20 text-jcb rounded-full text-sm font-medium mb-6">
                <CheckCircle className="h-4 w-4" />
                {language === 'hi' ? 'अधिकृत JCB डीलर' : 'Authorized JCB Dealer'}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                {language === 'hi' ? (<>बिहार के लिए पूरी <span className="text-jcb">JCB</span> रेंज</>) : (<>Complete <span className="text-jcb">JCB</span> Range for Bihar</>)}
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8">
                {language === 'hi' ? 'बिहार की तरक्की को शक्ति देने वाली निर्माण मशीनें। असली उत्पाद, आधिकारिक वारंटी।' : 'Construction machines that power Bihar\'s growth. Genuine products, official warranty.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919876543210">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold">
                    <Phone className="h-5 w-5" />
                    {language === 'hi' ? 'कीमत के लिए कॉल करें' : 'Call for Price'}
                  </Button>
                </a>
                <a href={getWhatsAppUrl("9876543210")} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold">
                    <MessageCircle className="h-5 w-5" />
                    {language === 'hi' ? 'डेमो शेड्यूल करें' : 'Schedule Demo'}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category & Subcategory Filter */}
        <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {Object.keys(categoryStructure).map((category) => (
                <button key={category} onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category ? "bg-jcb text-jcb-foreground" : "bg-muted text-muted-foreground hover:bg-jcb/10 hover:text-jcb"}`}>
                  {category}
                </button>
              ))}
            </div>
            {subcategories.length > 0 && (
              <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide border-t border-border/50 pt-2">
                {subcategories.map((sub) => (
                  <button key={sub} onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedSubcategory === sub ? "bg-jcb/20 text-jcb border border-jcb" : "bg-muted/50 text-muted-foreground hover:bg-jcb/10 hover:text-jcb border border-transparent"}`}>
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
              <>
                {language === 'hi' ? `${filteredProducts.length} उत्पाद मिले` : `Showing ${filteredProducts.length} products`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {selectedSubcategory !== "All" && ` → ${selectedSubcategory}`}
              </>
            )}
          </p>
        </div>

        {/* Product Grid */}
        <section className="pb-12 lg:pb-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-jcb" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => {
                  const selected = isSelected(product.id);
                  return (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                      className={product.featured ? "md:col-span-2 lg:col-span-1" : ""}>
                      <div className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border h-full card-jcb ${selected ? 'border-jcb ring-2 ring-jcb' : 'border-border'}`}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          {product.badge && (
                            <div className="absolute top-4 left-4 px-3 py-1.5 bg-jcb text-jcb-foreground rounded-full text-xs font-bold tracking-wide">{product.badge}</div>
                          )}
                          <Button size="sm" variant="outline"
                            className={`absolute top-4 right-4 gap-1.5 rounded-full text-xs font-medium shadow-md ${selected ? 'bg-jcb text-jcb-foreground border-jcb hover:bg-jcb/90' : 'bg-background/90 backdrop-blur-sm border-jcb/50 text-jcb hover:bg-jcb hover:text-jcb-foreground'}`}
                            onClick={(e) => { e.stopPropagation(); handleProductSelect(toLeadProduct(product)); }}>
                            <ShoppingCart className="h-3.5 w-3.5" />
                            {selected ? (language === 'hi' ? 'चयनित' : 'Selected') : (language === 'hi' ? 'तुलना करें' : 'Compare')}
                          </Button>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-jcb font-medium px-2 py-0.5 bg-jcb/10 rounded">{product.category}</span>
                            <span className="text-xs text-muted-foreground">{product.subcategory}</span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{language === 'hi' ? 'के लिए सर्वश्रेष्ठ:' : 'Best for:'} {product.bestFor}</p>
                          <div className="flex gap-4 mb-4 text-xs text-muted-foreground">
                            {product.specs.power && <div className="flex items-center gap-1"><Gauge className="h-3 w-3" />{product.specs.power}</div>}
                            {product.specs.fuel && <div className="flex items-center gap-1"><Fuel className="h-3 w-3" />{product.specs.fuel}</div>}
                            {product.specs.weight && <div className="flex items-center gap-1"><Weight className="h-3 w-3" />{product.specs.weight}</div>}
                          </div>
                          <div className="mb-4">
                            <BrochureDownloadButton
                              productName={product.name}
                              brochureUrl={product.brochureUrl}
                              className="border-jcb/30 text-jcb hover:bg-jcb/10"
                            />
                          </div>
                          <div className="pt-4 border-t border-border flex items-center justify-between">
                            <p className="text-xl font-bold text-foreground">{product.price}</p>
                            <a href={getWhatsAppUrl(settings?.whatsapp_number, product.name)} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="gap-1.5 bg-success text-success-foreground hover:bg-success/90 rounded-full text-xs">
                                <MessageCircle className="h-3.5 w-3.5" />
                                {language === 'hi' ? 'पूछें' : 'Enquire'}
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">{language === 'hi' ? 'इस श्रेणी में कोई उत्पाद नहीं मिला' : 'No products found in this category'}</p>
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
              {language === 'hi' ? 'चुनने में मदद चाहिए?' : 'Need Help Choosing?'}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {language === 'hi' ? 'हमारे JCB विशेषज्ञ आपकी परियोजना आवश्यकताओं के लिए सही मशीन खोजने में मदद करेंगे।' : 'Our JCB experts will help you find the perfect machine for your project requirements.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210">
                <Button size="lg" className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold">
                  <Phone className="h-5 w-5" />{language === 'hi' ? 'विशेषज्ञ से बात करें' : 'Talk to Expert'}
                </Button>
              </a>
              <Link to="/finance">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold">
                  {language === 'hi' ? 'फाइनेंस विकल्प देखें' : 'Check Finance Options'}<ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />

      {/* Lead Flow */}
      <LeadSelectionBar selectedCount={selectedProducts.length} onSelectClick={handleViewTco} onClearClick={clearSelection} />
      <TCOPopup isOpen={isTcoOpen} products={selectedProducts} onContinue={handleTcoContinue} onBack={() => setIsTcoOpen(false)} />
    </div>
  );
};

export default JCBPage;
