import { describe, expect, test, jest } from '@jest/globals';
import { WeatherRepositoryImpl } from '../../../domain/repositories/WeatherRepositoryImpl';
import { WeatherDataSource } from '../../../domain/datasources/WeatherDataSource';
import { Weather } from '../../../domain/entities/Weather';

describe('WeatherRepositoryImpl', () => {
  test('should get weather by city name', async () => {
    // Arrange
    const mockWeather = new Weather({
      temperature: 20,
      minTemperature: 18,
      maxTemperature: 22,
      condition: 'Sunny',
      location: 'London'
    });

    const mockDataSource: WeatherDataSource = {
      getWeatherByCity: jest.fn().mockResolvedValue(mockWeather),
      getWeatherByLocation: jest.fn()
    };

    const repository = new WeatherRepositoryImpl(mockDataSource);

    // Act
    const result = await repository.getWeather('London');

    // Assert
    expect(result).toEqual(mockWeather);
    expect(mockDataSource.getWeatherByCity).toHaveBeenCalledWith('London');
  });

  test('should throw error when data source fails', async () => {
    // Arrange
    const mockDataSource: WeatherDataSource = {
      getWeatherByCity: jest.fn().mockRejectedValue(new Error('API Error')),
      getWeatherByLocation: jest.fn()
    };

    const repository = new WeatherRepositoryImpl(mockDataSource);

    // Act & Assert
    await expect(repository.getWeather('London'))
      .rejects
      .toThrow('Failed to fetch weather data: API Error');
  });
}); 