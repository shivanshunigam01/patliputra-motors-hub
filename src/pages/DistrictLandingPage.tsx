import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Calculator,
  MapPin,
  CheckCircle,
  ArrowRight,
  Shield,
  Wrench,
} from "lucide-react";
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
import { getSeoCategory } from "@/seo/categories";
import { getDistrictBySlug, isDistrictSlug } from "@/seo/districts";
import { localBusinessSchema, webPageSchema, howToSchema } from "@/seo/schema";
import {
  buildLocalFallback,
  fetchSeoLandingPage,
  type SeoLandingPageData,
} from "@/services/seo.service";
import NotFound from "@/pages/NotFound";
import CategorySegmentPage from "@/pages/CategorySegmentPage";

type Props = { categorySlug?: string };

export default function DistrictLandingPage({ categorySlug }: Props) {
  const { category, district } = useSeoRouteParams(categorySlug);
  const { language } = useLanguage();
  const { settings } = useAdminSettings();

  const cat = getSeoCategory(category);
  const isDistrict = isDistrictSlug(district);

  const [page, setPage] = useState<SeoLandingPageData | null>(() => {
    if (category && district && getSeoCategory(category) && isDistrictSlug(district)) {
      return buildLocalFallback(category, district);
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category || !district || !getSeoCategory(category) || !isDistrictSlug(district)) {
      setPage(null);
      setLoading(false);
      return;
    }

    // Instant local content, then enrich from API if available
    setPage(buildLocalFallback(category, district));
    setLoading(true);

    let cancelled = false;
    fetchSeoLandingPage(category, district).then((data) => {
      if (!cancelled) {
        setPage(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [category, district]);

  // Subcategory route: /jcb/backhoe-loader (not a district)
  if (cat && district && !isDistrict) {
    return <CategorySegmentPage categorySlug={cat.slug} />;
  }

  if (!cat || !district || !getDistrictBySlug(district)) {
    return <NotFound />;
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center text-muted-foreground">
          {loading ? "Loading…" : "Page not found"}
        </div>
        <Footer />
      </div>
    );
  }

  const d = getDistrictBySlug(district)!;
  const title = language === "hi" && page.titleHi ? page.titleHi : page.title;
  const description =
    language === "hi" && page.metaDescriptionHi ? page.metaDescriptionHi : page.metaDescription;
  const h1 = language === "hi" && page.h1Hi ? page.h1Hi : page.h1;
  const intro = language === "hi" && page.introHi ? page.introHi : page.introEn;
  const body = language === "hi" && page.bodyHi ? page.bodyHi : page.bodyEn;
  const phone = settings?.primary_phone || "9031053514";
  const wa = settings?.whatsapp_number || phone;

  const benefits =
    language === "hi"
      ? [
          "Authorized dealer support",
          "EMI / finance assistance",
          "Genuine parts & service",
          `${d.nameHi} ke liye local guidance`,
        ]
      : [
          "Authorized dealer support",
          "EMI / finance assistance",
          "Genuine parts & service",
          `Local guidance for ${d.name}`,
        ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={title}
        description={description}
        path={page.path}
        keywords={page.keywords}
      />
      <JsonLd
        data={[
          localBusinessSchema(),
          webPageSchema({ title, description, path: page.path }),
          howToSchema({
            name: `${cat.name} enquiry process in ${d.name}`,
            description: `How to get ${cat.name} price and finance in ${d.name}, Bihar`,
            steps: [
              "Apni requirement bataein (model / application)",
              "Price aur EMI estimate lein",
              "Documents submit karein",
              "Delivery aur service schedule finalize karein",
            ],
          }),
        ]}
      />

      <Navbar />

      <main className="pt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary text-primary-foreground">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
          <div className="container mx-auto px-4 py-12 lg:py-16 relative">
            <BreadcrumbNav
              className="mb-6 text-primary-foreground/70 [&_a]:text-primary-foreground/80 [&_span]:text-primary-foreground"
              items={[
                { name: cat.name, path: cat.hubPath },
                { name: d.name },
              ]}
            />

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 text-sm mb-4">
                <MapPin className="h-4 w-4" />
                {d.name}, Bihar · HQ {d.hq}
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">{h1}</h1>
              <p className="text-lg text-primary-foreground/85 mb-8 leading-relaxed">{intro}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`tel:+91${phone}`}>
                  <Button size="lg" className={`gap-2 font-semibold ${cat.bgClass}`}>
                    <Phone className="h-5 w-5" />
                    {page.ctaText || "Abhi Call Karein"}
                  </Button>
                </a>
                <a
                  href={getWhatsAppUrl(wa, `${cat.name} in ${d.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Enquiry
                  </Button>
                </a>
                <Link to="/emi-calculator">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Calculator className="h-5 w-5" />
                    EMI Calculator
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {language === "hi"
                  ? `${d.nameHi} ke liye kyun Patliputra?`
                  : `Why Patliputra for ${d.name}?`}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">{body}</p>

              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${cat.accentClass}`} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {cat.subcategories.length > 0 && (
                <div className="pt-4">
                  <h3 className="font-semibold mb-3 text-foreground">Popular categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        to={`/${cat.slug}/${sub.slug}`}
                        className="px-3 py-1.5 rounded-full text-sm border border-border bg-card hover:border-primary/40 transition-colors"
                      >
                        {language === "hi" ? sub.nameHi : sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to={cat.hubPath} className="flex items-center justify-between text-sm hover:text-primary">
                    <span>Full {cat.name} range</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/finance" className="flex items-center justify-between text-sm hover:text-primary">
                    <span>Finance / Loan</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/service" className="flex items-center justify-between text-sm hover:text-primary">
                    <span className="inline-flex items-center gap-2">
                      <Wrench className="h-4 w-4" /> Service
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/insurance" className="flex items-center justify-between text-sm hover:text-primary">
                    <span className="inline-flex items-center gap-2">
                      <Shield className="h-4 w-4" /> Insurance
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/50 p-6">
                <p className="text-sm text-muted-foreground mb-2">AEO answer</p>
                <p className="font-medium text-foreground">
                  {cat.name} {d.name} mein available hai — price, EMI aur service ke liye Patliputra ko call karein.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="pb-12 lg:pb-16">
          <div className="container mx-auto px-4">
            <FAQAccordion faqs={page.faqs || []} />
          </div>
        </section>

        <DistrictGrid
          categorySlug={cat.slug}
          highlightSlug={d.slug}
          title={`${cat.name} – Bihar ke 38 districts`}
        />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
