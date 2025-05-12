import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeToggle from '../component/ThemeToggle';
import { ArrowLeft, Info, Github } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const About = () => {
  const { theme } = useContext(ThemeContext);

  const features = [
    {
      title: 'User Authentication',
      description: 'Simulated login system with protected routes and persistent session storage',
      icon: Info
    },
    {
      title: 'Theme Switching',
      description: 'Toggle between light and dark mode with preferences saved in browser storage',
      icon: ThemeToggle
    },
    {
      title: 'API Integration',
      description: 'Fetches user data from JSONPlaceholder API to simulate a real backend',
      icon: Github
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to={"/dashboard"} className="mr-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">D</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">DevBoard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About DevBoard</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              A personal dashboard for developers to track their status and activities
            </p>
          </div>

          <div className="prose text-gray-600 dark:text-gray-400 max-w-none dark:prose-invert mb-12">
            <p>
              DevBoard is a demonstration application showcasing various React patterns and hooks including:
            </p>
            <ul>
              <li>Context API for global state management</li>
              <li>Routing with protected routes</li>
              <li>Form handling with useRef for focus management</li>
              <li>API integration with useEffect and axios</li>
              <li>Conditional rendering based on auth state</li>
              <li>Theme switching with localStorage persistence</li>
            </ul>
            <p>
              This app simulates a developer dashboard where authenticated users can update their status message,
              view profile information, and navigate between different sections.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technical Implementation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Context API</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Uses React's Context API to manage authentication state and theme preferences
                  throughout the application without prop drilling.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Protected Routes</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Implements route protection to redirect unauthenticated users to the login page
                  when they attempt to access private routes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Local Storage</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Persists authentication and theme preferences in the browser's localStorage
                  to maintain state across page refreshes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;