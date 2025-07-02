import React from 'react';
import { ForecastDay, TemperatureUnit } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherApi';
import { Droplets, Wind } from 'lucide-react';

interface ForecastCardProps {
  forecast: ForecastDay[];
  unit: TemperatureUnit;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '200ms' }}>
      <h3 className="text-2xl font-bold text-white mb-6 text-center">4-Day Forecast</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <h4 className="text-white font-semibold mb-2">{day.day}</h4>
            
            <div className="flex justify-center mb-3">
              <img
                src={getWeatherIcon(day.weather.icon)}
                alt={day.weather.description}
                className="w-16 h-16 drop-shadow-lg"
              />
            </div>
            
            <div className="mb-3">
              <div className="text-white text-xl font-bold">
                {Math.round(day.temp_max)}{unitSymbol}
              </div>
              <div className="text-white/70 text-sm">
                {Math.round(day.temp_min)}{unitSymbol}
              </div>
            </div>
            
            <p className="text-white/80 text-sm mb-3 capitalize">
              {day.weather.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-1 text-white/70 text-xs">
                <Droplets className="w-3 h-3" />
                <span>{day.humidity}%</span>
              </div>
              <div className="flex items-center justify-center space-x-1 text-white/70 text-xs">
                <Wind className="w-3 h-3" />
                <span>{Math.round(day.wind_speed * 10) / 10} {windUnit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};