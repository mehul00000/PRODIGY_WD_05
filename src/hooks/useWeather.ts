import { useState, useCallback } from 'react';
import { WeatherData, TemperatureUnit, GeolocationCoords, ForecastDay } from '../types/weather';
import { fetchWeatherByCity, fetchWeatherByCoords, fetchForecast } from '../utils/weatherApi';

interface UseWeatherState {
  data: WeatherData | null;
  forecast: ForecastDay[] | null;
  loading: boolean;
  error: string | null;
}

export const useWeather = () => {
  const [state, setState] = useState<UseWeatherState>({
    data: null,
    forecast: null,
    loading: false,
    error: null,
  });

  const searchByCity = useCallback(async (city: string, units: TemperatureUnit) => {
    if (!city.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter a city name' }));
      return;
    }

    setState({ data: null, forecast: null, loading: true, error: null });

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city, units),
        fetchForecast(city, units)
      ]);
      
      setState({ 
        data: weatherData, 
        forecast: forecastData, 
        loading: false, 
        error: null 
      });
    } catch (error) {
      setState({ 
        data: null, 
        forecast: null,
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch weather data' 
      });
    }
  }, []);

  const searchByCoords = useCallback(async (coords: GeolocationCoords, units: TemperatureUnit) => {
    setState({ data: null, forecast: null, loading: true, error: null });

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCoords(coords, units),
        fetchForecast('new delhi', units) // Default forecast for coordinates
      ]);
      
      setState({ 
        data: weatherData, 
        forecast: forecastData, 
        loading: false, 
        error: null 
      });
    } catch (error) {
      setState({ 
        data: null, 
        forecast: null,
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch weather data' 
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    searchByCity,
    searchByCoords,
    clearError,
  };
};