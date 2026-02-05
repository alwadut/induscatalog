import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowLeft, Download } from 'lucide-react';
import { useStore } from '../store/useStore';

const Compare: React.FC = () => {
  const { comparisonList, removeFromComparison } = useStore();

  if (comparisonList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No items to compare</h2>
            <p className="text-gray-500 mb-8">Add products from the catalog to see a side-by-side comparison of specifications.</p>
            <Link to="/catalog" className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                Browse Catalog
            </Link>
        </div>
      </div>
    );
  }

  // Collect all unique spec keys
  const allSpecKeys = Array.from(new Set(
    comparisonList.flatMap(p => p.specifications.map(s => s.key))
  ));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <Link to="/catalog" className="inline-flex items-center text-sm text-gray-500 hover:text-accent mb-2 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Catalog
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Comparison</h1>
        </div>
        <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-accent transition-colors">
            <Download size={20} />
            <span className="hidden sm:inline">Export PDF</span>
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-6 min-w-[200px] border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sticky left-0 z-10">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Features</span>
              </th>
              {comparisonList.map(product => (
                <th key={product.id} className="p-6 min-w-[250px] border-b border-gray-200 dark:border-gray-700 relative">
                  <button 
                  onClick={() => removeFromComparison(product.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <Link to={`/product/${product.id}`} className="block group">
                    <div className="h-32 mb-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded p-2">
                        <img src={product.images.thumbnail} alt={product.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.sku}</p>
                    <p className="font-mono text-lg font-bold text-gray-900 dark:text-white mt-2">${product.price.toLocaleString()}</p>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* General Info */}
            <tr>
                <td className="p-4 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 sticky left-0 z-10">Manufacturer</td>
                {comparisonList.map(p => (
                    <td key={p.id} className="p-4 text-gray-600 dark:text-gray-300">{p.manufacturer}</td>
                ))}
            </tr>
            <tr>
                <td className="p-4 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 sticky left-0 z-10">Availability</td>
                {comparisonList.map(p => (
                    <td key={p.id} className="p-4">
                        {p.availability.inStock ? (
                            <span className="text-green-600 font-medium">In Stock</span>
                        ) : (
                            <span className="text-red-500 font-medium">Out of Stock</span>
                        )}
                    </td>
                ))}
            </tr>
            
            {/* Dynamic Specs */}
            {allSpecKeys.map(key => (
                <tr key={key}>
                    <td className="p-4 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 sticky left-0 z-10">{key}</td>
                    {comparisonList.map(p => {
                        const spec = p.specifications.find(s => s.key === key);
                        return (
                            <td key={p.id} className="p-4 text-gray-600 dark:text-gray-300 font-mono text-sm">
                                {spec ? `${spec.value} ${spec.unit || ''}` : '-'}
                            </td>
                        );
                    })}
                </tr>
            ))}
            
            {/* Ratings */}
             <tr>
                <td className="p-4 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 sticky left-0 z-10">Rating</td>
                {comparisonList.map(p => (
                    <td key={p.id} className="p-4 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                            <span className="font-bold text-accent mr-1">{p.ratings.average}</span>
                            <span className="text-xs text-gray-400">({p.ratings.count} reviews)</span>
                        </div>
                    </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;