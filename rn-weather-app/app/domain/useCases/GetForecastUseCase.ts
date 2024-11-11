import { Forecast } from '../entities/Forecast';
import { WeatherRepository } from '../repositories/WeatherRepository';

export class GetForecastUseCase {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async execute(location: string): Promise<Forecast> {
    if (!location.trim()) {
      throw new Error('Location cannot be empty');
    }

    try {
      return await this.weatherRepository.getForecast(location);
    } catch (error) {
      throw new Error(`Failed to get forecast: ${error.message}`);
    }
  }
} 