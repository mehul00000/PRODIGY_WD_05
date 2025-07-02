import React from 'react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { getWeatherIcon, getLocationInfo } from '../utils/weatherApi';
import { MapPin, Users } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, unit }) => {
  const temperature = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const locationInfo = getLocationInfo(data.name);

  const getLocationTypeIcon = () => {
    switch (locationInfo.type) {
      case 'village':
        return '🏘️';
      case 'town':
        return '🏙️';
      case 'city':
        return '🏢';
      default:
        return '📍';
    }
  };

  const formatPopulation = (pop?: number) => {
    if (!pop) return '';
    if (pop >= 1000000) return `${(pop / 1000000).toFixed(1)}M`;
    if (pop >= 1000) return `${(pop / 1000).toFixed(0)}K`;
    return pop.toString();
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <img
            src={getWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-16 h-16 drop-shadow-lg animate-bounce"
          />
        </div>
        
        <div className="flex items-center justify-center mb-2 space-x-2">
          <span className="text-xl">{getLocationTypeIcon()}</span>
          <h2 className="text-2xl font-bold text-white">
            {data.name}
          </h2>
        </div>
        
        <div className="flex items-center justify-center space-x-4 mb-3">
          <div className="flex items-center space-x-1 text-white/80">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{data.state || data.country}</span>
          </div>
          {locationInfo.population && (
            <div className="flex items-center space-x-1 text-white/80">
              <Users className="w-3 h-3" />
              <span className="text-xs">{formatPopulation(locationInfo.population)}</span>
            </div>
          )}
        </div>
        
        <div className="text-4xl font-light text-white mb-2 animate-pulse">
          {temperature}{unitSymbol}
        </div>
        
        <p className="text-white/80 text-base mb-2 capitalize">
          {data.weather[0].description}
        </p>
        
        <p className="text-white/70 text-sm">
          Feels like {feelsLike}{unitSymbol}
        </p>
        
        <div className="mt-3 px-3 py-1 bg-white/10 rounded-lg">
          <p className="text-white/90 text-xs font-medium capitalize">
            {locationInfo.type} • {data.weather[0].main}
          </p>
        </div>
      </div>
    </div>
  );
};