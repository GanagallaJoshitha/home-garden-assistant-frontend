import React from 'react';
import { Droplets, Sun, Thermometer } from 'lucide-react';

const PlantCard = ({ plant, onAdd }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={plant.image_url || `https://picsum.photos/seed/${plant.name}/800/600`}
          alt={plant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-emerald-700 uppercase tracking-wider">
          {plant.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plant.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{plant.description}</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center p-2 bg-blue-50 rounded-xl">
            <Droplets className="h-4 w-4 text-blue-500 mb-1" />
            <span className="text-[10px] font-bold text-blue-700 uppercase">{plant.water_needs}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-amber-50 rounded-xl">
            <Sun className="h-4 w-4 text-amber-500 mb-1" />
            <span className="text-[10px] font-bold text-amber-700 uppercase">{plant.sunlight}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-emerald-50 rounded-xl">
            <Thermometer className="h-4 w-4 text-emerald-500 mb-1" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase">{plant.difficulty}</span>
          </div>
        </div>

        <button
          onClick={() => onAdd(plant)}
          className="w-full bg-emerald-600 text-white py-2 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
        >
          Add to Garden
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
