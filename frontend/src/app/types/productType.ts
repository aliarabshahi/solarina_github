export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  category: number;
  category_name?: string;
}

export interface ProductListResponse {
  data: ProductItem[];
}
