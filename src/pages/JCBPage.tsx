
import { useState, useMemo } from "react";
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
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ProductCompareCheckbox } from "@/components/ProductCompareCheckbox";
import { useLanguage } from "@/i18n/LanguageContext";

import heroJcb from "@/assets/hero-jcb.jpg";
import { useAdminSettings } from "@/context/AdminSettingsContext";

const products = [
  {
    id: "jcb-1",
    name: "JCB 3DX Super EcoXcellence",
    category: "Backhoe Loader",
    subcategory: "3DX Series",
    price: "₹16.50 Lakh*",
    bestFor: "Road Construction, Farming",
    badge: "BESTSELLER",
    image: heroJcb,
    featured: true,
    brochureUrl: null,
    specs: { power: "81 HP", fuel: "Diesel", weight: "7,100 kg", capacity: "1.0 m³", warranty: "3 Years", application: "Construction, Farming" },
  },
  {
    id: "jcb-2",
    name: "JCB 3DX Plus",
    category: "Backhoe Loader",
    subcategory: "3DX Series",
    price: "₹15.80 Lakh*",
    bestFor: "General Construction",
    badge: null,
    image: heroJcb,
    featured: false,
    brochureUrl: "/brochures/jcb-3dx-plus.pdf",
    specs: { power: "76 HP", fuel: "Diesel", weight: "6,900 kg", capacity: "0.9 m³", warranty: "3 Years", application: "General Construction" },
  },
  {
    id: "jcb-3",
    name: "JCB 4DX",
    category: "Backhoe Loader",
    subcategory: "4DX Series",
    price: "₹19.80 Lakh*",
    bestFor: "Mining, Quarry Work",
    badge: null,
    image: heroJcb,
    featured: false,
    brochureUrl: "/brochures/jcb-4dx.pdf",
    specs: { power: "98 HP", fuel: "Diesel", weight: "8,200 kg", capacity: "1.2 m³", warranty: "3 Years", application: "Mining, Quarry" },
  },
  {
    id: "jcb-4",
    name: "JCB JS205SC",
    category: "Excavator",
    subcategory: "JS Series",
    price: "₹42.00 Lakh*",
    bestFor: "Heavy Earthmoving",
    badge: "NEW LAUNCH",
    image: heroJcb,
    featured: true,
    brochureUrl: null,
    specs: { power: "143 HP", fuel: "Diesel", weight: "20,700 kg", capacity: "0.9 m³", warranty: "3 Years", application: "Heavy Earthmoving" },
  },
  {
    id: "jcb-5",
    name: "JCB JS120",
    category: "Excavator",
    subcategory: "JS Series",
    price: "₹35.00 Lakh*",
    bestFor: "Urban Construction",
    badge: "ECO CHOICE",
    image: heroJcb,
    featured: false,
    brochureUrl: "/brochures/jcb-js120.pdf",
    specs: { power: "95 HP", fuel: "Diesel", weight: "12,500 kg", capacity: "0.5 m³", warranty: "3 Years", application: "Urban Construction" },
  },
  {
    id: "jcb-6",
    name: "JCB JS80",
    category: "Excavator",
    subcategory: "Mini Excavator",
    price: "₹22.00 Lakh*",
    bestFor: "Compact Sites",
    badge: null,
    image: heroJcb,
    featured: false,
    brochureUrl: null,
    specs: { power: "58 HP", fuel: "Diesel", weight: "8,000 kg", capacity: "0.3 m³", warranty: "3 Years", application: "Compact Construction" },
  },
  {
    id: "jcb-7",
    name: "JCB VM115",
    category: "Compactor",
    subcategory: "Soil Compactor",
    price: "₹28.50 Lakh*",
    bestFor: "Road Compaction",
    badge: null,
    image: heroJcb,
    featured: false,
    brochureUrl: "/brochures/jcb-vm115.pdf",
    specs: { power: "115 HP", fuel: "Diesel", weight: "11,500 kg", capacity: "11,500 kg", warranty: "2 Years", application: "Road Compaction" },
  },
  {
    id: "jcb-8",
    name: "JCB VMT860",
    category: "Compactor",
    subcategory: "Tandem Roller",
    price: "₹18.00 Lakh*",
    bestFor: "Asphalt Roads",
    badge: null,
    image: heroJcb,
    featured: false,
    brochureUrl: null,
    specs: { power: "74 HP", fuel: "Diesel", weight: "8,000 kg", capacity: "8,000 kg", warranty: "2 Years", application: "Asphalt Compaction" },
  },
];

const categoryStructure: Record<string, string[]> = {
  "All": [],
  "Backhoe Loader": ["All", "3DX Series", "4DX Series"],
  "Excavator": ["All", "JS Series", "Mini Excavator"],
  "Compactor": ["All", "Soil Compactor", "Tandem Roller"],
};

