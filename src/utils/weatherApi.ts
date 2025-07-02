import { WeatherData, WeatherError, TemperatureUnit, GeolocationCoords, ForecastDay, LocationInfo } from '../types/weather';

// Using OpenWeatherMap API - replace with your API key
const API_KEY = 'demo'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Global cities with their location types
export const GLOBAL_CITIES = [
  // Major World Cities
  { name: 'London', country: 'United Kingdom', type: 'city', population: 9500000 },
  { name: 'New York', country: 'United States', type: 'city', population: 8400000 },
  { name: 'Tokyo', country: 'Japan', type: 'city', population: 14000000 },
  { name: 'Paris', country: 'France', type: 'city', population: 2200000 },
  { name: 'Sydney', country: 'Australia', type: 'city', population: 5300000 },
  { name: 'Dubai', country: 'United Arab Emirates', type: 'city', population: 3400000 },
  { name: 'Singapore', country: 'Singapore', type: 'city', population: 5900000 },
  { name: 'Hong Kong', country: 'Hong Kong', type: 'city', population: 7500000 },
  { name: 'Berlin', country: 'Germany', type: 'city', population: 3700000 },
  { name: 'Madrid', country: 'Spain', type: 'city', population: 6700000 },
  { name: 'Rome', country: 'Italy', type: 'city', population: 2900000 },
  { name: 'Amsterdam', country: 'Netherlands', type: 'city', population: 900000 },
  { name: 'Stockholm', country: 'Sweden', type: 'city', population: 980000 },
  { name: 'Copenhagen', country: 'Denmark', type: 'city', population: 660000 },
  { name: 'Vienna', country: 'Austria', type: 'city', population: 1900000 },
  { name: 'Prague', country: 'Czech Republic', type: 'city', population: 1300000 },
  { name: 'Warsaw', country: 'Poland', type: 'city', population: 1800000 },
  { name: 'Budapest', country: 'Hungary', type: 'city', population: 1800000 },
  { name: 'Athens', country: 'Greece', type: 'city', population: 3200000 },
  { name: 'Helsinki', country: 'Finland', type: 'city', population: 660000 },
  
  // American Cities
  { name: 'Los Angeles', country: 'United States', type: 'city', population: 4000000 },
  { name: 'Chicago', country: 'United States', type: 'city', population: 2700000 },
  { name: 'Miami', country: 'United States', type: 'city', population: 470000 },
  { name: 'Las Vegas', country: 'United States', type: 'city', population: 650000 },
  { name: 'San Francisco', country: 'United States', type: 'city', population: 880000 },
  { name: 'Seattle', country: 'United States', type: 'city', population: 750000 },
  { name: 'Boston', country: 'United States', type: 'city', population: 690000 },
  { name: 'Toronto', country: 'Canada', type: 'city', population: 2900000 },
  { name: 'Vancouver', country: 'Canada', type: 'city', population: 680000 },
  { name: 'Montreal', country: 'Canada', type: 'city', population: 1800000 },
  
  // Asian Cities
  { name: 'Seoul', country: 'South Korea', type: 'city', population: 9700000 },
  { name: 'Beijing', country: 'China', type: 'city', population: 21500000 },
  { name: 'Shanghai', country: 'China', type: 'city', population: 24300000 },
  { name: 'Mumbai', country: 'India', type: 'city', population: 20700000 },
  { name: 'Delhi', country: 'India', type: 'city', population: 32900000 },
  { name: 'Bangkok', country: 'Thailand', type: 'city', population: 10500000 },
  { name: 'Jakarta', country: 'Indonesia', type: 'city', population: 10600000 },
  { name: 'Manila', country: 'Philippines', type: 'city', population: 13500000 },
  { name: 'Kuala Lumpur', country: 'Malaysia', type: 'city', population: 1800000 },
  
  // Middle Eastern Cities
  { name: 'Istanbul', country: 'Turkey', type: 'city', population: 15500000 },
  { name: 'Cairo', country: 'Egypt', type: 'city', population: 20900000 },
  { name: 'Tel Aviv', country: 'Israel', type: 'city', population: 460000 },
  { name: 'Riyadh', country: 'Saudi Arabia', type: 'city', population: 7700000 },
  { name: 'Doha', country: 'Qatar', type: 'city', population: 640000 },
  
  // African Cities
  { name: 'Cape Town', country: 'South Africa', type: 'city', population: 4600000 },
  { name: 'Lagos', country: 'Nigeria', type: 'city', population: 15400000 },
  { name: 'Nairobi', country: 'Kenya', type: 'city', population: 4400000 },
  { name: 'Casablanca', country: 'Morocco', type: 'city', population: 3400000 },
  
  // South American Cities
  { name: 'São Paulo', country: 'Brazil', type: 'city', population: 12400000 },
  { name: 'Rio de Janeiro', country: 'Brazil', type: 'city', population: 6700000 },
  { name: 'Buenos Aires', country: 'Argentina', type: 'city', population: 15200000 },
  { name: 'Lima', country: 'Peru', type: 'city', population: 10700000 },
  { name: 'Bogotá', country: 'Colombia', type: 'city', population: 11000000 },
  
  // Towns and smaller cities
  { name: 'Zurich', country: 'Switzerland', type: 'town', population: 430000 },
  { name: 'Geneva', country: 'Switzerland', type: 'town', population: 200000 },
  { name: 'Salzburg', country: 'Austria', type: 'town', population: 150000 },
  { name: 'Bruges', country: 'Belgium', type: 'town', population: 120000 },
  { name: 'Reykjavik', country: 'Iceland', type: 'town', population: 130000 },
  { name: 'Luxembourg', country: 'Luxembourg', type: 'town', population: 125000 },
  { name: 'Monaco', country: 'Monaco', type: 'town', population: 39000 },
  { name: 'Vaduz', country: 'Liechtenstein', type: 'village', population: 5700 },
  { name: 'San Marino', country: 'San Marino', type: 'village', population: 4000 }
];

