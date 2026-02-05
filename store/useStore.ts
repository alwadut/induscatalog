import { create } from 'zustand';
import { Product, FilterState } from '../types';
import { products } from '../data/mockData';

interface StoreState {
  products: Product[];
  comparisonList: Product[];
  filters: FilterState;
  
  // Actions
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  category: [],
  minPrice: 0,
  maxPrice: 10000,
  inStockOnly: false,
  searchQuery: '',
};

export const useStore = create<StoreState>((set) => ({
  products: products,
  comparisonList: [],
  filters: initialFilters,

  addToComparison: (product) => set((state) => {
    if (state.comparisonList.find(p => p.id === product.id)) return state;
    if (state.comparisonList.length >= 4) return state; // Limit to 4
    return { comparisonList: [...state.comparisonList, product] };
  }),

  removeFromComparison: (productId) => set((state) => ({
    comparisonList: state.comparisonList.filter(p => p.id !== productId)
  })),

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  resetFilters: () => set({ filters: initialFilters }),
}));