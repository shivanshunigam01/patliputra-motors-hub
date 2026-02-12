import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface LeadProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  category: string;
  tcoItems?: Array<{
    key: string;
    label: string;
    value: number;
    unit: string;
  }>;
}

export function useLeadFlow() {
  const navigate = useNavigate();
  const [isTcoOpen, setIsTcoOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<LeadProduct[]>([]);

  const handleProductSelect = useCallback((product: LeadProduct) => {
    setSelectedProducts(prev => {
      const isAlreadySelected = prev.some(p => p.id === product.id);
      if (isAlreadySelected) {
        return prev.filter(p => p.id !== product.id);
      }
      
      if (prev.length >= 2) {
        toast.error('Maximum 2 products can be selected for comparison');
        return prev;
      }

      if (prev.length > 0 && prev[0].brand !== product.brand) {
        toast.error('You can only compare products of the same brand');
        return prev;
      }

      return [...prev, product];
    });
  }, []);

  const isSelected = useCallback((productId: string) => {
    return selectedProducts.some(p => p.id === productId);
  }, [selectedProducts]);

  const handleViewTco = useCallback(() => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product');
      return;
    }
    setIsTcoOpen(true);
  }, [selectedProducts]);

  const handleTcoContinue = useCallback(() => {
    setIsTcoOpen(false);
    navigate('/review', {
      state: { products: selectedProducts }
    });
  }, [navigate, selectedProducts]);

  const clearSelection = useCallback(() => {
    setSelectedProducts([]);
    setIsTcoOpen(false);
  }, []);

  return {
    selectedProducts,
    isTcoOpen,
    setIsTcoOpen,
    handleProductSelect,
    handleViewTco,
    handleTcoContinue,
    clearSelection,
    isSelected,
  };
}
