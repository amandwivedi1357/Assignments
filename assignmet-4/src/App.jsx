import { useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import PrivateRoute from './component/PrivateRoute';
import Home from './pages/Home'; 

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            
            {/* 
              The Home.jsx page currently acts like a login page.
              We've created a dedicated LoginPage.
              The root path "/" should ideally redirect to /login or /dashboard based on auth state.
              For now, let's make "/" redirect to "/login".
              If you want a separate landing page for "/", we can adjust Home.jsx later.
            */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add other private routes here if needed */}
            </Route>

            {/* Fallback for unmatched routes (optional) */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
