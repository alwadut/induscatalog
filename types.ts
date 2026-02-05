export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  availability: {
    inStock: boolean;
    quantity?: number;
  };
  description: string;
  specifications: { key: string; value: string; unit?: string }[];
  images: {
    thumbnail: string;
    gallery: string[];
  };
  certifications: string[];
  ratings: {
    average: number;
    count: number;
  };
}

export interface ProductFilters {
  categories?: string[];
  priceRange?: [number, number];
  availability?: 'inStock' | 'all';
  searchQuery?: string;
}

export interface FilterState {
  category: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  searchQuery: string;
}