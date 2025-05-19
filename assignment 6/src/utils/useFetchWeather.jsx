// In useFetchWeather.jsx
export const fetchWeatherByCoords = async (lat, lon) => {
    const response = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data for your location');
    }
    
    return await response.json();
  };