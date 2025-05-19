import React, { useState, useEffect } from 'react';
import { fetchWeatherByCity } from './hooks/useFetchWeather';

const Favourites = ({ onCitySelect }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = JSON.parse(localStorage.getItem('favourites') || '[]');
        
        const favoritesWithWeather = await Promise.all(
          savedFavorites.map(async (city) => {
            try {
              const weatherData = await fetchWeatherByCity(`${city.name},${city.country}`);
              return {
                ...city,
                temp: Math.round(weatherData.main.temp),
                weather: weatherData.weather[0],
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed
              };
            } catch (err) {
              console.error(`Error fetching weather for ${city.name}:`, err);
              return { ...city, error: 'Weather data unavailable' };
            }
          })
        );
        
        setFavorites(favoritesWithWeather);
      } catch (err) {
        console.error('Error loading favorites:', err);
        setError('Failed to load favorites');
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const removeFromFavorites = (cityToRemove, e) => {
    e.stopPropagation();
    const updatedFavorites = favorites.filter(
      (city) => !(city.name === cityToRemove.name && city.country === cityToRemove.country)
    );
    
    localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-center p-4">{error}</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center p-8 text-white/60">
        No favorite cities yet. Add some from the weather info!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {favorites.map((city, index) => (
        <div 
          key={`${city.name}-${city.country}-${index}`}
          className="bg-night-accent/30 rounded-xl p-4 border border-white/10 hover:border-pink-500/30 transition-colors cursor-pointer"
          onClick={() => onCitySelect && onCitySelect(`${city.name},${city.country}`)}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium text-white">
                {city.name}
                <span className="ml-2 text-sm bg-night-accent/60 px-2 py-0.5 rounded text-white/60">
                  {city.country}
                </span>
              </h3>
              {city.error ? (
                <p className="text-red-400 text-sm">{city.error}</p>
              ) : (
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold text-white">{city.temp}°</span>
                  {city.weather && (
                    <span className="ml-2 capitalize text-white/80">
                      {city.weather.description}
                    </span>
                  )}
                </div>
              )}
            </div>
            {city.weather && (
              <div className="flex-shrink-0 ml-2">
                <img 
                  src={`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`}
                  alt={city.weather.description}
                  className="w-12 h-12 object-contain"
                />
              </div>
            )}
          </div>
          
          {!city.error && (
            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <div className="flex items-center text-white/70">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {city.humidity}%
              </div>
              <div className="flex items-center text-white/70">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {city.windSpeed} m/s
              </div>
            </div>
          )}
          
          <div className="mt-3 flex justify-end">
            <button
              onClick={(e) => removeFromFavorites(city, e)}
              className="text-pink-500 hover:text-pink-400 text-sm flex items-center"
              aria-label="Remove from favorites"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favourites;