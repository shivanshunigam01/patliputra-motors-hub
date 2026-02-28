import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Flame, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products.service";

export function NewArrivals() {
  const { t, language } = useLanguage();
  const { settings } = useAdminSettings();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filteredProducts = products
    ?.filter((p: any) => p.isActive !== false)
    ?.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-leyland" />
              <span className="text-sm font-medium text-leyland">
                {language === "hi" ? "हॉट डील्स" : "Hot Deals"}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {language === "hi" ? "नई आमद" : "New Arrivals"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === "hi"
                ? "विशेष ऑफर के साथ नवीनतम लॉन्च"
                : "Latest launches with special offers"}
            </p>
          </div>

          {/* <Link to="/products" className="mt-4 md:mt-0">
            <Button variant="outline" className="gap-2">
              {t("common.viewAll")}{" "}
              {language === "hi" ? "उत्पाद" : "Products"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link> */}
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-10 text-muted-foreground">
            Loading latest products...
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-10 text-destructive">
            Failed to load products.
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && filteredProducts?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: any, index: number) => {
              const badgeText = product.isNewLaunch
                ? language === "hi"
                  ? "नई लॉन्च"
                  : "NEW LAUNCH"
                : product.isBestseller
                ? language === "hi"
                  ? "बेस्टसेलर"
                  : "BESTSELLER"
                : language === "hi"
                ? "लोकप्रिय"
                : "POPULAR";

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={
                            product.images?.[0] ||
                            "https://via.placeholder.com/600x400?text=No+Image"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-wide animate-pulse-glow">
                          {badgeText}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground mb-1">
                          {product.category}
                        </p>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold text-foreground">
                            ₹
                            {product.price?.toLocaleString("en-IN")}
                            *
                          </p>

                          <div className="flex items-center gap-2">
                            <a href={getWhatsAppUrl(settings?.whatsapp_number, product.name)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <button className="flex items-center gap-1 px-3 py-1.5 bg-success text-success-foreground rounded-full text-xs font-medium hover:bg-success/90 transition-colors">
                                <MessageCircle className="h-3.5 w-3.5" />
                                {language === "hi" ? "पूछें" : "Enquire"}
                              </button>
                            </a>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                              <span>
                                {language === "hi" ? "विवरण" : "Details"}
                              </span>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProducts?.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No products available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
