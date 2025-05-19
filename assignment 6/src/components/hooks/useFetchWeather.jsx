import { useState, useEffect, useCallback } from 'react';

const API_KEY = '4c8d21d4fe6aa180bad4528f62cd79c4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = async (city) => {
  if (!city?.trim()) {
    throw new Error('City name is required');
  }

  const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error(response.status === 404 
      ? `City "${city}" not found. Please check the spelling and try again.` 
      : 'Failed to fetch weather data. Please try again.');
  }
  
  return await response.json();
};

const useFetchWeather = (city) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!city?.trim()) {
      setData(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchWeatherByCity(city);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [city, fetchData]);

  return { data, isLoading, error };
};

export default useFetchWeather;