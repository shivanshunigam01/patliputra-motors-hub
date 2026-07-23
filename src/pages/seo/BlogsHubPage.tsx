import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOHead } from "@/components/seo/SEOHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import { BLOG_POSTS } from "@/seo/blogs";
import { webPageSchema } from "@/seo/schema";

const CLUSTERS = [
  { id: "jcb", label: "JCB & Contracting" },
  { id: "ashok-leyland", label: "Ashok Leyland / Truck" },
  { id: "switch", label: "Switch EV" },
  { id: "used", label: "Used Machines" },
  { id: "finance", label: "Finance & Loan" },
] as const;

export default function BlogsHubPage() {
  const title = "Blogs – JCB, Truck Business & Contractor Guides Bihar";
  const description =
    "Practical Bihar-focused guides: JCB earning, truck business, sand transport, EV ROI, used machine buying checklist.";
  const path = "/blogs";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={title}
        description={description}
        path={path}
        keywords={[
          "JCB earning Bihar",
          "Truck business guide",
          "Contractor machine guide",
          "Used JCB buying guide",
        ]}
      />
      <JsonLd data={webPageSchema({ title, description, path })} />

      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <BreadcrumbNav
              className="mb-6 text-primary-foreground/70 [&_a]:text-primary-foreground/80 [&_span]:text-primary-foreground"
              items={[{ name: "Blogs" }]}
            />
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Blogs</h1>
            <p className="text-lg text-primary-foreground/85 max-w-2xl">
              Generic articles nahi — practical Bihar business content. JCB earning, truck routes, EV ROI
              aur used machine checklists.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-12">
            {CLUSTERS.map((cluster) => {
              const posts = BLOG_POSTS.filter((p) => p.cluster === cluster.id);
              if (posts.length === 0) return null;
              return (
                <div key={cluster.id}>
                  <h2 className="text-xl font-bold text-foreground mb-4">{cluster.label}</h2>
                  <ul className="space-y-3">
                    {posts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          to={`/blogs/${post.slug}`}
                          className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-foreground group-hover:text-primary">
                              {post.titleHi}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {post.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-muted-foreground group-hover:text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="flex flex-wrap gap-2 pt-4">
              <Link
                to="/faq"
                className="px-3 py-1.5 rounded-full text-sm border border-border hover:border-primary/40"
              >
                FAQ
              </Link>
              <Link
                to="/emi-calculator"
                className="px-3 py-1.5 rounded-full text-sm border border-border hover:border-primary/40"
              >
                EMI Calculator
              </Link>
              <Link
                to="/jcb/patna"
                className="px-3 py-1.5 rounded-full text-sm border border-border hover:border-primary/40"
              >
                JCB Patna
              </Link>
              <Link
                to="/used-jcb/patna"
                className="px-3 py-1.5 rounded-full text-sm border border-border hover:border-primary/40"
              >
                Used JCB Patna
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
