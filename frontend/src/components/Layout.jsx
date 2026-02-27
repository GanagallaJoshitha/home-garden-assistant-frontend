import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Leaf, 
  LayoutDashboard, 
  Database, 
  Calendar, 
  Book, 
  Users, 
  MessageSquare, 
  Grid3X3, 
  ShoppingBag, 
  Sun, 
  Moon, 
  LogOut,
  ChevronRight,
  Sparkles,
  CheckSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/plants', label: 'Plant Database', icon: Database },
    { path: '/garden', label: 'Garden Tracker', icon: Calendar },
    { path: '/planner', label: 'Layout Planner', icon: Grid3X3 },
    { path: '/journal', label: 'Plant Journal', icon: Book },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/ai-assistant', label: 'AI Assistant', icon: MessageSquare },
  ];

  const seasonalTips = [
    "Prune your roses for better spring blooms.",
    "Start indoor seeds for summer vegetables.",
    "Check soil moisture daily as temperatures rise.",
    "Mulch your garden beds to retain moisture."
  ];

  const shoppingList = [
    { id: 1, item: 'Organic Fertilizer', done: false },
    { id: 2, item: 'Neem Oil Spray', done: true },
    { id: 3, item: 'Seedling Trays', done: false },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDark ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 h-screen glass-card z-50 flex flex-col border-r border-emerald-100 dark:border-white/5"
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 overflow-hidden">
            <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-black tracking-tighter dark:text-white"
              >
                NURTURE
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                    : 'text-slate-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600'
                }`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-bold text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Widgets (Only when open) */}
        {isSidebarOpen && (
          <div className="p-4 space-y-6">
            {/* Seasonal Tips */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Seasonal Tips</span>
              </div>
              <ul className="space-y-2">
                {seasonalTips.slice(0, 2).map((tip, i) => (
                  <li key={i} className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-tight flex items-start">
                    <ChevronRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shopping List */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-900/50 border border-emerald-100 dark:border-slate-800">
              <div className="flex items-center space-x-2 mb-3">
                <ShoppingBag className="h-4 w-4 text-emerald-600 dark:text-slate-400" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-slate-300">Shopping List</span>
              </div>
              <div className="space-y-2">
                {shoppingList.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <CheckSquare className={`h-3 w-3 ${item.done ? 'text-emerald-600' : 'text-emerald-400'}`} />
                    <span className={`text-[11px] ${item.done ? 'line-through text-slate-400' : 'text-emerald-800 dark:text-slate-300'}`}>
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-white/10 dark:border-white/5 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {isSidebarOpen && <span className="text-sm font-bold">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="text-sm font-bold">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? 280 : 80 }}
      >
        <header className="h-16 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-emerald-50/50 dark:bg-slate-950/50 border-b border-emerald-100 dark:border-white/5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors"
          >
            <Grid3X3 className="h-5 w-5 text-slate-500" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black dark:text-white">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Pro Gardener</p>
            </div>
            <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
