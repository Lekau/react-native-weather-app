import { Weather } from '../entities/Weather';

export interface WeatherRepository {
  getWeather(location: string): Promise<Weather>;
} 