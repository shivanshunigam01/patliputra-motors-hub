import { motion } from "framer-motion";
import { Phone, MessageCircle, Shield, Wrench, Clock, CheckCircle, Settings, Truck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAdminSettings } from "@/context/AdminSettingsContext";

const ServiceWarrantyPage = () => {
  const { t } = useLanguage();

  const warrantyBenefits = [
    t("serviceWarranty.warranty1"),
    t("serviceWarranty.warranty2"),
    t("serviceWarranty.warranty3"),
    t("serviceWarranty.warranty4"),
    t("serviceWarranty.warranty5"),
  ];

  const amcPackages = [
    { title: t("serviceWarranty.amcBasic"), desc: t("serviceWarranty.amcBasicDesc"), icon: Settings, color: "jcb" },
    { title: t("serviceWarranty.amcPremium"), desc: t("serviceWarranty.amcPremiumDesc"), icon: Wrench, color: "leyland" },
    { title: t("serviceWarranty.amcFleet"), desc: t("serviceWarranty.amcFleetDesc"), icon: Truck, color: "ev" },
  ];
 const { settings } = useAdminSettings();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ev/20 text-ev rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                {t("serviceWarranty.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("serviceWarranty.heroTitle")}</h1>
              <p className="text-lg text-primary-foreground/80">{t("serviceWarranty.heroSubtitle")}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">{t("serviceWarranty.promiseTitle")}</h2>
            <p className="text-muted-foreground text-lg">{t("serviceWarranty.promiseDesc")}</p>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">{t("serviceWarranty.warrantyTitle")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {warrantyBenefits.map((benefit, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="flex items-center gap-3 bg-card p-4 rounded-xl border border-border">
                  <CheckCircle className="h-5 w-5 text-ev flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">{t("serviceWarranty.amcTitle")}</h2>
            <p className="text-muted-foreground text-center mb-10">{t("serviceWarranty.amcDesc")}</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {amcPackages.map((pkg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className={`bg-card p-6 rounded-xl border border-border text-center card-${pkg.color}`}>
                  <div className={`w-12 h-12 bg-${pkg.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <pkg.icon className={`h-6 w-6 text-${pkg.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">{t("serviceWarranty.ctaTitle")}</h2>
            <p className="text-primary-foreground/80 mb-8">{t("serviceWarranty.ctaDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:+91${settings?.primary_phone}`}><Button size="lg" className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb-hover"><Phone className="h-5 w-5" />{t("common.callNow")}</Button></a>
              <a href={`https://wa.me/91${settings?.whatsapp_number}`} target="_blank" rel="noopener noreferrer"><Button size="lg" className="gap-2 bg-success text-success-foreground hover:bg-success/90"><MessageCircle className="h-5 w-5" />{t("common.whatsapp")}</Button></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default ServiceWarrantyPage;