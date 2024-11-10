import { OpenWeatherDataSource } from '../../data/datasources/OpenWeatherDataSource';
import { WeatherRepositoryImpl } from '../../domain/repositories/WeatherRepositoryImpl';
import { GetWeatherUseCase } from '../../domain/useCases/GetWeatherUseCase';

export class WeatherFactory {
  static makeGetWeatherUseCase(): GetWeatherUseCase {
    const dataSource = new OpenWeatherDataSource();
    const repository = new WeatherRepositoryImpl(dataSource);
    return new GetWeatherUseCase(repository);
  }
} 