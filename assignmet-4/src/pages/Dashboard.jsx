import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import UserProfileCard from '../component/UserProfile';
import ThemeToggle from '../component/ThemeToggle';
import { LogOut, Info, Settings, LayoutDashboard, AlertTriangle } from 'lucide-react'; // Added Settings, LayoutDashboard, AlertTriangle
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const { user, isAuthenticated, isLoading: authLoading, error: authError, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <LayoutDashboard className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">Loading your data…</h2>
        </div>
      </div>
    );
  }

  // This case should ideally be caught by PrivateRoute, but as a fallback:
  if (!isAuthenticated && !authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <AlertTriangle className="w-12 h-12 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">Please login to see your dashboard.</h2>
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold py-2 px-4 border border-blue-500 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }
  
  if (authError && !user) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">Failed to load profile.</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">({authError})</p>
          <Link 
            to="/login" 
            onClick={() => logout()} /* Optionally clear auth state on return */
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold py-2 px-4 border border-blue-500 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            Try Login Again
          </Link>
        </div>
      </div>
    );
  }

  if (isAuthenticated && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <AlertTriangle className="w-12 h-12 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">User data not available.</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Please try refreshing or logging in again.</p>
           <button 
            onClick={logout}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold py-2 px-4 border border-red-500 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition-colors mt-2"
          >
            Logout & Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-500`}>
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">DevBoard</h1>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <ThemeToggle />
              <Link 
                to="/about"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="About"
              >
                <Info className="w-5 h-5" />
              </Link>
             
              <button
                onClick={logout} 
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-blue-400">Welcome, {user?.name?.split(' ')[0] || 'Developer'}!</h2>
          <p className="text-gray-600 dark:text-gray-400">This is your personal dashboard.</p>
        </div>
        
        <UserProfileCard /> 
        
      </main>

      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-auto">
        DevBoard &copy; {new Date().getFullYear()} - All rights reserved (for demo).
      </footer>
    </div>
  );
};

export default Dashboard;
