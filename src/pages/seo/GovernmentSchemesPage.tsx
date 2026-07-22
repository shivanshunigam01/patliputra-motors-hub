import { SeoContentPage } from "@/components/seo/SeoContentPage";

export default function GovernmentSchemesPage() {
  return (
    <SeoContentPage
      path="/government-schemes"
      title="Government Schemes Bihar – Subsidy & EV Benefits"
      description="Bihar / central schemes for contractors, MSME finance aur EV subsidy. JCB subsidy aur electric bus benefits ki practical overview."
      h1="Government Schemes"
      intro="Subsidy, MSME support aur EV benefits – current schemes ki practical overview (eligibility time-to-time change hoti hai)."
      keywords={["JCB subsidy", "EV subsidy Bihar", "Government scheme contractor", "MSME vehicle finance"]}
      sections={[
        {
          heading: "Contractor / MSME related support",
          body: "Kuch schemes collateral-light finance, interest subsidy ya capital support se related hoti hain. Exact eligibility documents ke saath verify karni chahiye.",
        },
        {
          heading: "Electric vehicle benefits",
          body: "EV bus / electric commercial vehicles par central/state incentives available ho sakte hain. Hum current applicable benefits check karke guide karte hain.",
        },
      ]}
      faqs={[
        { question: "JCB subsidy milti hai?", answer: "Scheme availability aur eligibility change hoti rehti hai. Current status ke liye team se confirm karein." },
        { question: "EV bus par subsidy kitni hai?", answer: "Model, buyer type aur active policy par depend karti hai." },
      ]}
      relatedLinks={[
        { name: "Switch EV", path: "/switch-ev" },
        { name: "Loan", path: "/loan" },
        { name: "Finance", path: "/finance" },
      ]}
    />
  );
}
