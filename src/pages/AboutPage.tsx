import { motion } from "framer-motion";
import { Phone, MessageCircle, Shield, Users, Wallet, Wrench, MapPin, CheckCircle, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import heroJcb from "@/assets/hero-jcb.jpg";
import leylandTrucks from "@/assets/leyland-trucks.jpg";
import switchEvBus from "@/assets/switch-ev-bus.jpg";
import usedVehicles from "@/assets/used-vehicles.jpg";
import { useAdminSettings } from "@/context/AdminSettingsContext";

const AboutPage = () => {
  const { t } = useLanguage();

  const brands = [
    { name: "JCB", image: heroJcb, color: "jcb" },
    { name: "Ashok Leyland", image: leylandTrucks, color: "leyland" },
    { name: "Switch EV", image: switchEvBus, color: "ev" },
    { name: t("nav.certifiedRefurbished"), image: usedVehicles, color: "secondary" },
  ];

  const pillars = [
    { icon: Shield, title: t("about.pillar1Title"), desc: t("about.pillar1Desc") },
    { icon: Users, title: t("about.pillar2Title"), desc: t("about.pillar2Desc") },
    { icon: Wallet, title: t("about.pillar3Title"), desc: t("about.pillar3Desc") },
    { icon: Wrench, title: t("about.pillar4Title"), desc: t("about.pillar4Desc") },
  ];

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com", label: "Facebook", color: "hover:bg-jcb hover:text-jcb-foreground" },
    { icon: Instagram, url: "https://instagram.com", label: "Instagram", color: "hover:bg-jcb hover:text-jcb-foreground" },
    { icon: Youtube, url: "https://youtube.com", label: "YouTube", color: "hover:bg-leyland hover:text-leyland-foreground" },
    { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-ev hover:text-ev-foreground" },
  ];

   const { settings } = useAdminSettings();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-jcb/20 text-jcb rounded-full text-sm font-medium mb-6">
                <CheckCircle className="h-4 w-4" />
                {t("about.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{t("about.heroTitle")}</h1>
              <p className="text-lg text-primary-foreground/80">{t("about.heroSubtitle")}</p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-foreground mb-6">{t("about.storyTitle")}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{t("about.storyContent")}</p>
            </motion.div>
          </div>
        </section>

        {/* Brands */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">{t("about.brandsTitle")}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {brands.map((brand, i) => (
                <motion.div key={brand.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-card rounded-xl overflow-hidden shadow-lg">
                  <img src={brand.image} alt={brand.name} className="w-full h-32 object-cover" />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-foreground">{brand.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">{t("about.whyChooseTitle")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-card p-6 rounded-xl border border-border text-center">
                  <div className="w-12 h-12 bg-jcb/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="h-6 w-6 text-jcb" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Network */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <MapPin className="h-12 w-12 text-ev mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("about.networkTitle")}</h2>
            <p className="text-muted-foreground text-lg">{t("about.networkDesc")}</p>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("about.socialTitle")}</h2>
            <p className="text-muted-foreground mb-8">{t("about.socialDesc")}</p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-full bg-muted flex items-center justify-center transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">{t("about.ctaTitle")}</h2>
            <p className="text-primary-foreground/80 mb-8">{t("about.ctaDesc")}</p>
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

export default AboutPage;