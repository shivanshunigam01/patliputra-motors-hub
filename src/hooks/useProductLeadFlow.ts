import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  brand: string;
  tcoItems?: Array<{
    key: string;
    label: string;
    value: number;
    unit: string;
  }>;
}

export function useProductLeadFlow(brand: string) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showTcoPopup, setShowTcoPopup] = useState(false);

  const toggleProductSelection = (product: Product) => {
    const isSelected = selectedProducts.some(p => p.id === product.id);

    if (isSelected) {
      setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
      return;
    }

    if (selectedProducts.length >= 2) {
      toast.error(language === 'hi' ? 'अधिकतम 2 उत्पाद चुन सकते हैं' : 'Maximum 2 products can be selected');
      return;
    }

    if (selectedProducts.length > 0 && selectedProducts[0].brand !== brand) {
      toast.error(language === 'hi' ? 'केवल एक ब्रांड के उत्पाद चुन सकते हैं' : 'Can only select products from same brand');
      return;
    }

    setSelectedProducts(prev => [...prev, { ...product, brand }]);
  };

  const handleOpenTco = () => {
    if (selectedProducts.length === 0) {
      toast.error(language === 'hi' ? 'कम से कम एक उत्पाद चुनें' : 'Please select at least one product');
      return;
    }
    setShowTcoPopup(true);
  };

  const handleContinueToReview = () => {
    navigate('/review', {
      state: { products: selectedProducts }
    });
    setShowTcoPopup(false);
  };

  const handleClearSelection = () => {
    setSelectedProducts([]);
    setShowTcoPopup(false);
  };

  return {
    selectedProducts,
    showTcoPopup,
    setShowTcoPopup,
    toggleProductSelection,
    handleOpenTco,
    handleContinueToReview,
    handleClearSelection,
  };
}