// Mock weather data for demo purposes
const MOCK_WEATHER_DATA: Record<string, WeatherData> = {
  'london': {
    id: 2643743,
    name: "London",
    country: "GB",
    state: "England",
    coord: { lat: 51.5074, lon: -0.1278 },
    weather: [{
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d"
    }],
    main: {
      temp: 15.2,
      feels_like: 14.8,
      temp_min: 12.1,
      temp_max: 18.3,
      pressure: 1015,
      humidity: 72
    },
    visibility: 10000,
    wind: {
      speed: 4.1,
      deg: 230
    },
    clouds: { all: 75 },
    dt: Date.now() / 1000,
    sys: {
      country: "GB",
      sunrise: 1640155200,
      sunset: 1640185200
    },
    timezone: 0
  },
  'new york': {
    id: 5128581,
    name: "New York",
    country: "US",
    state: "New York",
    coord: { lat: 40.7128, lon: -74.0060 },
    weather: [{
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    }],
    main: {
      temp: 22.5,
      feels_like: 24.2,
      temp_min: 19.1,
      temp_max: 25.8,
      pressure: 1018,
      humidity: 58
    },
    visibility: 16000,
    wind: {
      speed: 3.2,
      deg: 180
    },
    clouds: { all: 5 },
    dt: Date.now() / 1000,
    sys: {
      country: "US",
      sunrise: 1640155200,
      sunset: 1640185200
    },
    timezone: -18000
  },
  'tokyo': {
    id: 1850147,
    name: "Tokyo",
    country: "JP",
    state: "Tokyo",
    coord: { lat: 35.6762, lon: 139.6503 },
    weather: [{
      id: 500,
      main: "Rain",
      description: "light rain",
      icon: "10d"
    }],
    main: {
      temp: 26.8,
      feels_like: 28.1,
      temp_min: 24.2,
      temp_max: 29.3,
      pressure: 1012,
      humidity: 78
    },
    visibility: 8000,
    wind: {
      speed: 2.8,
      deg: 90
    },
    clouds: { all: 85 },
    dt: Date.now() / 1000,
    sys: {
      country: "JP",
      sunrise: 1640155200,
      sunset: 1640185200
    },
    timezone: 32400
  },
  'paris': {
    id: 2988507,
    name: "Paris",
    country: "FR",
    state: "Île-de-France",
    coord: { lat: 48.8566, lon: 2.3522 },
    weather: [{
      id: 801,
      main: "Clouds",
      description: "few clouds",
      icon: "02d"
    }],
    main: {
      temp: 18.5,
      feels_like: 17.8,
      temp_min: 15.2,
      temp_max: 21.3,
      pressure: 1016,
      humidity: 65
    },
    visibility: 12000,
    wind: {
      speed: 2.1,
      deg: 270
    },
    clouds: { all: 20 },
    dt: Date.now() / 1000,
    sys: {
      country: "FR",
      sunrise: 1640155200,
      sunset: 1640185200
    },
    timezone: 3600
  },
  'sydney': {
    id: 2147714,
    name: "Sydney",
    country: "AU",
    state: "New South Wales",
    coord: { lat: -33.8688, lon: 151.2093 },
    weather: [{
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    }],
    main: {
      temp: 24.1,
      feels_like: 25.5,
      temp_min: 21.8,
      temp_max: 27.2,
      pressure: 1020,
      humidity: 62
    },
    visibility: 15000,
    wind: {
      speed: 3.5,
      deg: 120
    },
    clouds: { all: 0 },
    dt: Date.now() / 1000,
    sys: {
      country: "AU",
      sunrise: 1640155200,
      sunset: 1640185200
    },
    timezone: 39600
  },
  'dubai': {
    id: 292223,
    name: "Dubai",
    country: "AE",
    state: "Dubai",
    coord: { lat: 25.2048, lon: 55.2708 },
    weather: [{
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    }],
    main: {
      temp: 35.2,
      feels_like: 38.8,
      temp_min: 32.1,
      temp_max: 38.5,
      pressure: 1010,
      humidity: 45
    },
    visibility: 10000,
    wind: {
      speed: 4.2,
      deg: 310
    },
    clouds: { all: 0 },
    dt: Date.now() / 1000,
    sys: {
      country: "AE",
      sunrise: 1640155200,
      sunset: 1640185200
    },
    timezone: 14400
  }
};

