'use client';
import { Map, Copy, Share2, MapPin, Building2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function ResultCard({ item, index }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${item.areaName} - ${item.pincode}`);
    toast.success('Pincode copied to clipboard!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Bangalore Pincode - ${item.areaName}`,
        text: `The pincode for ${item.areaName} is ${item.pincode}.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      handleCopy();
      toast.info('Share not supported, copied instead!');
    }
  };

  const openMap = () => {
    if (item.latitude && item.longitude) {
      window.open(`https://www.openstreetmap.org/?mlat=${item.latitude}&mlon=${item.longitude}#map=15/${item.latitude}/${item.longitude}`, '_blank');
    } else {
      window.open(`https://www.openstreetmap.org/search?query=${item.areaName}, Bangalore, ${item.pincode}`, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.areaName}
          </h3>
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-1">
            <Building2 size={14} />
            <span>{item.taluk}, {item.district}</span>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
          <span className="text-blue-700 dark:text-blue-300 font-mono font-bold text-lg tracking-wider">
            {item.pincode}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
          <span className="block text-slate-400 text-xs mb-1 uppercase tracking-wider font-semibold">State</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{item.state}</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
          <span className="block text-slate-400 text-xs mb-1 uppercase tracking-wider font-semibold">Mail Delivery</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{item.deliveryStatus || 'Unknown'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
        <button 
          onClick={openMap}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Map size={16} />
          View Map
        </button>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all"
            title="Copy Pincode"
          >
            <Copy size={18} />
          </button>
          <button 
            onClick={handleShare}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all"
            title="Share"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
