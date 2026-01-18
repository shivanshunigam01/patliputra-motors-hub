import { motion } from "framer-motion";
import { Phone, MessageCircle, Shield, CheckCircle, Droplets, Cog } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const PartsLubricantsPage = () => {
  const { t } = useLanguage();

  const partsBenefits = [t("partsLubricants.parts1"), t("partsLubricants.parts2"), t("partsLubricants.parts3"), t("partsLubricants.parts4")];
  const lubricantTypes = [t("partsLubricants.lubricant1"), t("partsLubricants.lubricant2"), t("partsLubricants.lubricant3"), t("partsLubricants.lubricant4")];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-jcb/20 text-jcb rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                {t("partsLubricants.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("partsLubricants.heroTitle")}</h1>
              <p className="text-lg text-primary-foreground/80">{t("partsLubricants.heroSubtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <Cog className="h-8 w-8 text-jcb" />
                  <h2 className="text-2xl font-bold text-foreground">{t("partsLubricants.partsTitle")}</h2>
                </div>
                <p className="text-muted-foreground mb-6">{t("partsLubricants.partsDesc")}</p>
                <div className="space-y-3">
                  {partsBenefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-jcb" />
                      <span className="text-foreground">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <Droplets className="h-8 w-8 text-ev" />
                  <h2 className="text-2xl font-bold text-foreground">{t("partsLubricants.lubricantsTitle")}</h2>
                </div>
                <p className="text-muted-foreground mb-6">{t("partsLubricants.lubricantsDesc")}</p>
                <div className="space-y-3">
                  {lubricantTypes.map((l, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-ev" />
                      <span className="text-foreground">{l}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">{t("partsLubricants.ctaTitle")}</h2>
            <p className="text-primary-foreground/80 mb-8">{t("partsLubricants.ctaDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210"><Button size="lg" className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb-hover"><Phone className="h-5 w-5" />{t("common.callNow")}</Button></a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"><Button size="lg" className="gap-2 bg-success text-success-foreground hover:bg-success/90"><MessageCircle className="h-5 w-5" />{t("common.whatsapp")}</Button></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default PartsLubricantsPage;