import { FAQAccordion } from "@/components/seo/FAQAccordion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import { Link } from "react-router-dom";
import { SEO_FAQS } from "@/seo/faqs";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="FAQ – JCB, Truck Finance, Used Machines Bihar"
        description="JCB ki price, EMI, truck finance, RC transfer aur used machine ke sawalon ke simple Hinglish answers. Bihar buyers ke liye."
        path="/faq"
        keywords={["JCB FAQ Bihar", "Truck finance FAQ", "Used JCB questions"]}
      />
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <BreadcrumbNav
              className="mb-6 text-primary-foreground/70 [&_a]:text-primary-foreground/80 [&_span]:text-primary-foreground"
              items={[{ name: "FAQ" }]}
            />
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">FAQ – Seedha Jawab</h1>
            <p className="text-lg text-primary-foreground/85">
              Bihar ke first-time buyers ke liye simple Hinglish mein common questions.
            </p>
          </div>
        </section>

        <section className="py-12 space-y-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { name: "JCB", path: "/jcb" },
                { name: "Ashok Leyland", path: "/ashok-leyland" },
                { name: "Switch EV", path: "/switch-ev" },
                { name: "Used Machines", path: "/used-vehicles" },
                { name: "Finance", path: "/finance" },
              ].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="px-3 py-1.5 rounded-full text-sm border border-border bg-card hover:border-primary/40"
                >
                  {l.name}
                </Link>
              ))}
            </div>

            <FAQAccordion faqs={SEO_FAQS.jcb} title="JCB FAQ" className="mb-12" />
            <FAQAccordion faqs={SEO_FAQS["ashok-leyland"]} title="Ashok Leyland FAQ" className="mb-12" />
            <FAQAccordion faqs={SEO_FAQS.switch} title="Switch Mobility FAQ" className="mb-12" />
            <FAQAccordion faqs={SEO_FAQS["used-jcb"]} title="Used Machines FAQ" />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
