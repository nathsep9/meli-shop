import { Product } from "@/types/product";

export interface MainContainerProps {
  currentRoute: 'list' | 'detail';
  search: string;
  paginatedProducts: Product[];
  totalPages: number;
  productDetail?: Product;
}