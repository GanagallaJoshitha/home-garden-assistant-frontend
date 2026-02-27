import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LogOut, User, LayoutDashboard, Database, Calendar, Book, Users } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">Nurture</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-emerald-600 flex items-center space-x-1">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/plants" className="text-gray-600 hover:text-emerald-600 flex items-center space-x-1">
                  <Database className="h-4 w-4" />
                  <span>Database</span>
                </Link>
                <Link to="/garden" className="text-gray-600 hover:text-emerald-600 flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Tracker</span>
                </Link>
                <Link to="/reminders" className="text-gray-600 hover:text-emerald-600 flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Reminders</span>
                </Link>
                <Link to="/journal" className="text-gray-600 hover:text-emerald-600 flex items-center space-x-1">
                  <Book className="h-4 w-4" />
                  <span>Journal</span>
                </Link>
                <Link to="/community" className="text-gray-600 hover:text-emerald-600 flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-red-600 flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-emerald-600 font-medium">Login</Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
