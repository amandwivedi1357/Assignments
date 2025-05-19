import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherInfo from './WeatherInfo';
import Loading from './Loading';
import Error from './Error';
import useFetchWeather from './hooks/useFetchWeather';
import Favourites from './Favourites';

const WeatherApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [locationFetching, setLocationFetching] = useState(false);

  const { data, isLoading, error, refetch } = useFetchWeather(searchQuery);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowFavorites(false);
  };

  const handleCitySelect = (cityQuery) => {
    setSearchQuery(cityQuery);
    setShowFavorites(false);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLocationFetching(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const locationData = await response.json();
          const city = locationData.city || locationData.locality || locationData.principalSubdivision;

          if (city) {
            setSearchQuery(city);
            setShowFavorites(false);
          } else {
            alert('Could not determine city name');
          }
        } catch (err) {
          console.error(err);
          alert('Failed to get location info');
        } finally {
          setLocationFetching(false);
        }
      },
      (error) => {
        console.error(error);
        alert('Unable to retrieve your location');
        setLocationFetching(false);
      }
    );
  };

  useEffect(() => {
    if (data && searchQuery) {
      setLastUpdated(new Date());
    }
  }, [data, searchQuery]);

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-start px-4 py-12 bg-night-gradient overflow-hidden">
      <div className="stars"></div>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Weather App
        </h1>
        <p className="text-white/60">Real-time weather in a beautiful interface</p>
      </div>

      <div className="w-full max-w-md mb-6">
        <SearchBar onSearch={handleSearch} />

        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={toggleFavorites}
            className="text-white/80 hover:text-white transition-colors flex items-center text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
          </button>

          <button
            onClick={handleUseMyLocation}
            className="text-white/80 hover:text-white transition-colors flex items-center text-sm"
          >
            📍 Use My Location
          </button>
        </div>
      </div>

      {showFavorites ? (
        <Favourites onCitySelect={handleCitySelect} />
      ) : (
        <div className="w-full max-w-md">
          {(isLoading || locationFetching) && <Loading />}
          {error && <Error message={error} />}
          {!isLoading && !locationFetching && !error && data && (
            <WeatherInfo data={data} lastUpdated={lastUpdated} />
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
