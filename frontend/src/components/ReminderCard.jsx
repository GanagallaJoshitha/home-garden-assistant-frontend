import React from 'react';
import { Droplets, Clock, CheckCircle2 } from 'lucide-react';

const ReminderCard = ({ reminder, onComplete }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
          <Droplets className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{reminder.plant_name}</h4>
          <div className="flex items-center text-sm text-gray-500 space-x-3">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {reminder.time}
            </span>
            <span className="flex items-center">
              <Droplets className="h-3 w-3 mr-1" />
              {reminder.amount}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onComplete(reminder.id)}
        className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
      >
        <CheckCircle2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ReminderCard;
