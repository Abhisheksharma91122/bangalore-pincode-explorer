'use client';
import { motion } from 'framer-motion';

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 w-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2 w-1/2">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
          <div className="h-4 bg-slate-100 dark:bg-slate-700/50 rounded-md animate-pulse w-3/4"></div>
        </div>
        <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="h-16 bg-slate-50 dark:bg-slate-700/30 rounded-lg animate-pulse"></div>
        <div className="h-16 bg-slate-50 dark:bg-slate-700/30 rounded-lg animate-pulse"></div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
}
