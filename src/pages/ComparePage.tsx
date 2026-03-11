import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCompare } from '@/context/CompareContext';
import { useAdminSettings } from '@/context/AdminSettingsContext';
import { getWhatsAppUrl } from "@/lib/whatsapp";

const ComparePage = () => {
  const { selectedProducts, clearProducts, removeProduct } = useCompare();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProducts.length === 0) {
      navigate(-1);
    }
  }, [selectedProducts.length, navigate]);

  if (selectedProducts.length === 0) {
    return null;
  }

  const comparisonRows = [
    
    { label: 'Brand', key: 'brand' },
    { label: 'Category', key: 'category' },
    { label: 'Fuel Type', key: 'fuel' },
    { label: 'Capacity / Payload', key: 'capacity' },
    { label: 'Power', key: 'power' },
    { label: 'Application', key: 'application' },
    { label: 'Warranty', key: 'warranty' },
  ];

   const { settings } = useAdminSettings();
  const getValue = (product: typeof selectedProducts[0], key: string): string => {
    if (key === 'price' || key === 'brand' || key === 'category') {
      return product[key as 'price' | 'brand' | 'category'] || '-';
    }
    return product.specs[key as keyof typeof product.specs] || '-';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-16">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-3 sm:mb-4 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              Back to Products
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                  Compare Products
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Side-by-side comparison of selected vehicles
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={clearProducts} className="self-start sm:self-auto">
                Clear Comparison
              </Button>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden shadow-lg"
          >
            {/* Mobile/tablet: allow horizontal scroll instead of breaking */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[640px] sm:min-w-0">
                {/* Product Headers */}
                <div className={`grid gap-3 sm:gap-4 p-4 sm:p-6 bg-muted/50 border-b border-border ${
                  selectedProducts.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                }`}>
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="relative">
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors z-10"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      <div className="aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold text-foreground mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <Link to="/contact"><Button size="sm" className="mt-1 bg-jcb text-jcb-foreground hover:bg-jcb/90 text-xs">Get Latest Price</Button></Link>
                    </div>
                  ))}
                  {selectedProducts.length === 1 && (
                    <div className="hidden sm:flex items-center justify-center border-2 border-dashed border-border rounded-xl p-8">
                      <p className="text-muted-foreground text-center">
                        Select another product to compare
                      </p>
                    </div>
                  )}
                </div>

                {/* Comparison Rows */}
                <div className="divide-y divide-border">
                  {comparisonRows.map((row, index) => (
                    <div
                      key={row.key}
                      className={`${
                        index % 2 === 0 ? 'bg-background' : 'bg-muted/30'
                      }`}
                    >
                      {/* Mobile: Label on top */}
                      <div className="px-4 pt-3 pb-1 sm:hidden">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {row.label}
                        </p>
                      </div>
                      
                      <div className={`grid gap-3 sm:gap-4 px-4 pb-3 sm:py-4 ${
                        selectedProducts.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                      }`}>
                        {selectedProducts.map((product) => (
                          <div key={product.id} className="sm:text-center">
                            <p className="hidden sm:block text-xs text-muted-foreground mb-1 lg:hidden">
                              {row.label}
                            </p>
                            <p className="text-sm sm:text-base font-medium text-foreground break-words">
                              {getValue(product, row.key)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 sm:mt-8 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-3 sm:mb-4">
              Need Help Deciding?
            </h2>
            <p className="text-sm sm:text-base text-primary-foreground/80 mb-4 sm:mb-6 max-w-xl mx-auto">
              Our experts can help you choose the right vehicle for your needs. Get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href={`tel:+91${settings?.primary_phone}`} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold"
                >
                  <Phone className="h-5 w-5" />
                  Talk to Expert
                </Button>
              </a>
              <a
                href={getWhatsAppUrl(settings?.whatsapp_number)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComparePage;
