import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import { FAQAccordion } from "@/components/seo/FAQAccordion";
import { DistrictGrid } from "@/components/seo/DistrictGrid";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useSeoRouteParams } from "@/hooks/useSeoRouteParams";
import { getSeoCategory, getSubcategory } from "@/seo/categories";
import { getFaqsForCategory } from "@/seo/faqs";
import { webPageSchema } from "@/seo/schema";
import NotFound from "@/pages/NotFound";

type Props = { categorySlug?: string };

export default function CategorySegmentPage({ categorySlug }: Props) {
  const { category, district: segment } = useSeoRouteParams(categorySlug);
  const { language } = useLanguage();
  const { settings } = useAdminSettings();

  const cat = getSeoCategory(category);
  const sub = cat && segment ? getSubcategory(cat.slug, segment) : null;

  if (!cat || !sub) return <NotFound />;

  const path = `/${cat.slug}/${sub.slug}`;
  const title =
    language === "hi"
      ? `${sub.nameHi} Bihar – ${cat.nameHi} Price, EMI aur Dealer`
      : `${sub.name} Bihar | ${cat.name} Price, EMI & Dealer`;
  const description =
    language === "hi"
      ? `Bihar mein ${sub.nameHi} chahiye? Patliputra se ${cat.nameHi} ${sub.nameHi} ki price, finance aur service support milta hai.`
      : `Buy ${sub.name} in Bihar from Patliputra. Get price, EMI finance, and authorized ${cat.name} support.`;

  const phone = settings?.primary_phone || "9031053514";
  const faqs = getFaqsForCategory(cat.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={title}
        description={description}
        path={path}
        keywords={[sub.name, `${sub.name} Bihar`, ...cat.primaryKeywords.slice(0, 5)]}
      />
      <JsonLd data={webPageSchema({ title, description, path })} />

      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <BreadcrumbNav
              className="mb-6 text-primary-foreground/70 [&_a]:text-primary-foreground/80 [&_span]:text-primary-foreground"
              items={[
                { name: cat.name, path: cat.hubPath },
                { name: sub.name },
              ]}
            />
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                {language === "hi" ? sub.nameHi : sub.name}
              </h1>
              <p className="text-lg text-primary-foreground/85 mb-8">
                {language === "hi"
                  ? `Bihar ke contractors ke liye ${cat.nameHi} ${sub.nameHi} – price, EMI aur service ek jagah.`
                  : `${cat.name} ${sub.name} for Bihar contractors — price, EMI and service in one place.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`tel:+91${phone}`}>
                  <Button size="lg" className={`gap-2 ${cat.bgClass}`}>
                    <Phone className="h-5 w-5" /> Price ke liye Call Karein
                  </Button>
                </a>
                <a
                  href={getWhatsAppUrl(settings?.whatsapp_number || phone, `${sub.name} Bihar`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary-foreground/30 text-primary-foreground"
                  >
                    <MessageCircle className="h-5 w-5" /> WhatsApp
                  </Button>
                </a>
                <Link to={cat.hubPath}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary-foreground/30 text-primary-foreground"
                  >
                    View all {cat.name} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-muted-foreground leading-relaxed mb-8">
              {language === "hi"
                ? `${sub.nameHi} select karte waqt application, budget aur finance options dekhna zaroori hai. Patliputra aapko model comparison, EMI planning aur delivery support deta hai.`
                : `Choosing the right ${sub.name} depends on application, budget and finance. Patliputra helps with model comparison, EMI planning and delivery support across Bihar.`}
            </p>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <DistrictGrid categorySlug={cat.slug} title={`${sub.name} – district-wise pages`} limit={18} />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
