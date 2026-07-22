import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL } from "@/seo/siteConfig";

type SEOHeadProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: string;
  noindex?: boolean;
  lang?: string;
};

export function SEOHead({
  title,
  description,
  path,
  keywords = [],
  image = `${SITE_URL}/og-default.png`,
  type = "website",
  noindex = false,
  lang = "hi",
}: SEOHeadProps) {
  const canonical = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="hi_IN" />
      <meta property="og:locale:alternate" content="en_IN" />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
