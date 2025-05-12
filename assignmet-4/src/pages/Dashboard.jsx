import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import UserProfileCard from '../component/UserProfile';
import ThemeToggle from '../component/ThemeToggle';
import { LogOut, Info, Settings, LayoutDashboard, AlertTriangle } from 'lucide-react'; // Added Settings, LayoutDashboard, AlertTriangle
import { Link } from 'react-router-dom';

// Placeholder for DashboardMetricsCard if you want to use it, or remove if not needed.
// const DashboardMetricsCard = ({ title, value, icon: Icon, color }) => (
//   <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md transition-all hover:shadow-lg">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
//       <div className={`w-8 h-8 ${color} rounded-md flex items-center justify-center`}>
//         <Icon className="w-4 h-4 text-white" />
//       </div>
//     </div>
//     <p className="text-2xl font-semibold text-gray-800 dark:text-white">{value}</p>
//   </div>
// );

const Dashboard = () => {
  const { user, isAuthenticated, isLoading: authLoading, error: authError, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  // The PrivateRoute handles the main auth check before rendering Dashboard.
  // So, isLoading here refers to the initial loading of the context data if any sub-fetching happens, or general page readiness.
  // authLoading is already true when AuthContext is initializing.

  // Conditional Rendering based on prompt:
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
  
  // If API fetch failed (example, if user data within AuthContext indicates a fetch error)
  // Note: AuthContext's current `login` returns success/error, but doesn't keep a persistent fetch error state for the user object itself.
  // We are using `authError` from AuthContext which is set if the login API call fails.
  if (authError && !user) { // Show API error if login failed and there's no user
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

  // If authenticated but somehow user object is null (edge case)
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

  // If authenticated and user data is available:
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
              {/* Add settings link if needed */}
              {/* <Link 
                to="/settings" 
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </Link> */}
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
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Welcome, {user?.name?.split(' ')[0] || 'Developer'}!</h2>
          <p className="text-gray-600 dark:text-gray-400">This is your personal dashboard.</p>
        </div>
        
        <UserProfileCard /> 
        
        {/* Placeholder for other dashboard content if any */}
        {/* <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Future Dashboard Widgets</h3>
          <p className="text-gray-600 dark:text-gray-400">More content can go here...</p>
        </div> */}
      </main>

      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-auto">
        DevBoard &copy; {new Date().getFullYear()} - All rights reserved (for demo).
      </footer>
    </div>
  );
};

export default Dashboard;
