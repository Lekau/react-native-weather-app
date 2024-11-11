import { WeatherRepositoryImpl } from '../../data/repositories/WeatherRepositoryImpl';
import { OpenWeatherDataSource } from '../../data/datasources/OpenWeatherDataSource';
import { GetWeatherUseCase } from '../../domain/useCases/GetWeatherUseCase';
import { GetForecastUseCase } from '../../domain/useCases/GetForecastUseCase';

export class WeatherFactory {
  static makeGetWeatherUseCase(): GetWeatherUseCase {
    const dataSource = new OpenWeatherDataSource();
    const repository = new WeatherRepositoryImpl(dataSource);
    return new GetWeatherUseCase(repository);
  }

  static makeGetForecastUseCase(): GetForecastUseCase {
    const dataSource = new OpenWeatherDataSource();
    const repository = new WeatherRepositoryImpl(dataSource);
    return new GetForecastUseCase(repository);
  }
} 