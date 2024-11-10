import { Weather } from '../entities/Weather';
import { WeatherRepository } from '../repositories/WeatherRepository';

export class GetWeatherUseCase {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async execute(location: string): Promise<Weather> {
    if (!location.trim()) {
      throw new Error('Location cannot be empty');
    }

    try {
      return await this.weatherRepository.getWeather(location);
    } catch (error) {
      throw new Error(`Failed to get weather: ${error.message}`);
    }
  }
} 