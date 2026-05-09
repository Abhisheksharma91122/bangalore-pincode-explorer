'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';
import SkeletonCard from '../components/SkeletonCard';
import Footer from '../components/Footer';
import api from '../lib/api';
import { motion } from 'framer-motion';
import { SearchIcon, Activity } from 'lucide-react';

export default function Home() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popularSearches, setPopularSearches] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const { data } = await api.get('/popular');
        if (data.success) {
          setPopularSearches(data.data.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to load popular searches', err);
      }
    };
    fetchPopular();
  }, []);

  const handleSearch = useCallback(async (query) => {
    if (!query) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const { data } = await api.get(`/search?q=${encodeURIComponent(query)}`);
      if (data.success) {
        setResults(data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch results');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20 dark:to-transparent -z-10" />
      <div className="absolute -top-[300px] -right-[300px] w-[800px] h-[800px] rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-indigo-400/10 dark:bg-indigo-600/5 blur-3xl -z-10 pointer-events-none" />

      <Navbar />

      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-20 pb-24 w-full max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Activity size={16} />
            <span>Over 3,000+ locations indexed</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Find any <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Pincode</span> in Bangalore.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            The fastest and most beautiful way to explore areas, districts, and postal codes across Namma Bengaluru.
          </p>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {/* Popular Searches */}
          {!hasSearched && popularSearches.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center items-center gap-3"
            >
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Trending:</span>
              {popularSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(term)}
                  className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-700 dark:hover:text-blue-400 transition-colors shadow-sm"
                >
                  {term}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Results Area */}
        <div className="w-full max-w-6xl mt-8">
          {error && (
            <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-800/30">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {!isLoading && hasSearched && results.length === 0 && !error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
            >
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <SearchIcon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">No areas found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search to find what you're looking for.</p>
            </motion.div>
          )}

          {isLoading && (
            <div className="w-full">
              <div className="mb-6 flex justify-between items-center px-2">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  Searching...
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="w-full">
              <div className="mb-6 flex justify-between items-center px-2">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  Search Results
                </h2>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 py-1 px-3 rounded-full text-sm font-medium">
                  {results.length} found
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((item, index) => (
                  <ResultCard key={item._id || index} item={item} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
