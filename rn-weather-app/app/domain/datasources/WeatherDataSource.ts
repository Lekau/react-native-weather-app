import { Weather } from '../entities/Weather';
import { Forecast } from '../entities/Forecast';

export interface WeatherDataSource {
  getWeatherByCity(city: string): Promise<Weather>;
  getForecast(city: string): Promise<Forecast>;
} 