import { useState, useCallback } from 'react';

const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    city: '',
    loading: false,
    error: null
  });

  const fetchLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by your browser'
      }));
      return null;
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocoding to get city name
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch location data');
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const locationData = {
          lat: latitude,
          lon: longitude,
          city: data[0].name,
          country: data[0].country,
          state: data[0].state,
          loading: false,
          error: null
        };
        
        setLocation(locationData);
        return locationData;
      }
      
      throw new Error('No location data found');
      
    } catch (error) {
      const errorMessage = error.message || 'Could not fetch location data';
      setLocation({
        lat: null,
        lon: null,
        city: '',
        loading: false,
        error: errorMessage
      });
      return null;
    }
  }, []);

  // Initial location fetch on mount
  // useEffect(() => {
  //   fetchLocation();
  // }, [fetchLocation]);


  return {
    ...location,
    fetchLocation
  };
};

export default useCurrentLocation;