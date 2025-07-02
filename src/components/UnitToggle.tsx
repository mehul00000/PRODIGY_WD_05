import React from 'react';
import { TemperatureUnit } from '../types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1">
        <button
          onClick={() => onToggle('metric')}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            unit === 'metric'
              ? 'bg-white text-gray-900 shadow-lg'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          °C
        </button>
        <button
          onClick={() => onToggle('imperial')}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            unit === 'imperial'
              ? 'bg-white text-gray-900 shadow-lg'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};