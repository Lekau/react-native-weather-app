import { describe, expect, test, jest } from '@jest/globals';
import { GetWeatherUseCase } from '../GetWeatherUseCase';
import { WeatherRepository } from '../../repositories/WeatherRepository';
import { Weather } from '../../entities/Weather';

describe('GetWeatherUseCase', () => {
  test('should get weather for location', async () => {
    const mockWeather = new Weather({
      temperature: 25,
      condition: 'Sunny',
      location: 'London'
    });

    const mockWeatherRepository: WeatherRepository = {
      getWeather: jest.fn().mockResolvedValue(mockWeather)
    };

    const getWeatherUseCase = new GetWeatherUseCase(mockWeatherRepository);
    const result = await getWeatherUseCase.execute('London');
    expect(result).toEqual(mockWeather);
    expect(mockWeatherRepository.getWeather).toHaveBeenCalledWith('London');
  });

  test('should throw error when repository fails', async () => {
    const mockWeatherRepository: WeatherRepository = {
      getWeather: jest.fn().mockRejectedValue(new Error('API Error'))
    };

    const getWeatherUseCase = new GetWeatherUseCase(mockWeatherRepository);

    await expect(getWeatherUseCase.execute('London'))
      .rejects
      .toThrow('API Error');
  });
}); 