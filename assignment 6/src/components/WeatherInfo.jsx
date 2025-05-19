import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from '../utils/formatDate';

const WeatherInfo = ({ data, lastUpdated }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Check if current city is in favorites when component mounts or data changes
    if (data?.name) {
      const favorites = JSON.parse(localStorage.getItem('favourites') || '[]');
      setIsFavorite(favorites.some(city => city.name === data.name && city.country === data.sys.country));
    }
  }, [data]);

  if (!data) return null;
  
  const { 
    name,
    main: { temp, feels_like, humidity },
    weather,
    wind,
    sys: { country }
  } = data;
  
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favourites') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(
        city => !(city.name === name && city.country === country)
      );
      localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      const cityData = { name, country };
      localStorage.setItem('favourites', JSON.stringify([...favorites, cityData]));
    }
    
    setIsFavorite(!isFavorite);
  };
  
  const weatherCondition = weather[0];
  const windSpeed = wind.speed;
  
  const temperature = Math.round(temp);
  const feelsLike = Math.round(feels_like);
  
  const getIconPath = (code) => {
    const weatherCode = code.toString();
    
    if (weatherCode === '800') {
      return 'clear';
    } else if (weatherCode.startsWith('8')) {
      return 'clouds';
    } else if (weatherCode.startsWith('7')) {
      return 'mist';
    } else if (weatherCode.startsWith('6')) {
      return 'snow';
    } else if (weatherCode.startsWith('5')) {
      return 'rain';
    } else if (weatherCode.startsWith('3')) {
      return 'drizzle';
    } else if (weatherCode.startsWith('2')) {
      return 'thunderstorm';
    }
    return 'unknown';
  };
  
  const getTempGlowColor = (temp) => {
    if (temp <= 0) return 'shadow-neon-blue';
    if (temp > 30) return 'shadow-neon-pink';
    return 'shadow-neon-purple';
  };
  
  const iconType = getIconPath(weatherCondition.id);
  const tempGlowClass = getTempGlowColor(temperature);

  return (
    <div className="w-full max-w-md mx-auto glass-card animate-fade-in">
      <div className="flex flex-col p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white flex items-center">
              {name}
              <span className="ml-2 text-sm bg-night-accent/60 px-2 py-0.5 rounded text-white/60">{country}</span>
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Updated {lastUpdated ? formatDistanceToNow(lastUpdated) : 'just now'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleFavorite}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill={isFavorite ? "#ec4899" : "none"} 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke={"#ec4899"} 
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
            <div className="bg-white/5 rounded-full p-1 border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className={`text-6xl font-bold text-white mb-0 ${tempGlowClass}`}>
              {temperature}°
            </div>
            <div className="ml-2 flex flex-col">
              <span className="text-white/70 text-sm">Feels like {feelsLike}°</span>
              <span className="capitalize text-white font-medium">{weatherCondition.description}</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-20 h-20 bg-night-accent/30 rounded-full p-4 border border-white/10">
            <img 
              src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@2x.png`} 
              alt={weatherCondition.description}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-night-accent/30 rounded-xl p-4 border border-white/10">
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/70 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
              <span className="text-white/70 text-sm">Humidity</span>
            </div>
            <div className="text-xl font-medium text-white">{humidity}%</div>
          </div>
          
          <div className="bg-night-accent/30 rounded-xl p-4 border border-white/10">
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/70 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
              </svg>
              <span className="text-white/70 text-sm">Wind Speed</span>
            </div>
            <div className="text-xl font-medium text-white">{windSpeed} m/s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;