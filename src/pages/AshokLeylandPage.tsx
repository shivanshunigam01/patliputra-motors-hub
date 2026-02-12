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

import leylandTrucks from "@/assets/leyland-trucks.jpg";
import { useAdminSettings } from "@/context/AdminSettingsContext";

const products = [
  {
    id: "leyland-1",
    name: "Ashok Leyland 4825",
    category: "Heavy Truck",
    subcategory: "Long Haul",
    price: "₹32.00 Lakh*",
    bestFor: "Long Haul Transport",
    badge: "BESTSELLER",
    image: leylandTrucks,
    brochureUrl: "/brochures/al-4825.pdf",
    specs: { power: "250 HP", capacity: "49T GVW", fuel: "Diesel", warranty: "2 Years", application: "Long Haul Transport" },
  },
  {
    id: "leyland-2",
    name: "Ashok Leyland 4023",
    category: "Heavy Truck",
    subcategory: "Multi-Axle",
    price: "₹28.00 Lakh*",
    bestFor: "Heavy Transport",
    badge: null,
    image: leylandTrucks,
    brochureUrl: null,
    specs: { power: "230 HP", capacity: "40T GVW", fuel: "Diesel", warranty: "2 Years", application: "Heavy Transport" },
  },
  {
    id: "leyland-3",
    name: "Ashok Leyland 2825",
    category: "Heavy Truck",
    subcategory: "Medium Distance",
    price: "₹24.00 Lakh*",
    bestFor: "Medium Distance",
    badge: null,
    image: leylandTrucks,
    brochureUrl: "/brochures/al-2825.pdf",
    specs: { power: "220 HP", capacity: "28T GVW", fuel: "Diesel", warranty: "2 Years", application: "Medium Distance Transport" },
  },
  {
    id: "leyland-4",
    name: "Ashok Leyland 1616",
    category: "Tipper",
    subcategory: "Mining Tipper",
    price: "₹18.50 Lakh*",
    bestFor: "Mining, Construction",
    badge: "POPULAR",
    image: leylandTrucks,
    brochureUrl: "/brochures/al-1616.pdf",
    specs: { power: "160 HP", capacity: "16T GVW", fuel: "Diesel", warranty: "2 Years", application: "Mining, Construction" },
  },
  {
    id: "leyland-5",
    name: "Ashok Leyland 2518",
    category: "Tipper",
    subcategory: "Heavy Tipper",
    price: "₹22.00 Lakh*",
    bestFor: "Heavy Mining",
    badge: null,
    image: leylandTrucks,
    brochureUrl: null,
    specs: { power: "180 HP", capacity: "25T GVW", fuel: "Diesel", warranty: "2 Years", application: "Heavy Mining" },
  },
  {
    id: "leyland-6",
    name: "Ashok Leyland BOSS 1615",
    category: "ICV",
    subcategory: "City Distribution",
    price: "₹16.80 Lakh*",
    bestFor: "City Distribution",
    badge: null,
    image: leylandTrucks,
    brochureUrl: "/brochures/al-boss-1615.pdf",
    specs: { power: "152 HP", capacity: "16T GVW", fuel: "Diesel", warranty: "2 Years", application: "City Distribution" },
  },
  {
    id: "leyland-7",
    name: "Ashok Leyland Ecomet 1215",
    category: "ICV",
    subcategory: "Regional Haul",
    price: "₹14.50 Lakh*",
    bestFor: "Regional Transport",
    badge: "VALUE CHOICE",
    image: leylandTrucks,
    brochureUrl: null,
    specs: { power: "120 HP", capacity: "12T GVW", fuel: "Diesel", warranty: "2 Years", application: "Regional Transport" },
  },
  {
    id: "leyland-8",
    name: "Ashok Leyland Viking",
    category: "Bus",
    subcategory: "Staff Bus",
    price: "₹24.00 Lakh*",
    bestFor: "Passenger Transport",
    badge: "NEW",
    image: leylandTrucks,
    brochureUrl: "/brochures/al-viking.pdf",
    specs: { power: "180 HP", capacity: "50+ Seats", fuel: "Diesel", warranty: "3 Years", application: "Passenger Transport" },
  },
  {
    id: "leyland-9",
    name: "Ashok Leyland Oyster",
    category: "Bus",
    subcategory: "School Bus",
    price: "₹20.00 Lakh*",
    bestFor: "School Transport",
    badge: null,
    image: leylandTrucks,
    brochureUrl: null,
    specs: { power: "150 HP", capacity: "40 Seats", fuel: "Diesel", warranty: "3 Years", application: "School Transport" },
  },
  {
    id: "leyland-10",
    name: "Ashok Leyland DOST+",
    category: "LCV",
    subcategory: "Mini Truck",
    price: "₹8.50 Lakh*",
    bestFor: "Last Mile Delivery",
    badge: "VALUE CHOICE",
    image: leylandTrucks,
    brochureUrl: "/brochures/al-dost.pdf",
    specs: { power: "60 HP", capacity: "2.5T", fuel: "Diesel", warranty: "2 Years", application: "Last Mile Delivery" },
  },
  {
    id: "leyland-11",
    name: "Ashok Leyland Bada Dost",
    category: "LCV",
    subcategory: "Light Truck",
    price: "₹10.50 Lakh*",
    bestFor: "City Logistics",
    badge: null,
    image: leylandTrucks,
    brochureUrl: null,
    specs: { power: "80 HP", capacity: "3.5T", fuel: "Diesel", warranty: "2 Years", application: "City Logistics" },
  },
];

