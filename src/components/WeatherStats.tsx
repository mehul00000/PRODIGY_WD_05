import React from 'react';
import { 
  Droplets, 
  Wind, 
  Gauge, 
  Eye, 
  Thermometer, 
  ArrowUp, 
  ArrowDown,
  Navigation
} from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';

interface WeatherStatsProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

export const WeatherStats: React.FC<WeatherStatsProps> = ({ data, unit }) => {
  const windSpeed = Math.round(data.wind.speed * 10) / 10;
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const visibilityKm = Math.round(data.visibility / 100) / 10;
  const tempMin = Math.round(data.main.temp_min);
  const tempMax = Math.round(data.main.temp_max);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  const getWindDirection = (degree?: number) => {
    if (!degree) return 'N/A';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  const stats = [
    {
      icon: <Droplets className="w-4 h-4" />,
      label: 'Humidity',
      value: `${data.main.humidity}%`,
      color: 'text-blue-300'
    },
    {
      icon: <Wind className="w-4 h-4" />,
      label: 'Wind Speed',
      value: `${windSpeed} ${windUnit}`,
      color: 'text-green-300'
    },
    {
      icon: <Gauge className="w-4 h-4" />,
      label: 'Pressure',
      value: `${data.main.pressure} hPa`,
      color: 'text-purple-300'
    },
    {
      icon: <Eye className="w-4 h-4" />,
      label: 'Visibility',
      value: `${visibilityKm} km`,
      color: 'text-yellow-300'
    },
    {
      icon: <ArrowUp className="w-4 h-4" />,
      label: 'Max Temp',
      value: `${tempMax}${unitSymbol}`,
      color: 'text-red-300'
    },
    {
      icon: <ArrowDown className="w-4 h-4" />,
      label: 'Min Temp',
      value: `${tempMin}${unitSymbol}`,
      color: 'text-cyan-300'
    },
    {
      icon: <Navigation className="w-4 h-4" style={{ transform: `rotate(${(data.wind.deg || 0) + 90}deg)` }} />,
      label: 'Wind Direction',
      value: getWindDirection(data.wind.deg),
      color: 'text-indigo-300'
    },
    {
      icon: <Thermometer className="w-4 h-4" />,
      label: 'Feels Like',
      value: `${Math.round(data.main.feels_like)}${unitSymbol}`,
      color: 'text-orange-300'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center animate-in slide-in-from-bottom-8 duration-700"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 ${stat.color} mb-2`}>
            {stat.icon}
          </div>
          <p className="text-white/70 text-xs mb-1">{stat.label}</p>
          <p className="text-white font-semibold text-sm">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};