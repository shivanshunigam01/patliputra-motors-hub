import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCompare } from '@/context/CompareContext';

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
    { label: 'Price', key: 'price' },
    { label: 'Brand', key: 'brand' },
    { label: 'Category', key: 'category' },
    { label: 'Fuel Type', key: 'fuel' },
    { label: 'Capacity / Payload', key: 'capacity' },
    { label: 'Power', key: 'power' },
    { label: 'Application', key: 'application' },
    { label: 'Warranty', key: 'warranty' },
  ];

  const getValue = (product: typeof selectedProducts[0], key: string): string => {
    if (key === 'price' || key === 'brand' || key === 'category') {
      return product[key as 'price' | 'brand' | 'category'] || '-';
    }
    return product.specs[key as keyof typeof product.specs] || '-';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Products
            </button>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Compare Products
                </h1>
                <p className="text-muted-foreground">
                  Side-by-side comparison of selected vehicles
                </p>
              </div>
              <Button variant="outline" onClick={clearProducts}>
                Clear Comparison
              </Button>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg"
          >
            {/* Product Headers */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-muted/50 border-b border-border">
              {selectedProducts.map((product) => (
                <div key={product.id} className="relative">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-jcb">{product.price}</p>
                </div>
              ))}
              {selectedProducts.length === 1 && (
                <div className="flex items-center justify-center border-2 border-dashed border-border rounded-xl p-8">
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
                  className={`grid grid-cols-2 gap-4 p-4 ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/30'
                  }`}
                >
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="text-center">
                      <p className="text-xs text-muted-foreground mb-1 lg:hidden">
                        {row.label}
                      </p>
                      <p className="font-medium text-foreground">
                        {getValue(product, row.key)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Row Labels (Desktop) */}
            <div className="hidden lg:block absolute left-0 top-0 w-48 bg-card border-r border-border">
              <div className="h-[280px] flex items-end p-6 border-b border-border bg-muted/50">
                <span className="text-sm font-medium text-muted-foreground">Specifications</span>
              </div>
              {comparisonRows.map((row, index) => (
                <div
                  key={row.key}
                  className={`p-4 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
                >
                  <span className="font-medium text-foreground">{row.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Need Help Deciding?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Our experts can help you choose the right vehicle for your needs. Get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210">
                <Button
                  size="lg"
                  className="gap-2 bg-jcb text-jcb-foreground hover:bg-jcb/90 font-semibold"
                >
                  <Phone className="h-5 w-5" />
                  Talk to Expert
                </Button>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 font-semibold"
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
