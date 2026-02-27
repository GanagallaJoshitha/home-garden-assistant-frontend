import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Leaf, Shield, Zap, Heart, Sparkles, Users, Globe, Star, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  const { demoSignIn } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    demoSignIn();
    navigate('/dashboard');
  };

  return (
    <div className={`transition-colors duration-500 ${isDark ? 'dark bg-slate-950 text-white' : 'bg-emerald-50/30 text-slate-900'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] backdrop-blur-md bg-emerald-50/50 dark:bg-slate-950/50 border-b border-emerald-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter dark:text-white">NURTURE</span>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/login" className="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors">
              Login
            </Link>
            <Link to="/register" className="hidden sm:block bg-emerald-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20">
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-black uppercase tracking-widest mb-8 shadow-sm">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>The #1 Home Gardening Assistant</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] mb-8">
              NURTURE YOUR <br />
              <span className="text-emerald-600">GREEN SPACE</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed font-medium">
              The all-in-one companion for plant lovers. Track growth, set reminders, 
              and use AI to diagnose your plants' health.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center group"
              >
                Get Started
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleDemoLogin}
                className="w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-white/5 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg"
              >
                Try Demo
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[1000px] h-[1000px] bg-emerald-100/30 dark:bg-emerald-900/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Gardeners', value: '50k+', icon: Users },
              { label: 'Plants Tracked', value: '1.2M', icon: Leaf },
              { label: 'Countries', value: '120+', icon: Globe },
              { label: 'App Rating', value: '4.9/5', icon: Star },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-center">
                  <stat.icon className="h-6 w-6 text-emerald-600 mb-2" />
                </div>
                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-emerald-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Everything you need to thrive.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto">
              We've built the ultimate toolkit for modern gardeners, from beginners to experts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'AI Diagnostics', desc: 'Snap a photo and let our AI identify pests and diseases instantly.', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-100' },
              { title: 'Growth Tracking', desc: 'Visualize your plants progress with time-lapse journals and stats.', icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-100' },
              { title: 'Community Feed', desc: 'Share your harvest and learn from a global network of experts.', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100' },
            ].map((feat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className={`h-16 w-16 ${feat.bg} dark:bg-opacity-10 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}>
                  <feat.icon className={`h-8 w-8 ${feat.color}`} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{feat.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 rounded-[60px] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl shadow-emerald-500/30">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter leading-[0.85]">
                YOUR GARDEN <br /> IS WAITING.
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/register"
                  className="w-full sm:w-auto bg-white text-emerald-600 px-12 py-6 rounded-2xl font-black text-2xl hover:bg-emerald-50 transition-all shadow-2xl"
                >
                  Join Now
                </Link>
                <button
                  onClick={handleDemoLogin}
                  className="w-full sm:w-auto bg-emerald-700 text-white px-12 py-6 rounded-2xl font-black text-2xl hover:bg-emerald-800 transition-all"
                >
                  Explore Demo
                </button>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter dark:text-white">NURTURE</span>
          </div>
          <div className="flex items-center space-x-8 text-sm font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
          </div>
          <p className="text-slate-400 font-bold text-sm">© 2024 Nurture AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
