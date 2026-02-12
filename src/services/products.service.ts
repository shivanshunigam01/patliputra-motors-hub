import api from "./api";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  shortDescription?: string;
  images?: string[];
  isActive?: boolean;
  isNewLaunch?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;

  // ✅ ADD THESE
  specifications?: Record<string, any>;
  tcoItems?: {
    key: string;
    label: string;
    value: number;
    unit: string;
  }[];
  brochureUrl?: string;
}


export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data.data;
};
