import React, { useState, useEffect } from 'react';
import JournalCard from '../components/JournalCard';
import Modal from '../components/Modal';
import { Book, Plus, Search, Filter, Calendar, Image as ImageIcon } from 'lucide-react';
import { journalService } from '../services/journalService';

const PlantJournal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      const data = await journalService.getAll();
      setEntries(data);
      setLoading(false);
    };
    fetchEntries();
  }, []);

  const [newEntry, setNewEntry] = useState({ title: '', plant_name: '', content: '' });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const entry = await journalService.create(newEntry);
      setEntries([entry, ...entries]);
      setIsModalOpen(false);
      setNewEntry({ title: '', plant_name: '', content: '' });
    } catch (error) {
      console.error('Failed to create journal entry:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-emerald-900 dark:text-white tracking-tight mb-2">Plant Journal</h1>
          <p className="text-emerald-700/60 dark:text-slate-500 text-lg">Capture every milestone of your gardening journey.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-100"
        >
          <Plus className="h-5 w-5" />
          <span>New Entry</span>
        </button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="New Journal Entry"
      >
        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Entry Title</label>
            <input
              type="text"
              required
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-600 transition-all"
              placeholder="e.g., First Bloom"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Plant Name</label>
            <input
              type="text"
              required
              value={newEntry.plant_name}
              onChange={(e) => setNewEntry({ ...newEntry, plant_name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-600 transition-all"
              placeholder="e.g., Monstera"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Content</label>
            <textarea
              required
              rows={4}
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-600 transition-all resize-none"
              placeholder="What happened today?"
            />
          </div>
          <div className="p-4 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all cursor-pointer">
            <ImageIcon className="h-8 w-8 mb-2" />
            <span className="text-xs font-bold uppercase tracking-widest">Upload Photo</span>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
          >
            Save Entry
          </button>
        </form>
      </Modal>

      <div className="flex items-center space-x-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400" />
          <input
            type="text"
            placeholder="Search journal..."
            className="w-full pl-12 pr-4 py-3 bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100 dark:border-white/5 rounded-2xl outline-none focus:border-emerald-600 transition-all font-medium dark:text-white"
          />
        </div>
        <button className="p-3 bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100 dark:border-white/5 rounded-2xl hover:bg-emerald-100/50 transition-colors">
          <Filter className="h-5 w-5 text-emerald-600" />
        </button>
        <button className="p-3 bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100 dark:border-white/5 rounded-2xl hover:bg-emerald-100/50 transition-colors">
          <Calendar className="h-5 w-5 text-emerald-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {entries.map(entry => (
          <JournalCard key={entry.id} entry={entry} />
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-32">
          <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Book className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No entries yet</h3>
          <p className="text-gray-500 mb-8">Start documenting your plants' growth today.</p>
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all">
            Create Your First Entry
          </button>
        </div>
      )}
    </div>
  );
};

export default PlantJournal;
