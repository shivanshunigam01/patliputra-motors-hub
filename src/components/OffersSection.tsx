import { motion } from "framer-motion";
import { Tag, Phone, MessageCircle, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { getFeaturedOffers } from "@/data/offers";
import { Link } from "react-router-dom";

export function OffersSection() {
  const { t, language } = useLanguage();
  const featuredOffers = getFeaturedOffers();

  if (featuredOffers.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-leyland/10 text-leyland rounded-full text-sm font-medium mb-4">
            <Tag className="h-4 w-4" />
            {t("offers.badge")}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("offers.sectionTitle")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("offers.sectionSubtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredOffers.slice(0, 6).map((offer, i) => (
            <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-card rounded-xl border border-border p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                {offer.brand && offer.brand !== "All" && <span className={`px-2 py-1 rounded text-xs font-medium ${offer.brand === "JCB" ? "bg-jcb/10 text-jcb" : offer.brand === "Ashok Leyland" ? "bg-leyland/10 text-leyland" : offer.brand === "Switch EV" ? "bg-ev/10 text-ev" : "bg-muted text-muted-foreground"}`}>{offer.brand}</span>}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{language === "hi" ? offer.titleHi : offer.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{language === "hi" ? offer.descriptionHi : offer.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Calendar className="h-3 w-3" />
                {t("offers.validTill")}: {new Date(offer.validTill).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN")}
              </div>
              <div className="flex gap-2">
                <a href="tel:+919876543210" className="flex-1"><Button size="sm" variant="outline" className="w-full gap-1"><Phone className="h-3 w-3" />{t("common.call")}</Button></a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex-1"><Button size="sm" className="w-full gap-1 bg-success text-success-foreground hover:bg-success/90"><MessageCircle className="h-3 w-3" />{t("common.whatsapp")}</Button></a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/offers">
            <Button size="lg" variant="outline" className="gap-2">
              {t("common.viewAll")}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
