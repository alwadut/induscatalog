import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Plus, AlertCircle, Download, Share2, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getAIRecommendations } from '../services/geminiService';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToComparison, comparisonList } = useStore();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const product = products.find(p => p.id === id);
  const isInComparison = comparisonList.some(p => p.id === id);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!product) return;
      setLoadingRecs(true);
      const recIds = await getAIRecommendations(product);
      const recProducts = products.filter(p => recIds.includes(p.id) && p.id !== product.id);
      setRecommendations(recProducts);
      setLoadingRecs(false);
    };

    fetchRecommendations();
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
        <Link to="/catalog" className="mt-4 text-accent hover:underline">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/catalog" className="inline-flex items-center text-sm text-gray-500 hover:text-accent mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" />
        Back to Catalog
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="p-8 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
            <div className="aspect-square rounded-lg overflow-hidden bg-white dark:bg-gray-800 mb-4">
              <img 
                src={product.images.gallery[0]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.gallery.map((img, idx) => (
                <button key={idx} className="aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-accent focus:border-accent">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <span className="text-sm font-mono text-accent uppercase tracking-wide">{product.category}</span>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{product.name}</h1>
                  <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
               </div>
               <div className="flex space-x-2">
                 <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Share2 size={20} />
                 </button>
               </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold font-mono text-gray-900 dark:text-white">${product.price.toLocaleString()}</span>
              {product.availability.inStock ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <Check size={12} className="mr-1" /> In Stock ({product.availability.quantity})
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  <AlertCircle size={12} className="mr-1" /> Out of Stock
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <button className="flex-1 bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-orange-500/20">
                Add to Cart
              </button>
              <button 
                onClick={() => !isInComparison && addToComparison(product)}
                disabled={isInComparison}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-bold border-2 transition-colors ${
                  isInComparison 
                  ? 'border-green-500 text-green-500 bg-green-50 dark:bg-green-900/20 cursor-default' 
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {isInComparison ? 'Added to Compare' : 'Compare Product'}
              </button>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-sm font-bold font-mono uppercase text-gray-900 dark:text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{spec.key}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">{spec.value} {spec.unit}</span>
                  </div>
                ))}
              </div>
            </div>

             <div className="mt-8">
                 <h3 className="text-sm font-bold font-mono uppercase text-gray-900 dark:text-white mb-4">Certifications</h3>
                 <div className="flex flex-wrap gap-2">
                    {product.certifications.map(cert => (
                        <span key={cert} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full">
                            {cert}
                        </span>
                    ))}
                 </div>
             </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">✨</span> AI Recommended
            </h2>
        </div>
        
        {loadingRecs ? (
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-center text-gray-500">
                    <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                    <p>Analyzing specs...</p>
                </div>
            </div>
        ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recommendations.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        ) : (
            <div className="text-center py-10 text-gray-500">
                No specific recommendations found.
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;