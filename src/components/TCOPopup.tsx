import { useEffect } from 'react';
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
              {products.length === 2 ? (
                /* Side-by-side comparison for 2 products */
                <div>
                  {/* Product headers */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-end">
                      {language === 'hi' ? 'पैरामीटर' : 'Parameter'}
                    </div>
                    {products.map((p) => (
                      <div key={p.id} className="p-3 border border-border rounded-lg bg-muted/30 text-center">
                        <p className="font-semibold text-foreground text-sm">{p.name}</p>
                      </div>
                    ))}
                  </div>

                  {/* Price row */}
                  <div className="grid grid-cols-3 gap-2 p-3 border border-border rounded-lg bg-muted/20 mb-2">
                    <p className="font-medium text-foreground text-sm flex items-center">
                      {language === 'hi' ? 'कीमत' : 'Price'}
                    </p>
                    {products.map((p) => (
                      <p key={p.id} className="text-center font-bold text-primary text-sm">{p.price}</p>
                    ))}
                  </div>

                  {/* TCO items comparison rows */}
                  {(() => {
                    const tcoKeys = new Map<string, { label: string; unit: string }>();
                    products.forEach(p => (p.tcoItems || []).forEach(item => {
                      if (!tcoKeys.has(item.key)) tcoKeys.set(item.key, { label: item.label, unit: item.unit });
                    }));

                    if (tcoKeys.size === 0) return (
                      <div className="p-6 text-center bg-muted/30 rounded-lg mt-4">
                        <p className="text-muted-foreground text-sm">
                          {language === 'hi' ? 'TCO डेटा उपलब्ध नहीं' : 'No additional TCO data available'}
                        </p>
                      </div>
                    );

                    return Array.from(tcoKeys.entries()).map(([key, meta]) => {
                      const values = products.map(p => {
                        const item = (p.tcoItems || []).find(t => t.key === key);
                        return item ? item.value : null;
                      });
                      const numericValues = values.filter((v): v is number => v !== null);
                      const best = numericValues.length > 1 ? Math.min(...numericValues) : null;

                      return (
                        <div key={key} className="grid grid-cols-3 gap-2 p-3 border border-border rounded-lg bg-muted/20 mb-2">
                          <div className="flex flex-col justify-center">
                            <p className="font-medium text-foreground text-sm">{meta.label}</p>
                            <p className="text-xs text-muted-foreground">{meta.unit}</p>
                          </div>
                          {values.map((val, i) => (
                            <p key={i} className={`text-center font-bold text-sm flex items-center justify-center ${val !== null && val === best && numericValues.length > 1 ? 'text-green-600' : 'text-foreground'}`}>
                              {val !== null ? `₹${val.toLocaleString('en-IN')}` : '—'}
                            </p>
                          ))}
                        </div>
                      );
                    });
                  })()}
                </div>
              ) : (
                /* Single product view */
                <div>
                  <div className="mb-6">
                    <div className="p-4 border border-border rounded-lg bg-muted/30">
                      <p className="font-semibold text-foreground">{products[0]?.name}</p>
                      <p className="text-lg font-bold text-primary mt-2">{products[0]?.price}</p>
                    </div>
                  </div>

                  {allTcoItems.length > 0 ? (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        {language === 'hi' ? 'लागत विवरण' : 'Cost Breakdown'}
                      </h3>
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
                  ) : (
                    <div className="p-8 text-center bg-muted/30 rounded-lg">
                      <p className="text-muted-foreground">
                        {language === 'hi' ? 'TCO डेटा उपलब्ध नहीं' : 'TCO data not available'}
                      </p>
                    </div>
                  )}
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
