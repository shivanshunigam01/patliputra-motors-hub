import api from "@/services/api";
import { getSeoCategory } from "@/seo/categories";
import { getDistrictBySlug } from "@/seo/districts";
import { getFaqsForCategory } from "@/seo/faqs";
import type { FaqItem } from "@/seo/faqs";

export type SeoLandingPageData = {
  category: string;
  districtSlug: string;
  districtName: string;
  path: string;
  title: string;
  titleHi: string;
  metaDescription: string;
  metaDescriptionHi: string;
  h1: string;
  h1Hi: string;
  introEn: string;
  introHi: string;
  bodyEn: string;
  bodyHi: string;
  keywords: string[];
  faqs: FaqItem[];
  ctaText: string;
  categoryMeta?: {
    slug: string;
    name: string;
    nameHi: string;
    hubPath: string;
    tagline: string;
    subcategories: { slug: string; name: string; nameHi: string }[];
  };
  relatedDistricts?: { slug: string; name: string; nameHi: string; path: string }[];
};

export function buildLocalFallback(category: string, district: string): SeoLandingPageData {
  const cat = getSeoCategory(category)!;
  const d = getDistrictBySlug(district)!;
  const faqs = getFaqsForCategory(category);

  return {
    category,
    districtSlug: d.slug,
    districtName: d.name,
    path: `/${category}/${d.slug}`,
    title: `${cat.name} in ${d.name}, Bihar | Dealer, Price & EMI | Patliputra`,
    titleHi: `${d.nameHi} mein ${cat.nameHi} – Price, EMI aur Service`,
    metaDescription: `${cat.name} dealer in ${d.name}, Bihar. Price, EMI finance, genuine parts aur service. Free quotation ke liye call karein.`,
    metaDescriptionHi: `${d.nameHi} mein ${cat.nameHi} ki price, EMI aur service. Patliputra authorized dealer.`,
    h1: `${cat.name} in ${d.name}`,
    h1Hi: `${d.nameHi} mein ${cat.nameHi}`,
    introEn: `Looking for ${cat.name} in ${d.name}? Patliputra provides ${cat.tagline.toLowerCase()}, easy finance, and local service support.`,
    introHi: `${d.nameHi} mein ${cat.nameHi} chahiye? Patliputra se price, EMI, demo aur service milta hai.`,
    bodyEn: `${d.name} contractors choose Patliputra for genuine ${cat.name}, transparent pricing, and Bihar-wide after-sales support near ${d.hq}.`,
    bodyHi: `${d.nameHi} ke contractors Patliputra se genuine ${cat.nameHi}, clear pricing aur local support lete hain.`,
    keywords: [
      `${cat.name} ${d.name}`,
      `${cat.name} in ${d.name}`,
      `${cat.name} dealer ${d.name}`,
      ...cat.primaryKeywords.slice(0, 5),
    ],
    faqs,
    ctaText: `${d.nameHi} se abhi call karein`,
    categoryMeta: {
      slug: cat.slug,
      name: cat.name,
      nameHi: cat.nameHi,
      hubPath: cat.hubPath,
      tagline: cat.tagline,
      subcategories: cat.subcategories,
    },
  };
}

export async function fetchSeoLandingPage(
  category: string,
  district: string
): Promise<SeoLandingPageData> {
  try {
    const res = await api.get(`/seo/pages/${category}/${district}`);
    return res.data.data as SeoLandingPageData;
  } catch {
    return buildLocalFallback(category, district);
  }
}
