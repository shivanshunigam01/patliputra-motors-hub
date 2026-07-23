/**
 * Generates public/sitemap.xml with all SEO architecture URLs
 * including 38 districts × 4 categories = 152 hyperlocal pages.
 *
 * Run: node scripts/generate-sitemap.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.VITE_SITE_URL || "https://patliputraautos.com";

const DISTRICTS = [
  "araria","arwal","aurangabad","banka","begusarai","bhagalpur","bhojpur","buxar",
  "darbhanga","east-champaran","gaya","gopalganj","jamui","jehanabad","kaimur",
  "katihar","khagaria","kishanganj","lakhisarai","madhepura","madhubani","munger",
  "muzaffarpur","nalanda","nawada","patna","purnea","rohtas","saharsa","samastipur",
  "saran","sheikhpura","sheohar","sitamarhi","siwan","supaul","vaishali","west-champaran",
];

const CATEGORIES = ["jcb", "ashok-leyland", "switch", "used-jcb"];

const SUBS = {
  jcb: ["backhoe-loader","excavator","telehandler","skid-steer","compactor","wheel-loader"],
  "ashok-leyland": ["trucks","tippers","buses","lcv","icv","hcv"],
  switch: ["electric-bus","electric-lcv"],
  "used-jcb": [],
};

const staticPaths = [
  "/",
  "/jcb",
  "/ashok-leyland",
  "/switch-ev",
  "/used-vehicles",
  "/finance",
  "/emi-calculator",
  "/loan",
  "/insurance",
  "/rto",
  "/government-schemes",
  "/spare-parts",
  "/service",
  "/blogs",
  "/faq",
  "/about",
  "/contact",
  "/dealer-locator",
  "/offers",
  "/parts-lubricants",
  "/service-warranty",
  "/gallery",
  "/careers",
  "/compare",
  "/product-finder",
];

const blogSlugs = [
  "jcb-se-mahine-mein-kitni-earning",
  "bihar-mein-contractor-business-kaise-shuru-karein",
  "road-contractor-ke-liye-best-jcb",
  "truck-business-kaise-shuru-karein-bihar",
  "sand-transport-ke-liye-kaunsa-tipper",
  "electric-bus-profitable-hai-bihar",
  "certified-used-jcb-buying-guide",
  "jcb-loan-bina-income-proof",
  "machine-maintenance-checklist-bihar",
  "cement-transport-business-bihar",
];

const now = new Date().toISOString();
const urls = [];

for (const p of staticPaths) {
  urls.push({ loc: `${SITE}${p}`, priority: p === "/" ? "1.0" : "0.8" });
}

for (const slug of blogSlugs) {
  urls.push({ loc: `${SITE}/blogs/${slug}`, priority: "0.65" });
}

for (const [cat, subs] of Object.entries(SUBS)) {
  for (const s of subs) {
    urls.push({ loc: `${SITE}/${cat}/${s}`, priority: "0.75" });
  }
}

for (const cat of CATEGORIES) {
  for (const d of DISTRICTS) {
    urls.push({
      loc: `${SITE}/${cat}/${d}`,
      priority: ["patna", "muzaffarpur", "gaya", "bhagalpur", "darbhanga"].includes(d)
        ? "0.9"
        : "0.7",
    });
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const out = path.join(__dirname, "../public/sitemap.xml");
fs.writeFileSync(out, xml, "utf8");
console.log(`✅ Wrote ${urls.length} URLs to public/sitemap.xml`);