const categoryStructure: Record<string, string[]> = {
  "All": [],
  "Heavy Truck": ["All", "Long Haul", "Multi-Axle", "Medium Distance"],
  "Tipper": ["All", "Mining Tipper", "Heavy Tipper"],
  "ICV": ["All", "City Distribution", "Regional Haul"],
  "Bus": ["All", "Staff Bus", "School Bus"],
  "LCV": ["All", "Mini Truck", "Light Truck"],
};

const AshokLeylandPage = () => {
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
              src={leylandTrucks}
              alt="Ashok Leyland Trucks"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-leyland/20 text-leyland rounded-full text-sm font-medium mb-6">
                <CheckCircle className="h-4 w-4" />
                {language === 'hi' ? 'अधिकृत अशोक लेलैंड डीलर' : 'Authorized Ashok Leyland Dealer'}
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                {language === 'hi' ? (
                  <>भारत का विश्वसनीय <span className="text-leyland">कमर्शियल फ्लीट</span></>
                ) : (
                  <>India's Trusted <span className="text-leyland">Commercial Fleet</span></>
                )}
              </h1>

              <p className="text-lg text-primary-foreground/80 mb-8">
                {language === 'hi'
                  ? 'अशोक लेलैंड की पौराणिक विश्वसनीयता और प्रदर्शन के साथ हर यात्रा को शक्ति दें।'
                  : 'Power every journey with Ashok Leyland\'s legendary reliability and performance.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:+91${settings?.primary_phone}`}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 bg-leyland text-leyland-foreground hover:bg-leyland/90 font-semibold"
                  >
                    <Phone className="h-5 w-5" />
                    {language === 'hi' ? 'बेस्ट प्राइस पाएं' : 'Get Best Price'}
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
                    {language === 'hi' ? 'टेस्ट ड्राइव बुक करें' : 'Book Test Drive'}
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
                      ? "bg-leyland text-leyland-foreground"
                      : "bg-muted text-muted-foreground hover:bg-leyland/10 hover:text-leyland"
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
                        ? "bg-leyland/20 text-leyland border border-leyland"
                        : "bg-muted/50 text-muted-foreground hover:bg-leyland/10 hover:text-leyland border border-transparent"
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
                >
                  <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border h-full card-leyland">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-leyland text-leyland-foreground rounded-full text-xs font-bold tracking-wide">
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
                            brand: 'Ashok Leyland',
                            image: product.image,
                            specs: product.specs,
                          }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-leyland font-medium px-2 py-0.5 bg-leyland/10 rounded">
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
                          <Weight className="h-3 w-3" />
                          {product.specs.capacity}
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-3 w-3" />
                          {product.specs.fuel}
                        </div>
                      </div>

                      {/* Brochure Download */}
                      <div className="mb-4">
                        {product.brochureUrl ? (
                          <a href={product.brochureUrl} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2 border-leyland/30 text-leyland hover:bg-leyland/10"
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
                              className="border-leyland text-leyland hover:bg-leyland hover:text-leyland-foreground"
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
              {language === 'hi' ? 'फ्लीट सॉल्यूशंस उपलब्ध' : 'Fleet Solutions Available'}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {language === 'hi'
                ? 'फ्लीट खरीद के लिए विशेष मूल्य। अपने ट्रांसपोर्ट बिज़नेस के लिए कस्टमाइज्ड सॉल्यूशंस पाएं।'
                : 'Special pricing for fleet purchases. Get customized solutions for your transport business.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:+91${settings?.primary_phone}`}>
                <Button
                  size="lg"
                  className="gap-2 bg-leyland text-leyland-foreground hover:bg-leyland/90 font-semibold"
                >
                  <Phone className="h-5 w-5" />
                  {language === 'hi' ? 'फ्लीट मैनेजर से बात करें' : 'Talk to Fleet Manager'}
                </Button>
              </a>
              <Link to="/finance">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold"
                >
                  {language === 'hi' ? 'फ्लीट फाइनेंस विकल्प' : 'Fleet Finance Options'}
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

export default AshokLeylandPage;
