import React, { useState, useEffect } from 'react';
import { TemperatureUnit } from './types/weather';
import { useWeather } from './hooks/useWeather';
import { getCurrentLocation } from './utils/geolocation';
import { getTimeBasedBackground, getLocationInfo } from './utils/weatherApi';
import { SearchBar } from './components/SearchBar';
import { UnitToggle } from './components/UnitToggle';
import { WeatherCard } from './components/WeatherCard';
import { WeatherStats } from './components/WeatherStats';
import { ForecastCard } from './components/ForecastCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { AnimatedBackground } from './components/AnimatedBackground';

function App() {
  const [unit, setUnit] = useState<TemperatureUnit>('metric');
  const { data, forecast, loading, error, searchByCity, searchByCoords, clearError } = useWeather();
  const [backgroundClass, setBackgroundClass] = useState('city-day clear');
  const [locationType, setLocationType] = useState<'city' | 'village' | 'town'>('city');

  useEffect(() => {
    if (data) {
      const locationInfo = getLocationInfo(data.name);
      setLocationType(locationInfo.type);
      
      const newBackground = getTimeBasedBackground(
        data.timezone, 
        data.weather[0].main, 
        locationInfo.type
      );
      setBackgroundClass(newBackground);
    } else {
      // Use local time-based background when no city data
      const localTimezone = -(new Date().getTimezoneOffset() * 60);
      const newBackground = getTimeBasedBackground(localTimezone, 'Clear', 'city');
      setBackgroundClass(newBackground);
    }
  }, [data]);

  // Set initial background based on local time
  useEffect(() => {
    const localTimezone = -(new Date().getTimezoneOffset() * 60);
    const initialBackground = getTimeBasedBackground(localTimezone, 'Clear', 'city');
    setBackgroundClass(initialBackground);
  }, []);

  const handleCitySearch = (city: string) => {
    searchByCity(city, unit);
  };

  const handleLocationSearch = async () => {
    try {
      const coords = await getCurrentLocation();
      searchByCoords(coords, unit);
    } catch (error) {
      console.error('Failed to get location:', error);
      // For demo, just search London when location fails
      searchByCity('London', unit);
    }
  };

  const handleUnitToggle = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    if (data) {
      // Re-fetch data with new unit
      searchByCity(data.name, newUnit);
    }
  };

  const getCurrentTimeInfo = () => {
    if (data) {
      // Get time in the searched city
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const cityTime = new Date(utc + (data.timezone * 1000));
      const hours = cityTime.getHours();
      
      let timeOfDay = '';
      if (hours >= 5 && hours < 8) timeOfDay = 'Sunrise';
      else if (hours >= 8 && hours < 17) timeOfDay = 'Day';
      else if (hours >= 17 && hours < 19) timeOfDay = 'Sunset';
      else timeOfDay = 'Night';
      
      return {
        time: cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeOfDay,
        city: data.name
      };
    } else {
      // Show local time
      const now = new Date();
      const hours = now.getHours();
      
      let timeOfDay = '';
      if (hours >= 5 && hours < 8) timeOfDay = 'Sunrise';
      else if (hours >= 8 && hours < 17) timeOfDay = 'Day';
      else if (hours >= 17 && hours < 19) timeOfDay = 'Sunset';
      else timeOfDay = 'Night';
      
      return {
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeOfDay,
        city: 'Local'
      };
    }
  };

  const timeInfo = getCurrentTimeInfo();
  const isDay = timeInfo.timeOfDay === 'Day' || timeInfo.timeOfDay === 'Sunrise';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground 
        backgroundClass={backgroundClass}
        locationType={locationType}
        weatherMain={data?.weather[0].main || 'Clear'}
        isDay={isDay}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-light text-white mb-4 animate-in fade-in-0 slide-in-from-top-8 duration-1000 drop-shadow-lg">
                🌍 Weather Forecast
              </h1>
              <p className="text-white/90 text-xl animate-in fade-in-0 slide-in-from-top-8 duration-1000 drop-shadow-md" style={{ animationDelay: '200ms' }}>
                Real-time weather for cities worldwide
              </p>
              
              {/* Time indicator */}
              <div className="mt-4 animate-in fade-in-0 slide-in-from-top-8 duration-1000" style={{ animationDelay: '400ms' }}>
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm font-medium">
                    {timeInfo.timeOfDay} • {timeInfo.time} {timeInfo.city !== 'Local' && `in ${timeInfo.city}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Unit Toggle */}
            <div className="animate-in fade-in-0 slide-in-from-top-8 duration-1000" style={{ animationDelay: '600ms' }}>
              <UnitToggle unit={unit} onToggle={handleUnitToggle} />
            </div>

            {/* Search Bar */}
            <div className="animate-in fade-in-0 slide-in-from-top-8 duration-1000" style={{ animationDelay: '800ms' }}>
              <SearchBar 
                onSearch={handleCitySearch}
                onLocationSearch={handleLocationSearch}
                loading={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <ErrorMessage message={error} onClose={clearError} />
            )}

            {/* Loading State */}
            {loading && <LoadingSpinner />}

            {/* Weather Data */}
            {data && !loading && (
              <div className="space-y-6">
                <WeatherCard data={data} unit={unit} />
                <WeatherStats data={data} unit={unit} />
                {forecast && <ForecastCard forecast={forecast} unit={unit} />}
              </div>
            )}

            {/* Welcome Message */}
            {!data && !loading && !error && (
              <div className="text-center py-16 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000" style={{ animationDelay: '1000ms' }}>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 max-w-2xl mx-auto">
                  <h2 className="text-3xl font-light text-white mb-6">
                    🌦️ Discover Global Weather
                  </h2>
                  <p className="text-white/80 text-lg mb-8">
                    Explore weather conditions across the world - from bustling cities to peaceful towns and villages.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleCitySearch('London')}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white transition-all duration-300 hover:scale-105"
                    >
                      🇬🇧 London
                    </button>
                    <button
                      onClick={() => handleCitySearch('New York')}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white transition-all duration-300 hover:scale-105"
                    >
                      🇺🇸 New York
                    </button>
                    <button
                      onClick={() => handleCitySearch('Tokyo')}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white transition-all duration-300 hover:scale-105"
                    >
                      🇯🇵 Tokyo
                    </button>
                    <button
                      onClick={() => handleCitySearch('Paris')}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white transition-all duration-300 hover:scale-105"
                    >
                      🇫🇷 Paris
                    </button>
                    <button
                      onClick={() => handleCitySearch('Sydney')}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white transition-all duration-300 hover:scale-105"
                    >
                      🇦🇺 Sydney
                    </button>
                    <button
                      onClick={() => handleCitySearch('Dubai')}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white transition-all duration-300 hover:scale-105"
                    >
                      🇦🇪 Dubai
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;