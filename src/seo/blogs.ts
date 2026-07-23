export type BlogPost = {
  slug: string;
  title: string;
  titleHi: string;
  description: string;
  cluster: "jcb" | "ashok-leyland" | "switch" | "used" | "finance";
  datePublished: string;
  keywords: string[];
  intro: string;
  sections: { heading: string; body: string }[];
  faqs?: { question: string; answer: string }[];
  relatedPaths?: { name: string; path: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "jcb-se-mahine-mein-kitni-earning",
    title: "JCB se Mahine Mein Kitni Earning Ho Sakti Hai? Bihar Guide",
    titleHi: "JCB se mahine mein kitni earning ho sakti hai?",
    description:
      "Bihar mein JCB rental/contracting se realistic monthly earning, cost aur profit breakdown — Patliputra guide.",
    cluster: "jcb",
    datePublished: "2026-06-01",
    keywords: ["JCB earning Bihar", "JCB rental profit", "contractor JCB income"],
    intro:
      "Bihar ke contractors aksar poochte hain — JCB se mahine mein kitna kamaya ja sakta hai? Answer application, hours aur city demand par depend karta hai.",
    sections: [
      {
        heading: "Earning kis cheez par depend karti hai?",
        body: "Daily hire rate, diesel cost, operator salary, maintenance aur idle days. Patna, Muzaffarpur, Gaya jaise districts mein construction demand zyada hoti hai, isliye utilization better ho sakta hai.",
      },
      {
        heading: "Rough monthly picture",
        body: "Agar machine regularly chal rahi ho to gross hire income se diesel + operator + EMI nikaalne ke baad net profit banta hai. Exact number ke liye apna rate aur hours bataein — hum free estimate dete hain.",
      },
      {
        heading: "Profit badhane ke tips",
        body: "Sahi attachment, fuel-saving operator habits, timely service aur district-wise leads. EMI calculator se pehle finance plan clear karein.",
      },
    ],
    faqs: [
      {
        question: "Nayi JCB better hai ya used?",
        answer:
          "Budget aur work load dekhkar decide hota hai. Certified used machine se EMI load kam ho sakta hai.",
      },
    ],
    relatedPaths: [
      { name: "EMI Calculator", path: "/emi-calculator" },
      { name: "JCB Patna", path: "/jcb/patna" },
      { name: "Used JCB", path: "/used-vehicles" },
    ],
  },
  {
    slug: "bihar-mein-contractor-business-kaise-shuru-karein",
    title: "Bihar Mein Contractor Business Kaise Shuru Karein?",
    titleHi: "Bihar mein contractor business kaise shuru karein?",
    description:
      "First-time contractors ke liye Bihar guide: machine choice, finance, documents aur first projects.",
    cluster: "jcb",
    datePublished: "2026-06-02",
    keywords: ["contractor business Bihar", "JCB business start", "government contractor guide"],
    intro:
      "Naya contractor business start karna simple steps se possible hai — sahi machine, basic documents aur local network.",
    sections: [
      {
        heading: "Pehla step: application clear karo",
        body: "Road, brick kiln, pond digging ya sand — har kaam ke liye alag machine fit hoti hai. Backhoe loader general contracting ke liye popular hai.",
      },
      {
        heading: "Finance aur documents",
        body: "KYC, business proof aur down payment se loan process start hota hai. Patliputra finance partners ke through EMI options milte hain.",
      },
      {
        heading: "First projects kaise milein",
        body: "Local builders, brick kilns aur municipal works se start karein. District pages pe local presence se enquiry aati hai.",
      },
    ],
    relatedPaths: [
      { name: "JCB Hub", path: "/jcb" },
      { name: "Loan Guide", path: "/loan" },
      { name: "FAQ", path: "/faq" },
    ],
  },
  {
    slug: "road-contractor-ke-liye-best-jcb",
    title: "Road Contractor ke liye Best JCB Machine Bihar",
    titleHi: "Road contractor ke liye best machine",
    description: "Road work ke liye backhoe vs excavator vs compactor — Bihar contractors ke liye practical comparison.",
    cluster: "jcb",
    datePublished: "2026-06-03",
    keywords: ["JCB for road construction", "best JCB contractor", "compactor Bihar"],
    intro: "Road contracting mein digging, loading aur compaction alag-alag roles hain. Sahi mix se project speed badhti hai.",
    sections: [
      {
        heading: "Backhoe loader kab lein?",
        body: "Utility digging, loading aur versatile site work ke liye 3DX-type backhoe strong choice hai.",
      },
      {
        heading: "Excavator kab better hai?",
        body: "Deep excavation, canal aur heavy digging volumes ke liye excavator zyada productive hota hai.",
      },
      {
        heading: "Compactor ka role",
        body: "Sub-base compaction ke liye roller/compactor quality finish deta hai — often separate hire ya purchase.",
      },
    ],
    relatedPaths: [
      { name: "Backhoe Loader", path: "/jcb/backhoe-loader" },
      { name: "Excavator", path: "/jcb/excavator" },
      { name: "Compactor", path: "/jcb/compactor" },
    ],
  },
  {
    slug: "truck-business-kaise-shuru-karein-bihar",
    title: "Truck Business Kaise Shuru Karein Bihar – Ashok Leyland Guide",
    titleHi: "Truck business kaise shuru karein?",
    description:
      "Cement, sand, stone crusher aur milk logistics ke liye truck business start guide — finance, body aur routes.",
    cluster: "ashok-leyland",
    datePublished: "2026-06-05",
    keywords: ["Truck business Bihar", "Ashok Leyland finance", "tipper business"],
    intro:
      "Truck business Bihar mein strong opportunity hai — lekin sahi GVW, body type aur finance plan pehle fix karna zaroori hai.",
    sections: [
      {
        heading: "Business type choose karo",
        body: "Cement bags, sand tipper, stone crusher, agriculture ya milk — har use-case ka alag truck aur body hota hai.",
      },
      {
        heading: "Finance reality",
        body: "Down payment, EMI tenure aur running cost (diesel + tyre + driver) pehle calculate karein. EMI calculator se monthly load dekhein.",
      },
      {
        heading: "RTO aur insurance",
        body: "Registration, fitness aur insurance process Patliputra guidance se smooth hota hai.",
      },
    ],
    relatedPaths: [
      { name: "Ashok Leyland", path: "/ashok-leyland" },
      { name: "Tippers", path: "/ashok-leyland/tippers" },
      { name: "RTO Guide", path: "/rto" },
    ],
  },
  {
    slug: "sand-transport-ke-liye-kaunsa-tipper",
    title: "Sand Transport ke liye Kaunsa Tipper Lena Chahiye?",
    titleHi: "Sand business ke liye tipper guide",
    description: "Bihar sand routes ke liye tipper capacity, tyre config aur cost tips.",
    cluster: "ashok-leyland",
    datePublished: "2026-06-06",
    keywords: ["Tipper Price", "Truck for Sand", "sand tipper Bihar"],
    intro: "Sand business mein tipper selection galat hui to tyre aur fuel cost profit kha jati hai.",
    sections: [
      {
        heading: "Capacity vs route",
        body: "Short local trips aur long highway hauls ke liye load planning alag hoti hai. Overloading avoid karein.",
      },
      {
        heading: "Tyre aur maintenance",
        body: "Uneven roads par tyre life critical hai — budget mein tyre replacement cost rakhein.",
      },
    ],
    relatedPaths: [
      { name: "Tippers", path: "/ashok-leyland/tippers" },
      { name: "Ashok Leyland Patna", path: "/ashok-leyland/patna" },
    ],
  },
  {
    slug: "electric-bus-profitable-hai-bihar",
    title: "Electric Bus Profitable Hai? Diesel vs EV Comparison Bihar",
    titleHi: "Electric bus profitable hai?",
    description:
      "EV bus ROI, charging, subsidy aur total ownership cost — Switch Mobility Bihar perspective.",
    cluster: "switch",
    datePublished: "2026-06-08",
    keywords: ["Electric Bus", "EV Bus Bihar", "Diesel vs EV bus", "Fleet ROI"],
    intro:
      "Electric bus tab profitable hoti hai jab route utilization, energy cost aur charging plan clear ho.",
    sections: [
      {
        heading: "Diesel vs EV running cost",
        body: "Energy cost generally diesel se kam pad sakti hai, lekin battery life aur charger investment pehle model karna hota hai.",
      },
      {
        heading: "Charging infrastructure",
        body: "Depot charging plan + downtime management se fleet reliability aati hai.",
      },
      {
        heading: "Subsidy aur schemes",
        body: "Applicable government schemes time-to-time change hoti hain — current status ke liye call karein.",
      },
    ],
    relatedPaths: [
      { name: "Switch EV", path: "/switch-ev" },
      { name: "Electric Bus", path: "/switch/electric-bus" },
      { name: "Government Schemes", path: "/government-schemes" },
    ],
  },
  {
    slug: "certified-used-jcb-buying-guide",
    title: "Certified Used JCB Buying Guide Bihar – Inspection Checklist",
    titleHi: "Certified used machine buying guide",
    description:
      "Second hand JCB lene se pehle engine, hydraulics, hour meter aur RC transfer kaise check karein.",
    cluster: "used",
    datePublished: "2026-06-10",
    keywords: ["Used JCB Bihar", "Second Hand JCB", "hour meter check", "RC transfer"],
    intro:
      "Used JCB safe tab hai jab structured inspection ho. Certified machine paperwork aur condition clarity deti hai.",
    sections: [
      {
        heading: "Must-check list",
        body: "Hour meter authenticity, hydraulic leakage, boom play, engine smoke, undercarriage/tyres aur service history.",
      },
      {
        heading: "RC transfer",
        body: "Documents verify karke RTO transfer follow karein — guidance milti hai.",
      },
      {
        heading: "Loan on used machines",
        body: "Age aur condition ke basis par many financiers used equipment finance dete hain.",
      },
    ],
    relatedPaths: [
      { name: "Used Machines", path: "/used-vehicles" },
      { name: "Used JCB Patna", path: "/used-jcb/patna" },
      { name: "Loan", path: "/loan" },
    ],
  },
  {
    slug: "jcb-loan-bina-income-proof",
    title: "JCB Loan Bihar – Finance Kaise Milega? Documents Guide",
    titleHi: "JCB loan / finance kaise milega?",
    description:
      "JCB finance process, down payment, CIBIL aur documents — Bihar buyers ke liye simple Hinglish guide.",
    cluster: "finance",
    datePublished: "2026-06-12",
    keywords: ["JCB Finance", "JCB on EMI", "JCB loan without income proof", "Truck EMI"],
    intro:
      "EMI par machine lena common hai. Process clear ho to approval faster hota hai.",
    sections: [
      {
        heading: "Typical documents",
        body: "Aadhaar, PAN, bank statements, business proof / GST (agar ho), photos aur quotation.",
      },
      {
        heading: "Down payment",
        body: "Generally 10–30% se start. Profile strong ho to better terms mil sakte hain.",
      },
      {
        heading: "CIBIL ka role",
        body: "Score aur repayment history decision affect karti hai. Check CIBIL page se score dekh sakte ho.",
      },
    ],
    relatedPaths: [
      { name: "EMI Calculator", path: "/emi-calculator" },
      { name: "Loan Page", path: "/loan" },
      { name: "CIBIL Check", path: "/cibil-score" },
    ],
  },
  {
    slug: "machine-maintenance-checklist-bihar",
    title: "JCB Machine Maintenance Checklist – Fuel Saving Tips",
    titleHi: "Machine maintenance checklist",
    description: "Daily/weekly JCB maintenance checklist aur Bihar conditions mein fuel saving tips.",
    cluster: "jcb",
    datePublished: "2026-06-14",
    keywords: ["JCB maintenance cost", "JCB Fuel Consumption", "fuel saving tips"],
    intro: "Regular service se breakdown kam aur resale value better rehti hai.",
    sections: [
      {
        heading: "Daily checks",
        body: "Engine oil, coolant, hydraulic level, tyre pressure, leaks aur filters visual check.",
      },
      {
        heading: "Fuel saving",
        body: "Correct RPM, idle time kam, sharp attachments aur scheduled service.",
      },
    ],
    relatedPaths: [
      { name: "Service", path: "/service" },
      { name: "Spare Parts", path: "/spare-parts" },
    ],
  },
  {
    slug: "cement-transport-business-bihar",
    title: "Cement Transport Business Bihar – Truck Selection Guide",
    titleHi: "Cement transport business",
    description: "Cement logistics ke liye sahi truck, body aur running cost planning.",
    cluster: "ashok-leyland",
    datePublished: "2026-06-15",
    keywords: ["Truck for Cement", "cement transport Bihar", "Ashok Leyland Truck"],
    intro: "Cement transport mein reliable GVW aur cargo body se trip planning easy hoti hai.",
    sections: [
      {
        heading: "Truck choice",
        body: "Route length aur load pattern dekhkar LCV/ICV/HCV decide karein.",
      },
      {
        heading: "Cost control",
        body: "Mileage tips, tyre rotation aur driver management se margin improve hota hai.",
      },
    ],
    relatedPaths: [
      { name: "Trucks", path: "/ashok-leyland/trucks" },
      { name: "HCV", path: "/ashok-leyland/hcv" },
    ],
  },
];

export function getBlogPost(slug?: string) {
  if (!slug) return null;
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}

export function getBlogsByCluster(cluster: BlogPost["cluster"]) {
  return BLOG_POSTS.filter((p) => p.cluster === cluster);
}
