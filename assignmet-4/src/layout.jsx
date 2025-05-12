import React from 'react';
import { ThemeProvider } from './components/contexts/ThemeContext';

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <style jsx="true">{`
          :root {
            --background: 0 0% 100%;
            --foreground: 222.2 47.4% 11.2%;
            --primary: 221.2 83.2% 53.3%;
            --primary-foreground: 210 40% 98%;
          }
          
          [data-theme="dark"] {
            --background: 240 10% 3.9%;
            --foreground: 0 0% 98%;
            --primary: 217.2 91.2% 59.8%;
            --primary-foreground: 222.2 47.4% 11.2%;
          }
          
          body {
            font-family: 'Inter', sans-serif;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.3s ease-out;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      {children}
    </ThemeProvider>
  );
}