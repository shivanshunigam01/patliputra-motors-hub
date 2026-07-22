import { SeoContentPage } from "@/components/seo/SeoContentPage";

export default function RtoPage() {
  return (
    <SeoContentPage
      path="/rto"
      title="RTO Registration Bihar – Commercial Vehicle Guide"
      description="RTO registration, RC transfer, fitness certificate – Bihar commercial vehicles ke liye simple process guide."
      h1="RTO Support"
      intro="Registration, RC transfer aur fitness – Bihar RTO process ki practical jankari."
      keywords={["RTO Bihar", "RC transfer", "Fitness certificate truck", "Vehicle registration Patna"]}
      howTo={{
        name: "RC transfer kaise karein",
        description: "Used vehicle RC transfer ke basic steps",
        steps: [
          "Seller-buyer documents verify karein",
          "Form aur fees prepare karein",
          "RTO submission karein",
          "Updated RC receive karein",
        ],
      }}
      sections={[
        {
          heading: "Nayi gadi registration",
          body: "Invoice, insurance, Form 20/21 type documents aur RTO fees ke saath registration process complete hota hai. Dealer support se paperwork smooth rehti hai.",
        },
        {
          heading: "Fitness certificate",
          body: "Commercial vehicles ke liye fitness validity ke andar renew karwana zaroori hai. Late renew par penalty lag sakti hai.",
        },
      ]}
      faqs={[
        { question: "RTO registration mein kitna time lagta hai?", answer: "Documents ready hone par generally kuch dinon se kuch hafte tak." },
        { question: "RC transfer kaise hoga?", answer: "Both parties ke documents ke saath RTO process follow hota hai; hum guidance dete hain." },
      ]}
      relatedLinks={[
        { name: "Used Machines", path: "/used-vehicles" },
        { name: "Insurance", path: "/insurance" },
      ]}
    />
  );
}
