import { ORGANIZATION, SITE_NAME, SITE_URL } from "./siteConfig";
import type { FaqItem } from "./faqs";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    telephone: ORGANIZATION.phone,
    email: ORGANIZATION.email,
    sameAs: ORGANIZATION.sameAs,
    address: {
      "@type": "PostalAddress",
      ...ORGANIZATION.address,
    },
    areaServed: ORGANIZATION.areaServed,
  };
}

export function localBusinessSchema(opts?: {
  ratingValue?: number;
  reviewCount?: number;
}) {
  const ratingValue = opts?.ratingValue ?? 4.8;
  const reviewCount = opts?.reviewCount ?? 120;

  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: ORGANIZATION.name,
    description: "Authorized dealer for JCB, Ashok Leyland, and Switch Mobility in Bihar",
    url: SITE_URL,
    telephone: ORGANIZATION.phone,
    email: ORGANIZATION.email,
    priceRange: ORGANIZATION.priceRange,
    openingHours: ORGANIZATION.openingHours,
    address: {
      "@type": "PostalAddress",
      ...ORGANIZATION.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.5941,
      longitude: 85.1376,
    },
    areaServed: {
      "@type": "State",
      name: "Bihar",
    },
    sameAs: ORGANIZATION.sameAs,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function productSchema(product: {
  name: string;
  description?: string;
  image?: string | string[];
  brand?: string;
  sku?: string;
  price?: number | string;
  url?: string;
}) {
  const images = Array.isArray(product.image)
    ? product.image
    : product.image
      ? [product.image]
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: images,
    sku: product.sku,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : undefined,
    offers: product.price
      ? {
          "@type": "Offer",
          url: product.url || SITE_URL,
          priceCurrency: "INR",
          price: String(product.price).replace(/[^\d.]/g, "") || undefined,
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: SITE_NAME },
        }
      : {
          "@type": "Offer",
          url: product.url || SITE_URL,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: SITE_NAME },
        },
  };
}

export function webPageSchema(opts: {
  title: string;
  description: string;
  path: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type || "WebPage",
    name: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: ["hi-IN", "en-IN"],
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  steps: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

export function reviewSchema(opts: {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: opts.ratingValue,
      reviewCount: opts.reviewCount,
      bestRating: opts.bestRating ?? 5,
      worstRating: 1,
    },
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    image: opts.image || `${SITE_URL}/favicon.ico`,
    keywords: opts.keywords?.join(", "),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${opts.path}`,
    },
    inLanguage: ["hi-IN", "en-IN"],
  };
}

export function videoSchema(opts: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: opts.name,
    description: opts.description,
    thumbnailUrl: opts.thumbnailUrl,
    uploadDate: opts.uploadDate,
    contentUrl: opts.contentUrl,
    embedUrl: opts.embedUrl,
    duration: opts.duration,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION.logo,
      },
    },
  };
}
