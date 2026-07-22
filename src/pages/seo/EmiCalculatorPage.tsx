import { SeoContentPage } from "@/components/seo/SeoContentPage";
import { EMICalculator } from "@/components/EMICalculator";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/seo/SEOHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import { FAQAccordion } from "@/components/seo/FAQAccordion";
import { webPageSchema } from "@/seo/schema";

const faqs = [
  { question: "EMI kaise calculate hoti hai?", answer: "Loan amount (price − down payment), interest rate aur tenure se monthly EMI nikalte hain." },
  { question: "Down payment kitna rakhna chahiye?", answer: "Higher down payment se EMI aur interest dono kam ho sakte hain. 10–30% common range hai." },
  { question: "JCB aur truck dono par EMI milti hai?", answer: "Haan — JCB machines aur Ashok Leyland trucks dono ke liye finance partners available hain." },
];

export default function EmiCalculatorPage() {
  const title = "EMI Calculator Bihar – JCB & Truck Finance";
  const description =
    "JCB aur truck ki EMI turant calculate karein. Down payment, tenure aur interest set karke monthly EMI dekhein – Patliputra Finance.";
  const path = "/emi-calculator";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={title}
        description={description}
        path={path}
        keywords={["EMI Calculator", "JCB EMI", "Truck EMI Bihar", "Vehicle finance calculator"]}
      />
      <JsonLd data={webPageSchema({ title, description, path })} />
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-10">
          <div className="container mx-auto px-4">
            <BreadcrumbNav
              className="mb-4 text-primary-foreground/70 [&_a]:text-primary-foreground/80 [&_span]:text-primary-foreground"
              items={[{ name: "EMI Calculator" }]}
            />
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">EMI Calculator</h1>
            <p className="text-primary-foreground/85 max-w-2xl">
              JCB Loan Bihar – EMI kitni banegi? Price aur down payment daal kar turant dekhein.
            </p>
          </div>
        </section>
        <section className="py-10">
          <div className="container mx-auto px-4">
            <EMICalculator />
            <div className="max-w-3xl mx-auto mt-12">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
