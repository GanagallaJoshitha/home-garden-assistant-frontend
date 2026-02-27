import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PlantDatabase from './pages/PlantDatabase';
import GardenTracker from './pages/GardenTracker';
import WateringReminders from './pages/WateringReminders';
import PlantJournal from './pages/PlantJournal';
import Community from './pages/Community';

import AIAssistant from './pages/AIAssistant';
import LayoutPlanner from './pages/LayoutPlanner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );
  
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/plants" element={<PrivateRoute><PlantDatabase /></PrivateRoute>} />
            <Route path="/garden" element={<PrivateRoute><GardenTracker /></PrivateRoute>} />
            <Route path="/reminders" element={<PrivateRoute><WateringReminders /></PrivateRoute>} />
            <Route path="/journal" element={<PrivateRoute><PlantJournal /></PrivateRoute>} />
            <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
            <Route path="/ai-assistant" element={<PrivateRoute><AIAssistant /></PrivateRoute>} />
            <Route path="/planner" element={<PrivateRoute><LayoutPlanner /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
