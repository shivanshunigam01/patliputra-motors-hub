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
        className="fixed bottom-24 sm:bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md sm:max-w-xl"
      >
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4">
          {/* Mobile Layout - Stacked */}
          <div className="flex flex-col gap-3 sm:hidden">
            {/* Selected Products Row */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-foreground shrink-0">
                {selectedProducts.length} selected:
              </span>
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide flex-1">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs shrink-0"
                  >
                    <span className="max-w-[80px] truncate">{product.name.split(' ').slice(0, 2).join(' ')}</span>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="p-0.5 hover:bg-destructive/20 rounded-full shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearProducts}
                className="text-muted-foreground hover:text-foreground text-xs px-2 h-9"
              >
                Clear
              </Button>
              
              {selectedProducts.length === 1 ? (
                <Button
                  size="sm"
                  onClick={handleChoose}
                  className="flex-1 gap-1.5 bg-jcb text-jcb-foreground hover:bg-jcb/90 h-9 text-sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  Choose This Product
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleCompare}
                  className="flex-1 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-9 text-sm"
                >
                  <ArrowRight className="h-4 w-4" />
                  Compare Products
                </Button>
              )}
            </div>
          </div>

          {/* Desktop/Tablet Layout - Side by Side */}
          <div className="hidden sm:flex items-center justify-between gap-4">
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
                  Choose This
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleCompare}
                  className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <ArrowRight className="h-4 w-4" />
                  Compare Products
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
