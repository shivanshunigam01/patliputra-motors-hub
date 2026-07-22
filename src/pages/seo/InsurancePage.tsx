import { SeoContentPage } from "@/components/seo/SeoContentPage";

export default function InsurancePage() {
  return (
    <SeoContentPage
      path="/insurance"
      title="Vehicle Insurance Bihar – Truck & JCB Cover"
      description="JCB aur commercial vehicle insurance Bihar. Premium estimate, IDV, comprehensive cover aur claim support guidance."
      h1="Insurance"
      intro="Truck aur construction equipment ke liye sahi insurance cover – premium estimate aur guidance."
      keywords={["Truck insurance Bihar", "JCB insurance", "Commercial vehicle insurance"]}
      sections={[
        {
          heading: "Comprehensive vs Third Party",
          body: "Third party legal minimum hai. Comprehensive cover own-damage + extras cover karta hai. Fleet owners generally comprehensive prefer karte hain.",
        },
        {
          heading: "Premium kis par depend karta hai?",
          body: "Vehicle value (IDV), age, location, claim history aur add-on covers premium decide karte hain.",
        },
      ]}
      faqs={[
        { question: "Insurance kitna aata hai?", answer: "IDV aur cover type par depend karta hai. Hum free estimate guide karte hain." },
      ]}
      relatedLinks={[
        { name: "Finance", path: "/finance" },
        { name: "RTO", path: "/rto" },
      ]}
    />
  );
}
