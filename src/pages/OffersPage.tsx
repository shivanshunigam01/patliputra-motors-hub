import { motion } from "framer-motion";
import { Tag, Phone, MessageCircle, Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { getActiveOffers } from "@/data/offers";

const OffersPage = () => {
  const { t, language } = useLanguage();
  const activeOffers = getActiveOffers();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-leyland/20 text-leyland rounded-full text-sm font-medium mb-4">
                <Tag className="h-4 w-4" />
                {t("offers.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("offers.pageTitle")}</h1>
              <p className="text-lg text-primary-foreground/80">{t("offers.pageSubtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {activeOffers.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t("offers.noOffers")}</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeOffers.map((offer, i) => (
                  <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="bg-card rounded-xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {offer.brand && offer.brand !== "All" && <span className={`px-2 py-1 rounded text-xs font-medium ${offer.brand === "JCB" ? "bg-jcb/10 text-jcb" : offer.brand === "Ashok Leyland" ? "bg-leyland/10 text-leyland" : offer.brand === "Switch EV" ? "bg-ev/10 text-ev" : "bg-muted text-muted-foreground"}`}>{offer.brand}</span>}
                        {offer.featured && <span className="px-2 py-1 rounded text-xs font-medium bg-success/10 text-success">Featured</span>}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{language === "hi" ? offer.titleHi : offer.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{language === "hi" ? offer.descriptionHi : offer.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <Calendar className="h-3 w-3" />
                        {t("offers.validTill")}: {new Date(offer.validTill).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN")}
                      </div>
                      <div className="flex gap-2">
                        <a href="tel:+919876543210" className="flex-1"><Button size="sm" variant="outline" className="w-full gap-1"><Phone className="h-3 w-3" />{t("common.call")}</Button></a>
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex-1"><Button size="sm" className="w-full gap-1 bg-success text-success-foreground hover:bg-success/90"><MessageCircle className="h-3 w-3" />{t("common.whatsapp")}</Button></a>
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

export default OffersPage;
