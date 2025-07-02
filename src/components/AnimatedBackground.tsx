import React from 'react';
import { Cloud, Sun, Moon, Star, TreePine, Building, Home } from 'lucide-react';

interface AnimatedBackgroundProps {
  backgroundClass: string;
  locationType: 'city' | 'village' | 'town';
  weatherMain: string;
  isDay: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  backgroundClass, 
  locationType, 
  weatherMain, 
  isDay 
}) => {
  const weather = weatherMain.toLowerCase();
  const isRainy = weather.includes('rain');
  const isCloudy = weather.includes('cloud');
  const isClear = weather.includes('clear');

  return (
    <div className={`fixed inset-0 ${backgroundClass} transition-all duration-2000 ease-in-out`}>
      {/* Sky gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
      
      {/* Sun */}
      {isDay && isClear && (
        <div className="absolute top-20 right-20 animate-pulse">
          <Sun className="w-20 h-20 text-yellow-300 animate-spin-slow" />
          <div className="absolute inset-0 w-20 h-20 bg-yellow-300/20 rounded-full animate-ping"></div>
        </div>
      )}
      
      {/* Moon and stars */}
      {!isDay && (
        <>
          <div className="absolute top-16 right-24 animate-pulse">
            <Moon className="w-16 h-16 text-blue-100" />
          </div>
          <div className="absolute top-12 left-20 animate-twinkle">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div className="absolute top-32 left-32 animate-twinkle" style={{ animationDelay: '1s' }}>
            <Star className="w-3 h-3 text-white" />
          </div>
          <div className="absolute top-24 right-40 animate-twinkle" style={{ animationDelay: '2s' }}>
            <Star className="w-4 h-4 text-white" />
          </div>
          <div className="absolute top-40 left-1/4 animate-twinkle" style={{ animationDelay: '3s' }}>
            <Star className="w-3 h-3 text-white" />
          </div>
          <div className="absolute top-20 right-1/3 animate-twinkle" style={{ animationDelay: '4s' }}>
            <Star className="w-4 h-4 text-white" />
          </div>
        </>
      )}
      
      {/* Clouds */}
      {(isCloudy || isRainy) && (
        <>
          <div className="absolute top-16 left-16 animate-float">
            <Cloud className="w-24 h-24 text-white/30" />
          </div>
          <div className="absolute top-32 right-32 animate-float" style={{ animationDelay: '2s' }}>
            <Cloud className="w-20 h-20 text-white/25" />
          </div>
          <div className="absolute top-48 left-1/3 animate-float" style={{ animationDelay: '4s' }}>
            <Cloud className="w-16 h-16 text-white/20" />
          </div>
        </>
      )}
      
      {/* Rain effect */}
      {isRainy && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-200/40 animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Ground level elements with realistic grass */}
      <div className="absolute bottom-0 left-0 right-0 h-40">
        {/* Grass layers for realistic effect */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-700/60 to-green-600/40"></div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-green-800/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-green-900/40 to-transparent"></div>
        
        {/* Grass blades */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-1 bg-green-600/30 animate-sway"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${8 + Math.random() * 8}px`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* City buildings */}
        {locationType === 'city' && (
          <div className="absolute bottom-8 left-0 right-0 flex items-end justify-center space-x-2">
            <Building className="w-12 h-16 text-gray-600/40 animate-sway" />
            <Building className="w-10 h-20 text-gray-700/40 animate-sway" style={{ animationDelay: '1s' }} />
            <Building className="w-14 h-18 text-gray-600/40 animate-sway" style={{ animationDelay: '2s' }} />
            <Building className="w-8 h-14 text-gray-700/40 animate-sway" style={{ animationDelay: '0.5s' }} />
            <Building className="w-12 h-22 text-gray-600/40 animate-sway" style={{ animationDelay: '1.5s' }} />
            <Building className="w-9 h-17 text-gray-600/40 animate-sway" style={{ animationDelay: '3s' }} />
            <Building className="w-11 h-19 text-gray-700/40 animate-sway" style={{ animationDelay: '2.5s' }} />
          </div>
        )}
        
        {/* Town houses with more trees */}
        {locationType === 'town' && (
          <div className="absolute bottom-8 left-0 right-0 flex items-end justify-center space-x-3">
            <TreePine className="w-8 h-16 text-green-600/50 animate-sway" />
            <Home className="w-10 h-12 text-amber-700/40 animate-sway" style={{ animationDelay: '1s' }} />
            <TreePine className="w-6 h-14 text-green-700/50 animate-sway" style={{ animationDelay: '2s' }} />
            <Home className="w-8 h-10 text-amber-800/40 animate-sway" style={{ animationDelay: '0.5s' }} />
            <TreePine className="w-7 h-15 text-green-600/50 animate-sway" style={{ animationDelay: '1.5s' }} />
            <Home className="w-9 h-11 text-amber-700/40 animate-sway" style={{ animationDelay: '3s' }} />
            <TreePine className="w-5 h-12 text-green-700/50 animate-sway" style={{ animationDelay: '2.5s' }} />
          </div>
        )}
        
        {/* Village - lots of trees and small houses */}
        {locationType === 'village' && (
          <div className="absolute bottom-8 left-0 right-0 flex items-end justify-center space-x-2">
            <TreePine className="w-8 h-16 text-green-600/50 animate-sway" />
            <TreePine className="w-6 h-12 text-green-700/50 animate-sway" style={{ animationDelay: '1s' }} />
            <TreePine className="w-9 h-18 text-green-600/50 animate-sway" style={{ animationDelay: '2s' }} />
            <Home className="w-6 h-8 text-amber-800/40 animate-sway" style={{ animationDelay: '0.5s' }} />
            <TreePine className="w-7 h-14 text-green-600/50 animate-sway" style={{ animationDelay: '1.5s' }} />
            <TreePine className="w-5 h-10 text-green-700/50 animate-sway" style={{ animationDelay: '3s' }} />
            <Home className="w-5 h-7 text-amber-700/40 animate-sway" style={{ animationDelay: '2.5s' }} />
            <TreePine className="w-6 h-13 text-green-600/50 animate-sway" style={{ animationDelay: '4s' }} />
            <TreePine className="w-8 h-15 text-green-700/50 animate-sway" style={{ animationDelay: '3.5s' }} />
            <TreePine className="w-7 h-12 text-green-600/50 animate-sway" style={{ animationDelay: '5s' }} />
            <Home className="w-4 h-6 text-amber-800/40 animate-sway" style={{ animationDelay: '4.5s' }} />
            <TreePine className="w-6 h-14 text-green-700/50 animate-sway" style={{ animationDelay: '6s' }} />
          </div>
        )}
      </div>
    </div>
  );
};