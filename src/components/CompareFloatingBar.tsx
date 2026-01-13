import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/context/CompareContext';

export function CompareFloatingBar() {
  const { selectedProducts, removeProduct, clearProducts } = useCompare();
  const navigate = useNavigate();

  if (selectedProducts.length === 0) {
    return null;
  }

  const handleCompare = () => {
    navigate('/compare');
  };

  const handleChoose = () => {
    // For single product, could navigate to enquiry or call
    window.location.href = 'tel:+919876543210';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-xl"
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Selected Products */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2 overflow-hidden">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs max-w-[120px]"
                  >
                    <span className="truncate">{product.name.split(' ').slice(0, 2).join(' ')}</span>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="p-0.5 hover:bg-destructive/20 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearProducts}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
              
              {selectedProducts.length === 1 ? (
                <Button
                  size="sm"
                  onClick={handleChoose}
                  className="gap-1 bg-jcb text-jcb-foreground hover:bg-jcb/90"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Choose This</span>
                  <span className="sm:hidden">Choose</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleCompare}
                  className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="hidden sm:inline">Compare Products</span>
                  <span className="sm:hidden">Compare</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
