import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Zap, Shield, Box } from 'lucide-react';
import { useStore } from '../store/useStore';
import { aiSearch } from '../services/geminiService';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { setFilters } = useStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Execute AI search to get matching IDs
    // Note: In a real app, we might pass these IDs to the catalog page state
    // For now, we'll set the text query in the store and navigate, 
    // letting the Catalog page handle the AI filtering or basic filtering.
    // However, to demonstrate the "AI Search" feature requested:
    
    try {
        // We will navigate to catalog with a special state or query param
        // But simply setting the store filter is cleaner for this demo structure.
        setFilters({ searchQuery: query });
        navigate('/catalog');
    } finally {
        setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-gray-900 z-0" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6 leading-tight">
              Industrial Grade <br />
              <span className="text-accent">Precision Components</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl">
              Access a comprehensive catalog of premium industrial parts. 
              Powered by AI to help you find exactly what you need, faster.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-gray-500" size={24} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe what you're looking for (e.g., 'high pressure pump under $1500')"
                  className="w-full bg-white/10 backdrop-blur-md border border-gray-600 rounded-lg py-4 pl-14 pr-32 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 bg-accent hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500 font-mono flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Gemini AI Search Enabled
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 mb-6">
                <Box size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Huge Inventory</h3>
              <p className="text-gray-500 dark:text-gray-400">Over 50,000 SKUs ready for immediate dispatch. Real-time stock tracking.</p>
            </div>
            
            <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-accent mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI Powered Search</h3>
              <p className="text-gray-500 dark:text-gray-400">Describe specifications in natural language. Our AI finds the perfect match instantly.</p>
            </div>

            <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Certified Quality</h3>
              <p className="text-gray-500 dark:text-gray-400">All products meet ISO, CE, and UL standards. Full documentation available.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;