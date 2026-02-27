import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Database, 
  Calendar, 
  Book, 
  Users, 
  Plus, 
  TrendingUp, 
  Droplets, 
  AlertCircle 
} from 'lucide-react';
import { gardenService } from '../services/gardenService';
import { journalService } from '../services/journalService';
import { communityService } from '../services/communityService';
import { plantService } from '../services/plantService';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [garden, journal, posts, plants] = await Promise.all([
          gardenService.getGarden(),
          journalService.getAll(),
          communityService.getPosts(),
          plantService.getAll(),
          gardenService.getReminders()
        ]);
        
        const allReminders = await gardenService.getReminders();

        setStats([
          { label: 'My Plants', value: garden.length.toString(), icon: Database, color: 'bg-emerald-100 text-emerald-600' },
          { label: 'Reminders', value: allReminders.length.toString(), icon: Calendar, color: 'bg-blue-100 text-blue-600' },
          { label: 'Journal Entries', value: journal.length.toString(), icon: Book, color: 'bg-amber-100 text-amber-600' },
          { label: 'Community Posts', value: posts.length.toString(), icon: Users, color: 'bg-purple-100 text-purple-600' },
        ]);
        setReminders(allReminders.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
          Welcome back, <span className="text-emerald-600">{user?.email?.split('@')[0]}</span>
        </h1>
        <p className="text-gray-500 text-lg">Here's what's happening in your garden today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-emerald-50/50 dark:bg-slate-900 p-6 rounded-3xl border border-emerald-100 dark:border-white/5 hover:shadow-xl transition-all group">
            <div className={`h-12 w-12 ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-emerald-700/60 dark:text-gray-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black text-emerald-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-emerald-50/50 dark:bg-slate-900 p-8 rounded-[32px] border border-emerald-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-emerald-900 dark:text-white tracking-tight">Recent Activity</h2>
              <Link to="/journal" className="text-emerald-600 font-bold hover:underline">View All</Link>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-emerald-100/50 transition-colors">
                  <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 dark:text-white">Added Monstera Deliciosa to garden</p>
                    <p className="text-sm text-emerald-700/60 dark:text-gray-500">2 hours ago • Growth Tracking</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/plants" className="bg-emerald-600 p-8 rounded-[32px] text-white hover:bg-emerald-700 transition-all group relative overflow-hidden shadow-xl shadow-emerald-100">
              <Plus className="h-12 w-12 mb-4 group-hover:rotate-90 transition-transform" />
              <h3 className="text-2xl font-black mb-2">Add New Plant</h3>
              <p className="text-emerald-100 font-medium">Browse our database of 500+ species</p>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-white/10 rounded-full" />
            </Link>
            <Link to="/journal" className="bg-emerald-900 p-8 rounded-[32px] text-white hover:bg-emerald-950 transition-all group relative overflow-hidden shadow-xl shadow-emerald-900/20">
              <Book className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-2">Write Journal</h3>
              <p className="text-emerald-100/60 font-medium">Document your progress today</p>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-white/10 rounded-full" />
            </Link>
          </div>
        </div>

        {/* Sidebar / Reminders */}
        <div className="space-y-8">
          <div className="bg-emerald-50/50 dark:bg-slate-900 p-8 rounded-[32px] border border-emerald-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-emerald-900 dark:text-white tracking-tight">Reminders</h2>
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="space-y-4">
              {reminders.map((rem, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-emerald-100/50 bg-emerald-100/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-900 dark:text-white">{rem.plant_name}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">
                      Water
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700/60 dark:text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {rem.time}
                  </p>
                </div>
              ))}
            </div>
            <Link to="/reminders" className="block w-full text-center mt-8 py-3 bg-emerald-100/30 text-emerald-900 font-bold rounded-2xl hover:bg-emerald-100/50 transition-colors">
              Manage All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
