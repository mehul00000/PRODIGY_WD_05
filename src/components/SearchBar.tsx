import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { getCitySuggestions } from '../utils/weatherApi';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationSearch, loading }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    
    if (value.length >= 2) {
      const newSuggestions = getCitySuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const cityName = suggestion.split(',')[0].trim();
    setCity(cityName);
    onSearch(cityName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (city.trim()) {
          onSearch(city.trim());
          setShowSuggestions(false);
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearInput = () => {
    setCity('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mb-6 relative z-50">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search cities worldwide..."
            className="w-full pl-12 pr-20 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
            disabled={loading}
            autoComplete="off"
          />
          
          {/* Clear button */}
          {city && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {/* Location button */}
          <button
            type="button"
            onClick={onLocationSearch}
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-2 text-white transition-all duration-300 disabled:opacity-50"
            title="Use current location"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden z-[100] animate-in slide-in-from-top-4 duration-200"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors duration-200 ${
                index === selectedIndex ? 'bg-white/20' : ''
              } ${index !== suggestions.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <Search className="w-4 h-4 text-white/50" />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-white/70 text-sm">
          Try: "London", "New York", "Tokyo", "Paris", "Sydney", or "Dubai"
        </p>
      </div>
    </div>
  );
};