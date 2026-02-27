import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Plus, ChevronRight, Leaf, Droplets, AlertCircle, Heart, Thermometer, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { gardenService } from '../services/gardenService';

const GardenTracker = () => {
  const [garden, setGarden] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGarden = async () => {
      setLoading(true);
      const data = await gardenService.getGarden();
      setGarden(data);
      setLoading(false);
    };
    fetchGarden();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Garden Tracker</h1>
          <p className="text-slate-500 text-lg font-medium">Monitor your green family's vital signs.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="glass-card px-4 py-2 rounded-xl flex items-center space-x-2 border-amber-200 bg-amber-50 dark:bg-amber-900/10">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">2 Plants Need Water</span>
          </div>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-emerald-700 transition-all flex items-center space-x-2 shadow-xl shadow-emerald-500/20">
            <Plus className="h-5 w-5" />
            <span>Add Plant</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {garden.map((item) => (
          <motion.div 
            key={item.id} 
            whileHover={{ y: -4 }}
            className="glass-card p-8 rounded-[40px] group relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
              {/* Plant Info */}
              <div className="flex items-center space-x-8">
                <div className="h-24 w-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-[32px] flex items-center justify-center group-hover:rotate-6 transition-transform shadow-inner">
                  <Leaf className="h-12 w-12 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{item.name}</h3>
                    {item.needsWater && (
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center"
                      >
                        <Droplets className="h-3 w-3 mr-1" />
                        Needs Water
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 mt-1 space-x-6">
                    <span className="flex items-center text-sm font-bold">
                      <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                      Planted: {new Date(item.planted).toLocaleDateString()}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.status === 'Flourishing' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 
                      item.status === 'Healthy' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vitals */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Growth Progress</span>
                    </div>
                    <span className="text-sm font-black text-emerald-600">{item.progress}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-emerald-600 rounded-full shadow-lg shadow-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-pink-500" />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Health Index</span>
                    </div>
                    <span className="text-sm font-black text-pink-500">{item.health}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.health}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-pink-500 rounded-full shadow-lg shadow-pink-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button className="h-14 w-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group/btn border border-slate-100 dark:border-white/5">
                  <Thermometer className="h-6 w-6 text-slate-400 group-hover/btn:text-emerald-600 transition-colors" />
                </button>
                <button className="h-14 w-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group/btn border border-slate-100 dark:border-white/5">
                  <ChevronRight className="h-6 w-6 text-slate-400 group-hover/btn:text-emerald-600 group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -bottom-12 -right-12 h-48 w-48 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        ))}
      </div>

      {/* Seasonal Alert */}
      <div className="mt-12 bg-emerald-600 rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl shadow-emerald-500/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              <span>Seasonal Insight</span>
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight">Spring is coming! Time to prep your soil.</h2>
            <p className="text-emerald-100 text-lg font-medium leading-relaxed">
              Based on your location and garden history, we recommend starting your tomato seeds indoors this week for a bountiful summer harvest.
            </p>
          </div>
          <button className="bg-white text-emerald-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-emerald-50 transition-all shadow-2xl whitespace-nowrap">
            View Prep Guide
          </button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      </div>
    </div>
  );
};

export default GardenTracker;
