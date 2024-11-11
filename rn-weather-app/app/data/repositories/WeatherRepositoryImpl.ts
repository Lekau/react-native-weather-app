import { WeatherRepository } from '../../domain/repositories/WeatherRepository';
import { WeatherDataSource } from '../../domain/datasources/WeatherDataSource';
import { Weather } from '../../domain/entities/Weather';
import { Forecast } from '../../domain/entities/Forecast';

export class WeatherRepositoryImpl implements WeatherRepository {
  constructor(private readonly dataSource: WeatherDataSource) {}

  async getWeather(location: string): Promise<Weather> {
    try {
      return await this.dataSource.getWeatherByCity(location);
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  async getForecast(location: string): Promise<Forecast> {
    try {
      return await this.dataSource.getForecast(location);
    } catch (error) {
      throw new Error(`Failed to fetch forecast data: ${error.message}`);
    }
  }
} 