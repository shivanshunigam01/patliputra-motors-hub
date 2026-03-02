import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { ProductCompareCheckbox } from '@/components/ProductCompareCheckbox';
import { BrochureDownloadButton } from '@/components/BrochureDownloadButton';
import { TCOPopup } from '@/components/TCOPopup';
import { useLanguage } from '@/i18n/LanguageContext';
import { toast } from 'sonner';
import { useLeadFlow } from '@/hooks/useLeadFlow';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    subcategory: string;
    price: string;
    bestFor: string;
    badge?: string | null;
    image: string;
    featured?: boolean;
    brochureUrl?: string | null;
    specs: Record<string, string>;
  };
  brand: 'JCB' | 'Ashok Leyland' | 'Switch Mobility' | 'Certified Refurbished';
  brandColor: string;
  brandTextColor: string;
  index: number;
  specIcons?: Record<string, any>;
}

export function ProductCardWithLead({
  product,
  brand,
  brandColor,
  brandTextColor,
  index,
  specIcons = {},
}: ProductCardProps) {
  const { language } = useLanguage();
  const [isSelectingForLead, setIsSelectingForLead] = useState(false);
  const {
    selectedProducts,
    isTcoOpen,
    setIsTcoOpen,
    handleProductSelect,
    handleViewTco,
    handleTcoContinue,
  } = useLeadFlow();

  const productWithTco = useMemo(() => ({
    id: product.id,
    name: product.name,
    brand,
    price: product.price,
    image: product.image,
    category: product.category,
    tcoItems: [], // TODO: Fetch from API
  }), [product, brand]);

  const isSelected = selectedProducts.some(p => p.id === product.id);

  const handleSelectForLead = () => {
    setIsSelectingForLead(true);
    handleProductSelect(productWithTco);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className={product.featured ? 'md:col-span-2 lg:col-span-1' : ''}
      >
        <div
          className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border flex flex-col ${
            isSelected ? `border-primary ring-2 ring-primary` : 'border-border'
          }`}
          style={isSelected ? { borderColor: 'var(--primary)' } : {}}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <div
                className={`absolute top-4 left-4 px-3 py-1.5 text-white rounded-full text-xs font-bold tracking-wide`}
                style={{ backgroundColor: brandColor }}
              >
                {product.badge}
              </div>
            )}
            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
              <ProductCompareCheckbox
                product={{
                  id: product.id,
                  name: product.name,
                  category: product.category,
                  price: product.price,
                  brand,
                  image: product.image,
                  specs: product.specs,
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded text-white`}
                style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
              >
                {product.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {product.subcategory}
              </span>
            </div>

            <h3 className="text-lg font-bold text-foreground mb-2">
              {product.name}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {language === 'hi' ? 'के लिए सर्वश्रेष्ठ:' : 'Best for:'} {product.bestFor}
            </p>

            {/* Specs */}
            <div className="flex gap-4 mb-4 text-xs text-muted-foreground flex-wrap">
              {Object.entries(product.specs).map(([key, value]) => (
                key !== 'application' && (
                  <div key={key} className="flex items-center gap-1">
                    {specIcons[key] || null}
                    {value}
                  </div>
                )
              ))}
            </div>

            {/* Brochure Download */}
            <div className="mb-4 mt-auto">
              <BrochureDownloadButton
                productName={product.name}
                brochureUrl={product.brochureUrl}
                brandColor={brandColor}
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-xl font-bold text-foreground">
                {product.price}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={isSelected ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={handleSelectForLead}
                  style={
                    isSelected
                      ? { backgroundColor: brandColor, color: 'white' }
                      : { borderColor: brandColor, color: brandColor }
                  }
                >
                  <ShoppingCart className="h-4 w-4" />
                  {isSelected ? (language === 'hi' ? 'चयनित' : 'Selected') : (language === 'hi' ? 'चयन करें' : 'Select')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* TCO Popup */}
      {isSelectingForLead && (
        <TCOPopup
          isOpen={isTcoOpen}
          products={selectedProducts}
          onContinue={handleTcoContinue}
          onBack={() => {
            setIsTcoOpen(false);
            setIsSelectingForLead(false);
          }}
        />
      )}
    </>
  );
}