// Mock 4-day forecast data
const MOCK_FORECAST_DATA: Record<string, ForecastDay[]> = {
  'london': [
    {
      date: '2025-01-16',
      day: 'Tomorrow',
      temp_max: 17,
      temp_min: 11,
      weather: { main: 'Clouds', description: 'overcast', icon: '04d' },
      humidity: 75,
      wind_speed: 3.8
    },
    {
      date: '2025-01-17',
      day: 'Friday',
      temp_max: 14,
      temp_min: 8,
      weather: { main: 'Rain', description: 'light rain', icon: '10d' },
      humidity: 82,
      wind_speed: 4.2
    },
    {
      date: '2025-01-18',
      day: 'Saturday',
      temp_max: 16,
      temp_min: 10,
      weather: { main: 'Clouds', description: 'partly cloudy', icon: '03d' },
      humidity: 68,
      wind_speed: 3.1
    },
    {
      date: '2025-01-19',
      day: 'Sunday',
      temp_max: 19,
      temp_min: 12,
      weather: { main: 'Clear', description: 'sunny', icon: '01d' },
      humidity: 58,
      wind_speed: 2.8
    }
  ],
  'new york': [
    {
      date: '2025-01-16',
      day: 'Tomorrow',
      temp_max: 25,
      temp_min: 18,
      weather: { main: 'Clear', description: 'sunny', icon: '01d' },
      humidity: 55,
      wind_speed: 3.5
    },
    {
      date: '2025-01-17',
      day: 'Friday',
      temp_max: 23,
      temp_min: 16,
      weather: { main: 'Clouds', description: 'partly cloudy', icon: '02d' },
      humidity: 62,
      wind_speed: 2.9
    },
    {
      date: '2025-01-18',
      day: 'Saturday',
      temp_max: 20,
      temp_min: 13,
      weather: { main: 'Rain', description: 'light rain', icon: '10d' },
      humidity: 78,
      wind_speed: 4.1
    },
    {
      date: '2025-01-19',
      day: 'Sunday',
      temp_max: 26,
      temp_min: 19,
      weather: { main: 'Clear', description: 'sunny', icon: '01d' },
      humidity: 52,
      wind_speed: 3.2
    }
  ]
};