const JCBPage = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  const subcategories = useMemo(() => {
    return categoryStructure[selectedCategory] || [];
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      if (selectedSubcategory !== "All" && product.subcategory !== selectedSubcategory) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("All");
  };
 const { settings } = useAdminSettings();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Banner */}
        <section className="relative min-h-[55vh] lg:min-h-[65vh] flex items-center pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="absolute inset-0">
            <img
              src={heroJcb}
              alt="JCB Construction Equipment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-jcb/20 text-jcb rounded-full text-sm font-medium mb-6">
                <CheckCircle className="h-4 w-4" />
                {language === 'hi' ? 'अधिकृत JCB डीलर' : 'Authorized JCB Dealer'}
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                {language === 'hi' ? (
                  <>बिहार के लिए पूरी <span className="text-jcb">JCB</span> रेंज</>
                ) : (
                  <>Complete <span className="text-jcb">JCB</span> Range for Bihar</>
                )}
              </h1>

              <p className="text-lg text-primary-foreground/80 mb-8">
                {language === 'hi' 
                  ? 'बिहार की तरक्की को शक्ति देने वाली निर्माण मशीनें। असली उत्पाद, आधिकारिक वारंटी।'
                  : 'Construction machines that power Bihar\'s growth. Genuine products, official warranty.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:+91${settings?.primary_phone}`}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold"
                  >
                    <Phone className="h-5 w-5" />
                    {language === 'hi' ? 'कीमत के लिए कॉल करें' : 'Call for Price'}
                  </Button>
                </a>
                <a
                  href={`https://wa.me/91${settings?.whatsapp_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold"
                  >
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
            {/* Main Categories */}
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {Object.keys(categoryStructure).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-jcb text-jcb-foreground"
                      : "bg-muted text-muted-foreground hover:bg-jcb/10 hover:text-jcb"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Subcategories */}
            {subcategories.length > 0 && (
              <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide border-t border-border/50 pt-2">
                {subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedSubcategory === sub
                        ? "bg-jcb/20 text-jcb border border-jcb"
                        : "bg-muted/50 text-muted-foreground hover:bg-jcb/10 hover:text-jcb border border-transparent"
                    }`}
                  >
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
            {language === 'hi' 
              ? `${filteredProducts.length} उत्पाद मिले`
              : `Showing ${filteredProducts.length} products`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedSubcategory !== "All" && ` → ${selectedSubcategory}`}
          </p>
        </div>

        {/* Product Grid */}
        <section className="pb-12 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={product.featured ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border h-full card-jcb">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-jcb text-jcb-foreground rounded-full text-xs font-bold tracking-wide">
                          {product.badge}
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                        <ProductCompareCheckbox
                          product={{
                            id: product.id,
                            name: product.name,
                            category: product.category,
                            price: product.price,
                            brand: 'JCB',
                            image: product.image,
                            specs: product.specs,
                          }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-jcb font-medium px-2 py-0.5 bg-jcb/10 rounded">
                          {product.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {product.subcategory}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'hi' ? 'के लिए सर्वश्रेष्ठ:' : 'Best for:'} {product.bestFor}
                      </p>

                      {/* Specs */}
                      <div className="flex gap-4 mb-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Gauge className="h-3 w-3" />
                          {product.specs.power}
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-3 w-3" />
                          {product.specs.fuel}
                        </div>
                        <div className="flex items-center gap-1">
                          <Weight className="h-3 w-3" />
                          {product.specs.weight}
                        </div>
                      </div>

                      {/* Brochure Download */}
                      <div className="mb-4">
                        {product.brochureUrl ? (
                          <a href={product.brochureUrl} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2 border-jcb/30 text-jcb hover:bg-jcb/10"
                            >
                              <Download className="h-4 w-4" />
                              {language === 'hi' ? 'ब्रोशर डाउनलोड करें' : 'Download Brochure'}
                            </Button>
                          </a>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="w-full gap-2 opacity-50"
                          >
                            <FileText className="h-4 w-4" />
                            {language === 'hi' ? 'ब्रोशर जल्द आ रहा है' : 'Brochure Coming Soon'}
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <p className="text-xl font-bold text-foreground">
                          {product.price}
                        </p>
                        <div className="flex gap-2">
                          <a href={`tel:+91${settings?.primary_phone}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-jcb text-jcb hover:bg-jcb hover:text-jcb-foreground"
                            >
                              {language === 'hi' ? 'पूछताछ' : 'Enquiry'}
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  {language === 'hi' ? 'इस श्रेणी में कोई उत्पाद नहीं मिला' : 'No products found in this category'}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedSubcategory("All");
                  }}
                >
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
              {language === 'hi'
                ? 'हमारे JCB विशेषज्ञ आपकी परियोजना आवश्यकताओं के लिए सही मशीन खोजने में मदद करेंगे।'
                : 'Our JCB experts will help you find the perfect machine for your project requirements.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:+91${settings?.primary_phone}`}>
                <Button
                  size="lg"
                  className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold"
                >
                  <Phone className="h-5 w-5" />
                  {language === 'hi' ? 'विशेषज्ञ से बात करें' : 'Talk to Expert'}
                </Button>
              </a>
              <Link to="/finance">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold"
                >
                  {language === 'hi' ? 'फाइनेंस विकल्प देखें' : 'Check Finance Options'}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default JCBPage;
