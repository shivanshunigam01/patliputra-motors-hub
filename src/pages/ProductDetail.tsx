import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BrochureDownloadButton } from "@/components/BrochureDownloadButton";
import { getProducts, Product } from "@/services/products.service";
import { getImageUrl } from "@/lib/imageUrl";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { SEOHead } from "@/components/seo/SEOHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbNav } from "@/components/seo/BreadcrumbNav";
import { productSchema } from "@/seo/schema";
import { SITE_URL } from "@/seo/siteConfig";

export default function ProductDetail() {
  const { id } = useParams();
  const { settings } = useAdminSettings();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const product = products.find((p: any) => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found.
      </div>
    );
  }

  const path = `/product/${product.id}`;
  const description =
    product.shortDescription ||
    `${product.name} – ${product.brand} in Bihar. Price, EMI aur enquiry ke liye Patliputra.`;
  const image = getImageUrl(product.images?.[0]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${product.name} Price Bihar | ${product.brand}`}
        description={description}
        path={path}
        keywords={[product.name, `${product.brand} Bihar`, `${product.name} EMI`]}
        image={image}
        type="product"
      />
      <JsonLd
        data={productSchema({
          name: product.name,
          description,
          image,
          brand: product.brand,
          sku: product.id,
          price: product.price,
          url: `${SITE_URL}${path}`,
        })}
      />
      <Navbar />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <BreadcrumbNav
            className="mb-6"
            items={[
              { name: product.brand || "Products", path: "/" },
              { name: product.name },
            ]}
          />

          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT SIDE - Images */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="rounded-2xl overflow-hidden border">
                <img
                  src={getImageUrl(product.images?.[0])}
                  alt={product.name}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Thumbnail Row */}
              {product.images?.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={getImageUrl(img)}
                      alt="thumbnail"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* RIGHT SIDE - Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm text-muted-foreground">
                  {product.brand} • {product.category}
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold mt-2">
                  {product.name}
                </h1>
              </div>

              <p className="text-muted-foreground">
                {product.shortDescription}
              </p>

             
              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href={`tel:+91${settings?.primary_phone}`}>
                  <Button className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                </a>

                <a
                  href={getWhatsAppUrl(settings?.whatsapp_number)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>

                 <Link to="/contact">
                <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Latest Price
                </Button>
              </Link>


                <BrochureDownloadButton
                  productName={product.name}
                  brochureUrl={product.brochureUrl}
                />
              </div>

              {/* Specifications */}
              {product.specifications &&
                Object.keys(product.specifications).length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mt-8 mb-4">
                      Specifications
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(
                        ([key, value]: any) => (
                          <div
                            key={key}
                            className="border rounded-lg p-3 bg-muted"
                          >
                            <p className="text-sm text-muted-foreground">
                              {key}
                            </p>
                            <p className="font-medium">{value}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* TCO Section */}
              {product.tcoItems?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    Total Cost of Ownership
                  </h2>
                  <div className="space-y-3">
                    {product.tcoItems.map((item: any, i: number) => (
                      <div
                        key={i}
                        className="flex justify-between border-b pb-2"
                      >
                        <span>{item.label}</span>
                        <span>
                          ₹{item.value?.toLocaleString("en-IN")} /{" "}
                          {item.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
