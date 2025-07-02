export interface WeatherData {
  id: number;
  name: string;
  country: string;
  state?: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
}

export interface ForecastDay {
  date: string;
  day: string;
  temp_max: number;
  temp_min: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  humidity: number;
  wind_speed: number;
}

export interface WeatherError {
  message: string;
  cod?: string;
}

export type TemperatureUnit = 'metric' | 'imperial';

export interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  type: 'city' | 'village' | 'town';
  population?: number;
}