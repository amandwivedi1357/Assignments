import React from 'react';

const Loading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="relative w-16 h-16 mb-4">
       
        <div className="absolute inset-0 border-4 border-transparent border-t-glow-purple border-r-glow-blue rounded-full animate-spin-slow"></div>
        
   
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-pulse-slow"></div>
      </div>
      <p className="text-white/80 text-lg">Fetching weather data...</p>
    </div>
  );
};

export default Loading;