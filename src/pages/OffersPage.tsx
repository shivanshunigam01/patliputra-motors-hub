import { motion } from "framer-motion";
import { Tag, Phone, MessageCircle, Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface ApiOffer {
  _id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  startDate: string;
  endDate: string;
  applicableBrand: string;
  applicableCategory: string;
  isActive: boolean;
  priority: number;
}

const OffersPage = () => {
  const { t, language } = useLanguage();
  const { settings } = useAdminSettings();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const res = await fetch("https://api.patliputragroup.com/offers");
      const data = await res.json();
      return data.data as ApiOffer[];
    },
  });

  const activeOffers = useMemo(() => {
    const today = new Date();

    return offers
      .filter((offer) => {
        const start = new Date(offer.startDate);
        const end = new Date(offer.endDate);
        return offer.isActive && start <= today && end >= today;
      })
      .sort((a, b) => a.priority - b.priority);
  }, [offers]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">

        {/* HERO */}
        <section className="relative py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4 text-white">
                <Tag className="h-4 w-4" />
                Limited Time
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {t("offers.pageTitle")}
              </h1>

              <p className="text-lg text-white/80">
                {t("offers.pageSubtitle")}
              </p>

            </motion.div>

          </div>
        </section>

        {/* OFFERS */}
        <section className="py-16">
          <div className="container mx-auto px-4">

            {isLoading && (
              <p className="text-center text-muted-foreground py-20">
                Loading offers...
              </p>
            )}

            {!isLoading && activeOffers.length === 0 && (
              <p className="text-center text-muted-foreground py-20">
                {t("offers.noOffers")}
              </p>
            )}

            {!isLoading && activeOffers.length > 0 && (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

                {activeOffers.map((offer, i) => {

                  const title =
                    language === "hi"
                      ? offer.titleHi || offer.titleEn
                      : offer.titleEn;

                  const description =
                    language === "hi"
                      ? offer.descriptionHi || offer.descriptionEn
                      : offer.descriptionEn;

                  return (

                    <motion.div
                      key={offer._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="relative bg-card border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >

                      {/* TOP GRADIENT */}
                      <div className="h-2 bg-gradient-to-r from-primary via-success to-secondary" />

                      <div className="p-7 space-y-5">

                        {/* BRAND */}
                        <div className="flex items-center justify-between">

                          {offer.applicableBrand !== "ALL" && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {offer.applicableBrand}
                            </span>
                          )}

                          <span className="text-xs text-muted-foreground">
                            Limited Offer
                          </span>

                        </div>

                        {/* TITLE */}
                        <h3 className="text-xl font-bold leading-tight text-foreground">
                          {title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {description}
                        </p>

                        {/* DATE */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-4 w-4" />

                          {t("offers.validTill")}{" "}
                          {new Date(offer.endDate).toLocaleDateString(
                            language === "hi" ? "hi-IN" : "en-IN"
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3 pt-4">

                          <a
                            href={`tel:+91${settings?.primary_phone}`}
                            className="flex-1"
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full gap-2"
                            >
                              <Phone className="h-4 w-4" />
                              {t("common.call")}
                            </Button>
                          </a>

                          <a
                            href={getWhatsAppUrl(
                              settings?.whatsapp_number,
                              title
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button
                              size="sm"
                              className="w-full gap-2 bg-success text-white hover:bg-success/90"
                            >
                              <MessageCircle className="h-4 w-4" />
                              {t("common.whatsapp")}
                            </Button>
                          </a>

                        </div>

                      </div>

                    </motion.div>

                  );

                })}

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