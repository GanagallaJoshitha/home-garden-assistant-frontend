import React, { useState, useEffect } from 'react';
import ReminderCard from '../components/ReminderCard';
import Modal from '../components/Modal';
import { Droplets, Calendar, Plus, Bell, Settings, Clock } from 'lucide-react';
import { gardenService } from '../services/gardenService';

const WateringReminders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      setLoading(true);
      const data = await gardenService.getReminders();
      setReminders(data);
      setLoading(false);
    };
    fetchReminders();
  }, []);

  const [newReminder, setNewReminder] = useState({ plant_name: '', time: '', amount: '' });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const reminder = await gardenService.createReminder(newReminder);
      setReminders([...reminders, reminder]);
      setIsModalOpen(false);
      setNewReminder({ plant_name: '', time: '', amount: '' });
    } catch (error) {
      console.error('Failed to create reminder:', error);
    }
  };

  const handleComplete = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-emerald-900 dark:text-white tracking-tight mb-2">Watering Reminders</h1>
          <p className="text-emerald-700/60 dark:text-slate-500 text-lg">Keep your plants hydrated and happy.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl hover:bg-gray-50 transition-colors">
            <Settings className="h-5 w-5 text-gray-600 dark:text-slate-400" />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-100"
          >
            <Plus className="h-5 w-5" />
            <span>New Reminder</span>
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="New Reminder"
      >
        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Plant Name</label>
            <input
              type="text"
              required
              value={newReminder.plant_name}
              onChange={(e) => setNewReminder({ ...newReminder, plant_name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-600 transition-all"
              placeholder="e.g., Monstera"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Time</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-600 transition-all"
                placeholder="e.g., Today, 5:00 PM"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Water Amount</label>
            <div className="relative">
              <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={newReminder.amount}
                onChange={(e) => setNewReminder({ ...newReminder, amount: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-600 transition-all"
                placeholder="e.g., 500ml"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
          >
            Create Reminder
          </button>
        </form>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
          </div>
          
          {reminders.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {reminders.map(rem => (
                <ReminderCard key={rem.id} reminder={rem} onComplete={handleComplete} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-[32px] border border-gray-100 text-center">
              <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-500">Your plants are perfectly hydrated for now.</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-emerald-900 p-8 rounded-[32px] text-white">
            <h3 className="text-xl font-bold mb-6">Quick Stats</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-emerald-100/60 font-medium">Completed Today</span>
                <span className="font-black text-emerald-400">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-100/60 font-medium">Pending Tasks</span>
                <span className="font-black text-blue-400">{reminders.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-100/60 font-medium">Missed Tasks</span>
                <span className="font-black text-red-400">0</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-900 mb-4">Pro Tip</h3>
            <p className="text-emerald-700 leading-relaxed">
              Most plants prefer to be watered in the early morning. This allows the water 
              to soak into the soil before it evaporates in the heat of the day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WateringReminders;
