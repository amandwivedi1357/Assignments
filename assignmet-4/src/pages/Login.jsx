import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeToggle from '../component/ThemeToggle';
import { LogIn, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const { isAuthenticated, login, isLoading, error } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    setShowError(false);
    const result = await login();
    if (!result.success) {
      setShowError(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} p-4 transition-colors duration-500`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-4xl font-bold">D</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Welcome to DevBoard</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Your personal developer dashboard.</p>
        
        {showError && error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-700 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Login with Dummy User
            </>
          )}
        </button>
      </div>
      <footer className="mt-8 text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} DevBoard. For demonstration purposes.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
