import { Weather } from '../entities/Weather';
import { Forecast } from '../entities/Forecast';

export interface WeatherRepository {
  getWeather(location: string): Promise<Weather>;
  getForecast(location: string): Promise<Forecast>;
} 