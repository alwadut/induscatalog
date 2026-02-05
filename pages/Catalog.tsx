import React, { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { aiSearch } from '../services/geminiService';

const Catalog: React.FC = () => {
  const { products, filters, setFilters } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiFilteredIds, setAiFilteredIds] = useState<string[] | null>(null);

  // Effect to handle AI search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (filters.searchQuery) {
        setLoading(true);
        // If it looks like a complex query, use AI
        // For simplicity, we use AI for all non-empty queries in this demo
        const ids = await aiSearch(filters.searchQuery);
        setAiFilteredIds(ids);
        setLoading(false);
      } else {
        setAiFilteredIds(null);
        setLoading(false);
      }
    };

    const debounce = setTimeout(performSearch, 500); // Debounce search
    return () => clearTimeout(debounce);
  }, [filters.searchQuery]);

  // Client-side filtering logic
  const filteredProducts = products.filter(product => {
    // 1. AI Filter (Search Query)
    if (aiFilteredIds !== null && !aiFilteredIds.includes(product.id)) {
      return false;
    }

    // 2. Category Filter
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false;
    }

    // 3. Price Filter
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    // 4. Availability Filter
    if (filters.inStockOnly && !product.availability.inStock) {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-mono text-gray-900 dark:text-white">Catalog</h2>
            <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm"
            >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
            </button>
        </div>

        {/* Sidebar */}
        <div className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
            <FilterSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="mb-6">
            <div className="relative">
                <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ searchQuery: e.target.value })}
                    placeholder="Search products..."
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow"
                />
                {loading && (
                    <div className="absolute right-3 top-3.5">
                        <Loader2 className="animate-spin text-accent" size={20} />
                    </div>
                )}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {filteredProducts.length} results
                    {filters.searchQuery && !loading && aiFilteredIds && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                           ✨ AI Filtered
                        </span>
                    )}
                </p>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <Filter className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No products found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
              <button
                onClick={() => useStore.getState().resetFilters()}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;