import React, { useState, useEffect } from 'react';
import PlantCard from '../components/PlantCard';
import { Search, Filter, Loader2 } from 'lucide-react';
import { plantService } from '../services/plantService';

const PlantDatabase = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      const data = await plantService.getAll();
      setPlants(data);
      setLoading(false);
    };
    fetchPlants();
  }, []);

  const filteredPlants = plants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (plant) => {
    alert(`Added ${plant.name} to your garden!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-emerald-900 dark:text-white tracking-tight mb-2">Plant Database</h1>
          <p className="text-emerald-700/60 dark:text-gray-500 text-lg">Discover your next green companion.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100 dark:border-white/5 rounded-2xl outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all font-medium dark:text-white"
            />
          </div>
          <button className="p-3 bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100 dark:border-white/5 rounded-2xl hover:bg-emerald-100/50 transition-colors">
            <Filter className="h-5 w-5 text-emerald-600" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Loading Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlants.map(plant => (
            <PlantCard key={plant.id} plant={plant} onAdd={handleAdd} />
          ))}
        </div>
      )}

      {!loading && filteredPlants.length === 0 && (
        <div className="text-center py-32">
          <p className="text-xl text-gray-500 font-medium">No plants found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default PlantDatabase;
