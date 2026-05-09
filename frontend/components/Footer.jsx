export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-500 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()} Bangalore Pincode Explorer. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API</a>
        </div>
      </div>
    </footer>
  );
}
