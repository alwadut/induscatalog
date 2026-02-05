import React from 'react';
import { useStore } from '../store/useStore';

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters, products } = useStore();
  
  // Extract unique categories
  const categories: string[] = Array.from(new Set(products.map(p => p.category)));

  const handleCategoryChange = (category: string) => {
    const current = filters.category;
    const next = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category];
    setFilters({ category: next });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white font-mono uppercase tracking-wider mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="form-checkbox h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent bg-transparent"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white font-mono uppercase tracking-wider mb-4">
          Price Range
        </h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:border-accent text-gray-900 dark:text-white"
            placeholder="Min"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:border-accent text-gray-900 dark:text-white"
            placeholder="Max"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white font-mono uppercase tracking-wider mb-4">
          Availability
        </h3>
        <label className="flex items-center space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters({ inStockOnly: e.target.checked })}
            className="form-checkbox h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent bg-transparent"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors">
            In Stock Only
          </span>
        </label>
      </div>

      <button
        onClick={() => useStore.getState().resetFilters()}
        className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};