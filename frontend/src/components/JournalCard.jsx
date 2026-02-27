import React from 'react';
import { Calendar, Tag } from 'lucide-react';

const JournalCard = ({ entry }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{new Date(entry.created_at).toLocaleDateString()}</span>
        </div>
        {entry.plant_name && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold uppercase">
            <Tag className="h-3 w-3" />
            <span>{entry.plant_name}</span>
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{entry.title}</h3>
      <p className="text-gray-600 leading-relaxed">{entry.content}</p>
      {entry.image_url && (
        <img
          src={entry.image_url}
          alt={entry.title}
          className="mt-4 rounded-xl w-full h-48 object-cover"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};

export default JournalCard;
