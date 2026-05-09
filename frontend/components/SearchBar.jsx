'use client';
import { Search, X, Loader2, History, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const debouncedQuery = useDebounce(query, 500);
  const containerRef = useRef(null);

  // Load recent searches from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches');
      }
    }
  }, []);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  // Trigger search on debounce
  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      onSearch(debouncedQuery);
      
      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [debouncedQuery.trim(), ...prev.filter(item => item !== debouncedQuery.trim())].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
        return updated;
      });
    } else {
      onSearch('');
    }
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50" ref={containerRef}>
      <motion.div 
        className={`relative flex items-center bg-white dark:bg-slate-800 rounded-full border-2 transition-all shadow-lg overflow-hidden
          ${isFocused ? 'border-blue-500 shadow-blue-500/20' : 'border-slate-200 dark:border-slate-700'}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pl-5 text-slate-400">
          <Search size={22} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search by area name or pincode (e.g. Bellandur, 560103)"
          className="w-full py-4 px-4 bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 text-lg"
        />
        <div className="pr-4 flex items-center gap-2 text-slate-400">
          {isLoading && <Loader2 className="animate-spin text-blue-500" size={20} />}
          <AnimatePresence>
            {query && !isLoading && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClear}
                className="hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-full p-1 transition-colors"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Autocomplete / Recent Searches Dropdown */}
      <AnimatePresence>
        {isFocused && !query && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <History size={14} /> Recent Searches
            </div>
            <ul>
              {recentSearches.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-5 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-3"
                  >
                    <Search size={16} className="text-slate-400" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
