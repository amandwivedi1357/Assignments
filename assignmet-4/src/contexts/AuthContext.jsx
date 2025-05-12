import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('devboard_auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/5');
      const userData = response.data;
      
      // Add a default status message
      userData.statusMessage = "Ready to code!";
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store auth data in localStorage
      localStorage.setItem('devboard_auth', JSON.stringify({ isAuthenticated: true, user: userData }));
      
      return { success: true };
    } catch (err) {
      setError('Failed to login. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('devboard_auth');
  };

  const updateUserStatus = (newStatus) => {
    const updatedUser = { ...user, statusMessage: newStatus };
    setUser(updatedUser);
    localStorage.setItem('devboard_auth', JSON.stringify({ isAuthenticated: true, user: updatedUser }));
    return true;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        logout, 
        isLoading, 
        error,
        updateUserStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};