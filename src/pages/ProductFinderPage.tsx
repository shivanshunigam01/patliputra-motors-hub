import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, Gauge, Fuel, Weight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/i18n/LanguageContext";
import { allProducts, brands, categories, applications, fuelTypes, conditions } from "@/data/products";
import { Link } from "react-router-dom";

const ProductFinderPage = () => {
  const { t, language } = useLanguage();
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [application, setApplication] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [budget, setBudget] = useState<number[]>([0, 200]);

  const availableCategories = brand && brand in categories ? categories[brand as keyof typeof categories] : [];

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      if (brand && p.brand !== brand) return false;
      if (category && p.category !== category) return false;
      if (application && p.specs.application !== application) return false;
      if (fuelType && p.specs.fuel !== fuelType) return false;
      if (condition && p.condition !== condition) return false;
      const priceNum = parseFloat(p.price.replace(/[^\d.]/g, ""));
      if (priceNum < budget[0] || priceNum > budget[1]) return false;
      return true;
    });
  }, [brand, category, application, fuelType, condition, budget]);

  const clearFilters = () => { setBrand(""); setCategory(""); setApplication(""); setFuelType(""); setCondition(""); setBudget([0, 200]); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-jcb/20 text-jcb rounded-full text-sm font-medium mb-4">
                <Search className="h-4 w-4" />
                {t("productFinder.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("productFinder.title")}</h1>
              <p className="text-lg text-primary-foreground/80">{t("productFinder.subtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-muted border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Select value={brand} onValueChange={v => { setBrand(v); setCategory(""); }}>
                <SelectTrigger><SelectValue placeholder={t("productFinder.allBrands")} /></SelectTrigger>
                <SelectContent>{brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory} disabled={!brand}>
                <SelectTrigger><SelectValue placeholder={t("productFinder.allCategories")} /></SelectTrigger>
                <SelectContent>{availableCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={application} onValueChange={setApplication}>
                <SelectTrigger><SelectValue placeholder={t("productFinder.allApplications")} /></SelectTrigger>
                <SelectContent>{applications.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={fuelType} onValueChange={setFuelType}>
                <SelectTrigger><SelectValue placeholder={t("productFinder.allFuelTypes")} /></SelectTrigger>
                <SelectContent>{fuelTypes.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger><SelectValue placeholder={t("productFinder.anyCondition")} /></SelectTrigger>
                <SelectContent>{conditions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              <Button variant="outline" onClick={clearFilters} className="gap-2"><X className="h-4 w-4" />{t("productFinder.clearFilters")}</Button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">{t("productFinder.budget")}: ₹{budget[0]} Lakh - ₹{budget[1]} Lakh</p>
              <Slider value={budget} onValueChange={setBudget} min={0} max={200} step={5} className="max-w-md" />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <p className="text-muted-foreground mb-6">{filteredProducts.length} {t("productFinder.results")}</p>
            {filteredProducts.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t("productFinder.noResults")}</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="bg-card rounded-xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <span className={`text-xs font-medium ${product.brand === "JCB" ? "text-jcb" : product.brand === "Ashok Leyland" ? "text-leyland" : product.brand === "Switch EV" ? "text-ev" : "text-muted-foreground"}`}>{product.brand} • {product.category}</span>
                      <h3 className="text-lg font-bold text-foreground mt-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{language === "hi" ? product.bestForHi : product.bestFor}</p>
                      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                        {product.specs.power && <span className="flex items-center gap-1"><Gauge className="h-3 w-3" />{product.specs.power}</span>}
                        {product.specs.fuel && <span className="flex items-center gap-1"><Fuel className="h-3 w-3" />{product.specs.fuel}</span>}
                        {product.specs.weight && <span className="flex items-center gap-1"><Weight className="h-3 w-3" />{product.specs.weight}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <Link to="/contact"><Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">{t("common.viewAll") === "सभी देखें" ? "नवीनतम कीमत पाएं" : "Get Latest Price"}</Button></Link>
                        <Button size="sm" asChild><Link to={`/${product.brand === "JCB" ? "jcb" : product.brand === "Ashok Leyland" ? "ashok-leyland" : product.brand === "Switch EV" ? "switch-ev" : "used-vehicles"}`}>{t("common.viewAll")}</Link></Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default ProductFinderPage;
