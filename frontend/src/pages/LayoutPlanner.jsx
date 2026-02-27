import React, { useState } from 'react';
import { Grid3X3, Plus, Trash2, Save, Leaf, Move, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LayoutPlanner = () => {
  const [gridSize, setGridSize] = useState(8);
  const [placedPlants, setPlacedPlants] = useState([
    { id: 1, x: 2, y: 2, type: 'Tomato', icon: '🍅' },
    { id: 2, x: 4, y: 5, type: 'Basil', icon: '🌿' },
  ]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const availablePlants = [
    { type: 'Tomato', icon: '🍅', color: 'bg-red-100 text-red-600' },
    { type: 'Basil', icon: '🌿', color: 'bg-emerald-100 text-emerald-600' },
    { type: 'Carrot', icon: '🥕', color: 'bg-orange-100 text-orange-600' },
    { type: 'Pepper', icon: '🫑', color: 'bg-green-100 text-green-600' },
    { type: 'Lettuce', icon: '🥬', color: 'bg-lime-100 text-lime-600' },
  ];

  const handleCellClick = (x, y) => {
    if (selectedPlant) {
      const existing = placedPlants.find(p => p.x === x && p.y === y);
      if (existing) return;

      setPlacedPlants([...placedPlants, { 
        id: Date.now(), 
        x, 
        y, 
        type: selectedPlant.type, 
        icon: selectedPlant.icon 
      }]);
    }
  };

  const removePlant = (id) => {
    setPlacedPlants(placedPlants.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Controls */}
        <div className="lg:w-80 space-y-6">
          <div className="glass-card p-6 rounded-[32px]">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Plot Designer</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Select Plant</label>
                <div className="grid grid-cols-3 gap-3">
                  {availablePlants.map((p) => (
                    <button
                      key={p.type}
                      onClick={() => setSelectedPlant(p)}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                        selectedPlant?.type === p.type 
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 scale-105' 
                          : 'border-transparent bg-slate-50 dark:bg-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-2xl mb-1">{p.icon}</span>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{p.type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <p className="text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed">
                    Click on a grid cell to place your selected plant. You can plan companion planting for better yields!
                  </p>
                </div>
              </div>

              <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all">
                <Save className="h-5 w-5" />
                <span>Save Layout</span>
              </button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-[32px]">
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Companion Tips</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <span className="text-xs font-bold text-emerald-700">Tomato + Basil</span>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black">GREAT</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <span className="text-xs font-bold text-red-700">Carrot + Onion</span>
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black">GOOD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Area */}
        <div className="flex-1">
          <div className="glass-card p-8 rounded-[40px] overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
                  <Grid3X3 className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Virtual Plot</h2>
                  <p className="text-sm text-slate-500 font-medium">8x8 Garden Grid</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                  <Move className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setPlacedPlants([])}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div 
              className="grid gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl shadow-inner border border-slate-300 dark:border-slate-700"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                aspectRatio: '1/1'
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                const x = i % gridSize;
                const y = Math.floor(i / gridSize);
                const plant = placedPlants.find(p => p.x === x && p.y === y);

                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 0.98 }}
                    onClick={() => handleCellClick(x, y)}
                    className={`relative aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      plant 
                        ? 'bg-white dark:bg-slate-900 shadow-sm' 
                        : 'bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    {plant ? (
                      <motion.div 
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="text-3xl relative group"
                      >
                        {plant.icon}
                        <button 
                          onClick={(e) => { e.stopPropagation(); removePlant(plant.id); }}
                          className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </motion.div>
                    ) : (
                      <Plus className="h-4 w-4 text-slate-200 dark:text-slate-700 opacity-0 hover:opacity-100 transition-opacity" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutPlanner;
