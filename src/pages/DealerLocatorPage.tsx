import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Navigation, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";
import { dealers } from "@/data/dealers";

const DealerLocatorPage = () => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");

  const filteredDealers = useMemo(() => {
    if (!search.trim()) return dealers;
    const q = search.toLowerCase();
    return dealers.filter(d => d.city.toLowerCase().includes(q) || d.district.toLowerCase().includes(q) || d.pincode.includes(q) || d.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ev/20 text-ev rounded-full text-sm font-medium mb-4">
                <MapPin className="h-4 w-4" />
                {t("dealer.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("dealer.title")}</h1>
              <p className="text-lg text-primary-foreground/80">{t("dealer.subtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-muted border-b border-border">
          <div className="container mx-auto px-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={t("dealer.searchPlaceholder")} className="pl-12 h-12 text-lg" />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <p className="text-muted-foreground mb-6">{filteredDealers.length} {t("dealer.dealers")}</p>
            {filteredDealers.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t("dealer.noResults")}</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDealers.map((dealer, i) => (
                  <motion.div key={dealer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="bg-card rounded-xl border border-border p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-foreground mb-2">{language === "hi" && dealer.nameHi ? dealer.nameHi : dealer.name}</h3>
                    <div className="flex items-start gap-2 text-muted-foreground text-sm mb-4">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{language === "hi" && dealer.addressHi ? dealer.addressHi : dealer.address}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a href={`tel:${dealer.phone}`}><Button size="sm" variant="outline" className="gap-1"><Phone className="h-3 w-3" />{t("common.call")}</Button></a>
                      <a href={`https://wa.me/${dealer.whatsapp}`} target="_blank" rel="noopener noreferrer"><Button size="sm" className="gap-1 bg-success text-success-foreground hover:bg-success/90"><MessageCircle className="h-3 w-3" />{t("common.whatsapp")}</Button></a>
                      {dealer.lat && dealer.lng && <a href={`https://www.google.com/maps/dir/?api=1&destination=${dealer.lat},${dealer.lng}`} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="secondary" className="gap-1"><Navigation className="h-3 w-3" />{t("dealer.getDirections")}</Button></a>}
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

export default DealerLocatorPage;
