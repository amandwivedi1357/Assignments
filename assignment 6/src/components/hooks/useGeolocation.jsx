import { useState, useCallback } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    loading: false,
    error: null,
    coordinates: null
  });

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false
      }));
      return;
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          loading: false,
          error: null,
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
        });
      },
      (error) => {
        let errorMessage = 'Failed to get your location';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Please allow location access to get weather for your current location';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get your location timed out';
            break;
          default:
            errorMessage = 'An unknown error occurred';
        }
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: errorMessage
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  return { ...location, getCurrentLocation };
};
