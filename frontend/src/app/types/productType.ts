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


export type ProductImageType = {
  id: number;
  image: string;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
};

export type ProductType = {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  price: number;
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  category: number;
  category_name: string;

  primary_image: string | null;

  images: ProductImageType[];
};
