import { Link } from "react-router-dom";
import { BIHAR_DISTRICTS } from "@/seo/districts";

type DistrictGridProps = {
  categorySlug: string;
  title?: string;
  highlightSlug?: string;
  limit?: number;
};

export function DistrictGrid({
  categorySlug,
  title = "Bihar ke har district mein available",
  highlightSlug,
  limit,
}: DistrictGridProps) {
  const districts = limit ? BIHAR_DISTRICTS.slice(0, limit) : BIHAR_DISTRICTS;

  return (
    <section className="py-12 lg:py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Sirf &quot;Bihar&quot; nahi — har district ke liye dedicated page. Apne shehar par click karein.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {districts.map((d) => {
            const active = d.slug === highlightSlug;
            return (
              <Link
                key={d.slug}
                to={`/${categorySlug}/${d.slug}`}
                className={`rounded-lg px-3 py-2.5 text-sm border transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <span className="font-medium block">{d.name}</span>
                <span className="text-xs opacity-70">{d.nameHi}</span>
              </Link>
            );
          })}
        </div>
        {limit && limit < BIHAR_DISTRICTS.length && (
          <p className="mt-4 text-sm text-muted-foreground">
            +{BIHAR_DISTRICTS.length - limit} aur districts — full list ke liye brand page dekhein.
          </p>
        )}
      </div>
    </section>
  );
}
