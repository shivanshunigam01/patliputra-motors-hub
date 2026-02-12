import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export interface TCOItem {
  key: string;
  label: string;
  value: number;
  unit: string;
}

export interface TCOPopupProps {
  isOpen: boolean;
  products: Array<{
    id: string;
    name: string;
    price: string;
    tcoItems?: TCOItem[];
  }>;
  onContinue: () => void;
  onBack: () => void;
}

export function TCOPopup({ isOpen, products, onContinue, onBack }: TCOPopupProps) {
  const { language } = useLanguage();

  if (products.length === 0) return null;

  const allTcoItems = products.flatMap(p => p.tcoItems || []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onBack}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {language === 'hi' ? 'कुल स्वामित्व लागत (TCO)' : 'Total Cost of Ownership'}
              </h2>
              <button
                onClick={onBack}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Products Summary */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  {language === 'hi' ? 'चयनित उत्पाद' : 'Selected Products'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="p-4 border border-border rounded-lg bg-muted/30">
                      <p className="font-semibold text-foreground">{product.name}</p>
                      <p className="text-lg font-bold text-primary mt-2">{product.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TCO Items */}
              {allTcoItems.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    {language === 'hi' ? 'लागत विवरण' : 'Cost Breakdown'}
                  </h3>
                  <div className="space-y-3">
                    {allTcoItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.unit}</p>
                        </div>
                        <p className="text-lg font-bold text-primary">
                          ₹{item.value.toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {allTcoItems.length === 0 && (
                <div className="p-8 text-center bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">
                    {language === 'hi' ? 'TCO डेटा उपलब्ध नहीं' : 'TCO data not available'}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex gap-3">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                {language === 'hi' ? 'वापस' : 'Back'}
              </Button>
              <Button
                onClick={onContinue}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {language === 'hi' ? 'जारी रखें' : 'Continue'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
