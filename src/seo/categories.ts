export type SeoSubcategory = { slug: string; name: string; nameHi: string };

export type SeoCategory = {
  slug: "jcb" | "ashok-leyland" | "switch" | "used-jcb";
  brand: string;
  name: string;
  nameHi: string;
  hubPath: string;
  accentClass: string;
  bgClass: string;
  tagline: string;
  taglineHi: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
  subcategories: SeoSubcategory[];
};

export const SEO_CATEGORIES: Record<string, SeoCategory> = {
  jcb: {
    slug: "jcb",
    brand: "JCB",
    name: "JCB",
    nameHi: "जेसीबी",
    hubPath: "/jcb",
    accentClass: "text-jcb",
    bgClass: "bg-jcb text-jcb-foreground",
    tagline: "Construction Equipment",
    taglineHi: "निर्माण मशीनरी",
    primaryKeywords: [
      "JCB Price Bihar",
      "JCB Dealer Bihar",
      "JCB Machine",
      "JCB Excavator",
      "Backhoe Loader",
      "JCB 3DX",
      "JCB on EMI",
      "JCB Finance",
      "JCB Service",
      "Used JCB",
    ],
    secondaryKeywords: [
      "JCB for Road Construction",
      "JCB for Brick Kiln",
      "JCB for Sand Mining",
      "JCB for Pond Digging",
      "JCB Rental",
      "JCB Attachment",
      "Hydraulic Breaker",
      "Bucket Capacity",
      "JCB Fuel Consumption",
    ],
    longTailKeywords: [
      "Best JCB for contractor",
      "Which JCB is best for Bihar",
      "JCB loan without income proof",
      "JCB subsidy",
      "JCB resale value",
      "JCB maintenance cost",
      "JCB spare parts Bihar",
    ],
    subcategories: [
      { slug: "backhoe-loader", name: "Backhoe Loader", nameHi: "बैकहो लोडर" },
      { slug: "excavator", name: "Excavator", nameHi: "एक्सकेवेटर" },
      { slug: "telehandler", name: "Telehandler", nameHi: "टेलीहैंडलर" },
      { slug: "skid-steer", name: "Skid Steer", nameHi: "स्किड स्टियर" },
      { slug: "compactor", name: "Compactor", nameHi: "कॉम्पेक्टर" },
      { slug: "wheel-loader", name: "Wheel Loader", nameHi: "व्हील लोडर" },
    ],
  },
  "ashok-leyland": {
    slug: "ashok-leyland",
    brand: "Ashok Leyland",
    name: "Ashok Leyland",
    nameHi: "अशोक लेलैंड",
    hubPath: "/ashok-leyland",
    accentClass: "text-leyland",
    bgClass: "bg-leyland text-leyland-foreground",
    tagline: "Trucks & Commercial Vehicles",
    taglineHi: "ट्रक और कमर्शियल वाहन",
    primaryKeywords: [
      "Ashok Leyland Truck",
      "Ashok Leyland Bihar",
      "Ashok Leyland Dealer",
      "Ashok Leyland Price",
      "Truck Finance",
      "Truck EMI",
    ],
    secondaryKeywords: [
      "10 Tyre Truck",
      "Tipper Price",
      "Cargo Truck",
      "Goods Carrier",
      "School Bus",
      "Staff Bus",
    ],
    longTailKeywords: [
      "Truck for Sand",
      "Truck for Stone Crusher",
      "Truck for Cement",
      "Truck for Agriculture",
      "Truck for Milk Transport",
    ],
    subcategories: [
      { slug: "trucks", name: "Trucks", nameHi: "ट्रक" },
      { slug: "tippers", name: "Tippers", nameHi: "टिपर" },
      { slug: "buses", name: "Buses", nameHi: "बस" },
      { slug: "lcv", name: "LCV", nameHi: "एलसीवी" },
      { slug: "icv", name: "ICV", nameHi: "आईसीवी" },
      { slug: "hcv", name: "HCV", nameHi: "एचसीवी" },
    ],
  },
  switch: {
    slug: "switch",
    brand: "Switch Mobility",
    name: "Switch Mobility",
    nameHi: "स्विच मोबिलिटी",
    hubPath: "/switch-ev",
    accentClass: "text-ev",
    bgClass: "bg-ev text-ev-foreground",
    tagline: "Electric Commercial Vehicles",
    taglineHi: "इलेक्ट्रिक कमर्शियल वाहन",
    primaryKeywords: [
      "Electric Bus",
      "EV Bus Bihar",
      "Electric Commercial Vehicle",
      "Electric Fleet",
      "Electric LCV",
    ],
    secondaryKeywords: [
      "Electric Bus Price",
      "Electric Bus Charging",
      "EV Bus Range",
      "EV Fleet",
    ],
    longTailKeywords: [
      "Electric bus profitable hai",
      "Diesel vs EV bus comparison",
      "EV fleet ROI Bihar",
    ],
    subcategories: [
      { slug: "electric-bus", name: "Electric Bus", nameHi: "इलेक्ट्रिक बस" },
      { slug: "electric-lcv", name: "Electric LCV", nameHi: "इलेक्ट्रिक एलसीवी" },
    ],
  },
  "used-jcb": {
    slug: "used-jcb",
    brand: "Used Machines",
    name: "Used JCB & Equipment",
    nameHi: "यूज़्ड जेसीबी और मशीनें",
    hubPath: "/used-vehicles",
    accentClass: "text-jcb",
    bgClass: "bg-jcb text-jcb-foreground",
    tagline: "Certified Pre-owned Machines",
    taglineHi: "सर्टिफाइड प्री-ओन्ड मशीनें",
    primaryKeywords: [
      "Used JCB Bihar",
      "Second Hand JCB",
      "Used Excavator",
      "Used Tipper",
      "Used Truck",
      "Certified Used Machine",
    ],
    secondaryKeywords: [
      "Pre-owned Construction Equipment",
      "Used JCB Patna",
      "Second hand excavator Bihar",
    ],
    longTailKeywords: [
      "Certified used machine buying guide",
      "Loan for used equipment",
      "RC transfer process Bihar",
    ],
    subcategories: [],
  },
};

export const SEO_CATEGORY_SLUGS = Object.keys(SEO_CATEGORIES);

export function getSeoCategory(slug?: string) {
  if (!slug) return null;
  return SEO_CATEGORIES[slug] || null;
}

export function getSubcategory(categorySlug: string, subSlug?: string) {
  const cat = getSeoCategory(categorySlug);
  if (!cat || !subSlug) return null;
  return cat.subcategories.find((s) => s.slug === subSlug) || null;
}
