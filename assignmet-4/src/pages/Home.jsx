import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeToggle from '../component/ThemeToggle';

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-4 transition-colors duration-500`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to DevBoard!</h1>
        <p className="text-lg mb-8">
          Your new favorite place to manage your developer profile and status.
        </p>
        <div className="space-x-4">
          <Link 
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Go to Login
          </Link>
          <Link 
            to="/about"
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;