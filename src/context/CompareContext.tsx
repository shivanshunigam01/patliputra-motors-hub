import { createContext, useContext, useState, ReactNode } from 'react';

export interface CompareProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  brand: string;
  image: string;
  specs: {
    fuel?: string;
    capacity?: string;
    power?: string;
    weight?: string;
    range?: string;
    charging?: string;
    warranty?: string;
    application?: string;
  };
}

interface CompareContextType {
  selectedProducts: CompareProduct[];
  addProduct: (product: CompareProduct) => boolean;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
  isSelected: (productId: string) => boolean;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<CompareProduct[]>([]);

  const addProduct = (product: CompareProduct): boolean => {
    if (selectedProducts.length >= 2) {
      return false;
    }
    if (selectedProducts.some(p => p.id === product.id)) {
      return false;
    }
    setSelectedProducts(prev => [...prev, product]);
    return true;
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearProducts = () => {
    setSelectedProducts([]);
  };

  const isSelected = (productId: string): boolean => {
    return selectedProducts.some(p => p.id === productId);
  };

  const canAddMore = selectedProducts.length < 2;

  return (
    <CompareContext.Provider value={{
      selectedProducts,
      addProduct,
      removeProduct,
      clearProducts,
      isSelected,
      canAddMore
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