export const fetchWeatherByCity = async (city: string, units: TemperatureUnit = 'metric'): Promise<WeatherData> => {
  try {
    // For demo purposes, use mock data
    const mockData = MOCK_WEATHER_DATA[city.toLowerCase()];
    if (mockData) {
      // Convert temperature based on units
      if (units === 'imperial') {
        return {
          ...mockData,
          main: {
            ...mockData.main,
            temp: celsiusToFahrenheit(mockData.main.temp),
            feels_like: celsiusToFahrenheit(mockData.main.feels_like),
            temp_min: celsiusToFahrenheit(mockData.main.temp_min),
            temp_max: celsiusToFahrenheit(mockData.main.temp_max),
          },
          wind: {
            ...mockData.wind,
            speed: units === 'imperial' ? mockData.wind.speed * 2.237 : mockData.wind.speed
          }
        };
      }
      return mockData;
    }

    throw new Error(`Weather data for "${city}" not found. Try "London", "New York", "Tokyo", "Paris", "Sydney", or "Dubai" for demo.`);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchWeatherByCoords = async (coords: GeolocationCoords, units: TemperatureUnit = 'metric'): Promise<WeatherData> => {
  try {
    // For demo purposes, return London data for any coordinates
    const mockData = MOCK_WEATHER_DATA['london'];
    if (units === 'imperial') {
      return {
        ...mockData,
        main: {
          ...mockData.main,
          temp: celsiusToFahrenheit(mockData.main.temp),
          feels_like: celsiusToFahrenheit(mockData.main.feels_like),
          temp_min: celsiusToFahrenheit(mockData.main.temp_min),
          temp_max: celsiusToFahrenheit(mockData.main.temp_max),
        },
        wind: {
          ...mockData.wind,
          speed: units === 'imperial' ? mockData.wind.speed * 2.237 : mockData.wind.speed
        }
      };
    }
    return mockData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchForecast = async (city: string, units: TemperatureUnit = 'metric'): Promise<ForecastDay[]> => {
  try {
    const forecastData = MOCK_FORECAST_DATA[city.toLowerCase()] || MOCK_FORECAST_DATA['london'];
    
    if (units === 'imperial') {
      return forecastData.map(day => ({
        ...day,
        temp_max: celsiusToFahrenheit(day.temp_max),
        temp_min: celsiusToFahrenheit(day.temp_min),
        wind_speed: day.wind_speed * 2.237
      }));
    }
    
    return forecastData;
  } catch (error) {
    throw new Error('Failed to fetch forecast data');
  }
};

const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9/5) + 32);
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getLocationInfo = (cityName: string): LocationInfo => {
  const city = GLOBAL_CITIES.find(c => 
    c.name.toLowerCase() === cityName.toLowerCase()
  );
  
  return {
    type: city?.type || 'city',
    population: city?.population
  };
};

export const getTimeBasedBackground = (timezone: number, weatherMain: string, locationType: 'city' | 'village' | 'town' = 'city'): string => {
  // Get current time in the city's timezone
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const cityTime = new Date(utc + (timezone * 1000));
  const hours = cityTime.getHours();

  const isDay = hours >= 6 && hours < 18;
  const weather = weatherMain.toLowerCase();

  // Base backgrounds for different location types and times
  let baseClass = '';
  
  if (isDay) {
    if (locationType === 'village') {
      baseClass = 'village-day';
    } else if (locationType === 'town') {
      baseClass = 'town-day';
    } else {
      baseClass = 'city-day';
    }
  } else {
    if (locationType === 'village') {
      baseClass = 'village-night';
    } else if (locationType === 'town') {
      baseClass = 'town-night';
    } else {
      baseClass = 'city-night';
    }
  }

  // Weather-specific modifiers
  if (weather.includes('rain')) {
    baseClass += ' rainy';
  } else if (weather.includes('cloud')) {
    baseClass += ' cloudy';
  } else if (weather.includes('clear')) {
    baseClass += ' clear';
  }

  return baseClass;
};

export const getCitySuggestions = (query: string): string[] => {
  if (query.length < 2) return [];
  
  const filteredCities = GLOBAL_CITIES
    .filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase())
    )
    .map(city => `${city.name}, ${city.country}`)
    .slice(0, 8);
  
  return filteredCities;
};