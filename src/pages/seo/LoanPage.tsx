import { SeoContentPage } from "@/components/seo/SeoContentPage";

export default function LoanPage() {
  return (
    <SeoContentPage
      path="/loan"
      title="JCB & Truck Loan Bihar – Finance kaise milega?"
      description="JCB loan aur truck finance Bihar mein kaise milta hai? Eligibility, documents, down payment aur approval process – puri jankari."
      h1="Vehicle Loan Bihar"
      intro="JCB Loan Bihar – Finance kaise milega? Puri jankari. Documents, eligibility aur EMI planning ek jagah."
      keywords={["JCB loan Bihar", "Truck finance", "Vehicle loan without stress", "EMI loan Bihar"]}
      ctaLabel="Loan Enquiry Karein"
      howTo={{
        name: "Bihar mein vehicle loan kaise lein",
        description: "JCB ya truck finance ke simple steps",
        steps: [
          "Machine/vehicle select karein",
          "KYC aur basic documents share karein",
          "EMI aur down payment finalize karein",
          "Approval ke baad delivery schedule karein",
        ],
      }}
      sections={[
        {
          heading: "Kaun apply kar sakta hai?",
          body: "Contractors, transporters, fleet owners aur businessmen loan ke liye apply kar sakte hain. CIBIL, income/business proof aur KYC important hote hain.",
        },
        {
          heading: "Documents checklist",
          body: "Aadhaar, PAN, address proof, bank statements, business proof (agar applicable) aur passport photo generally chahiye. Used machine par RC/invoice bhi lag sakta hai.",
        },
        {
          heading: "Approval timeline",
          body: "Documents complete hone par aksar kuch dinon mein decision aa jata hai. Fast-track cases mein process aur jaldi ho sakta hai.",
        },
      ]}
      faqs={[
        { question: "JCB loan without income proof mil sakta hai?", answer: "Kuch cases mein alternate proofs (banking, business cashflow) se evaluate hota hai. Exact eligibility case-by-case hoti hai." },
        { question: "Down payment kitna lagega?", answer: "Generally 10–30% se start hota hai — product aur financier policy par depend." },
      ]}
      relatedLinks={[
        { name: "EMI Calculator", path: "/emi-calculator" },
        { name: "Finance Page", path: "/finance" },
        { name: "CIBIL Check", path: "/cibil-score" },
      ]}
    />
  );
}
