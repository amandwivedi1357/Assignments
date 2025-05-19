const getCitySuggestions = async (query) => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch city suggestions');
    }
    
    const data = await response.json();
    return data.map(city => ({
      name: `${city.name}, ${city.country}`,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state
    }));
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
};

export default getCitySuggestions;