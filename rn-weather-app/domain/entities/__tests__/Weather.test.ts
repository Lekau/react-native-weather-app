import { describe, expect, test } from '@jest/globals';
import { Weather } from '../Weather';

describe('Weather Entity', () => {
  test('should create weather entity with correct properties', () => {
    const weatherData = {
      temperature: 20,
      condition: 'Sunny',
      location: 'Edenvale',
    };

    const weather = new Weather(weatherData);

    expect(weather.temperature).toBe(20);
    expect(weather.condition).toBe('Sunny');
    expect(weather.location).toBe('Edenvale');
  });

  test('should throw error if temperature is invalid', () => {
    const invalidWeatherData = {
      temperature: -100,
      condition: 'Sunny',
      location: 'Sandton',
    };

    expect(() => new Weather(invalidWeatherData)).toThrow('Invalid temperature');
  });
}); 