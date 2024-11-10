import { Weather } from '../entities/Weather';

export interface WeatherDataSource {
  getWeatherByLocation(lat: number, lon: number): Promise<Weather>;
  getWeatherByCity(city: string): Promise<Weather>;
} 