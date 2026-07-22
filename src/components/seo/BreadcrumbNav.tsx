import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/seo/schema";

export type Crumb = { name: string; path?: string };

type BreadcrumbNavProps = {
  items: Crumb[];
  className?: string;
};

export function BreadcrumbNav({ items, className = "" }: BreadcrumbNavProps) {
  const schemaItems = [
    { name: "Home", path: "/" },
    ...items
      .filter((i) => i.path)
      .map((i) => ({ name: i.name, path: i.path as string })),
  ];

  // include current page (last item) even without path
  const last = items[items.length - 1];
  if (last && !last.path) {
    schemaItems.push({ name: last.name, path: typeof window !== "undefined" ? window.location.pathname : "/" });
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className={`text-sm text-muted-foreground ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, idx) => (
            <li key={`${item.name}-${idx}`} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              {item.path && idx < items.length - 1 ? (
                <Link to={item.path} className="hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
