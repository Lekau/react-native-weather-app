import { WeatherRepository } from '../../domain/repositories/WeatherRepository';
import { WeatherDataSource } from '../../domain/datasources/WeatherDataSource';
import { Weather } from '../../domain/entities/Weather';

export class WeatherRepositoryImpl implements WeatherRepository {
  constructor(private readonly dataSource: WeatherDataSource) {}

  async getWeather(location: string): Promise<Weather> {
    try {
      return await this.dataSource.getWeatherByCity(location);
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }
} 