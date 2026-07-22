import { Link } from "react-router-dom";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import { FAQAccordion } from "@/components/seo/FAQAccordion";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { webPageSchema, howToSchema } from "@/seo/schema";
import type { FaqItem } from "@/seo/faqs";

export type SeoContentPageProps = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs?: FaqItem[];
  keywords?: string[];
  howTo?: { name: string; description: string; steps: string[] };
  ctaLabel?: string;
  relatedLinks?: { name: string; path: string }[];
};

export function SeoContentPage({
  path,
  title,
  description,
  h1,
  intro,
  sections,
  faqs = [],
  keywords = [],
  howTo,
  ctaLabel = "Abhi Call Karein",
  relatedLinks = [],
}: SeoContentPageProps) {
  const { settings } = useAdminSettings();
  const phone = settings?.primary_phone || "9031053514";

  const schemas: Record<string, unknown>[] = [
    webPageSchema({ title, description, path }),
  ];
  if (howTo) schemas.push(howToSchema(howTo));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={title} description={description} path={path} keywords={keywords} />
      <JsonLd data={schemas} />
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <BreadcrumbNav
              className="mb-6 text-primary-foreground/70 [&_a]:text-primary-foreground/80 [&_span]:text-primary-foreground"
              items={[{ name: h1 }]}
            />
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">{h1}</h1>
            <p className="text-lg text-primary-foreground/85 mb-8">{intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:+91${phone}`}>
                <Button size="lg" className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90">
                  <Phone className="h-5 w-5" /> {ctaLabel}
                </Button>
              </a>
              <a
                href={getWhatsAppUrl(settings?.whatsapp_number || phone, h1)}
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
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-3xl space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-2xl font-bold text-foreground mb-3">{s.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}

            {relatedLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {relatedLinks.map((l) => (
                  <Link
                    key={l.path}
                    to={l.path}
                    className="inline-flex items-center gap-1 text-sm px-3 py-2 rounded-full border border-border hover:border-primary/40"
                  >
                    {l.name} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            )}

            {faqs.length > 0 && <FAQAccordion faqs={faqs} className="pt-4" />}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
