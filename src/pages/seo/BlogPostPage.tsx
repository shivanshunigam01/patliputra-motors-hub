import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import { FAQAccordion } from "@/components/seo/FAQAccordion";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { getBlogPost, BLOG_POSTS } from "@/seo/blogs";
import { articleSchema, howToSchema } from "@/seo/schema";
import NotFound from "@/pages/NotFound";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug);
  const { settings } = useAdminSettings();
  const phone = settings?.primary_phone || "9031053514";

  if (!post) return <NotFound />;

  const path = `/blogs/${post.slug}`;
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.cluster === post.cluster).slice(
    0,
    3
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.title}
        description={post.description}
        path={path}
        keywords={post.keywords}
        type="article"
      />
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            path,
            datePublished: post.datePublished,
            keywords: post.keywords,
          }),
          howToSchema({
            name: post.titleHi,
            description: post.description,
            steps: post.sections.map((s) => `${s.heading}: ${s.body.slice(0, 120)}`),
          }),
        ]}
      />

      <Navbar />
      <main className="pt-20">
        <article className="py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <BreadcrumbNav
              items={[
                { name: "Blogs", path: "/blogs" },
                { name: post.titleHi },
              ]}
            />
            <p className="text-sm text-muted-foreground mt-6 mb-2">
              {post.datePublished} · {post.cluster.replace("-", " ")}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{post.intro}</p>

            <div className="space-y-8">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                </section>
              ))}
            </div>

            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <FAQAccordion faqs={post.faqs} />
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a href={`tel:+91${phone}`}>
                <Button size="lg" className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90">
                  <Phone className="h-5 w-5" /> Free Consultation
                </Button>
              </a>
              <Link to="/emi-calculator">
                <Button size="lg" variant="outline" className="gap-2">
                  EMI Calculator <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {post.relatedPaths && post.relatedPaths.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.relatedPaths.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-3 py-1.5 rounded-full text-sm border border-border hover:border-primary/40"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {related.length > 0 && (
              <div className="mt-14 pt-8 border-t border-border">
                <h3 className="font-semibold mb-4">Related guides</h3>
                <ul className="space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/blogs/${r.slug}`} className="text-primary hover:underline">
                        {r.titleHi}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 mt-10 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> All blogs
            </Link>
          </div>
        </article>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
