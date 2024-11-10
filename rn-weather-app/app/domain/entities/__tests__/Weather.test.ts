import { describe, expect, test } from '@jest/globals';
import { Weather } from '../Weather';

describe('Weather Entity', () => {
  test('should create weather entity with valid temperatures', () => {
    const weather = new Weather({
      temperature: 25,
      minTemperature: 20,
      maxTemperature: 30,
      condition: 'Clear',
      location: 'Sandton'
    });

    expect(weather.temperature).toBe(25);
    expect(weather.minTemperature).toBe(20);
    expect(weather.maxTemperature).toBe(30);
    expect(weather.condition).toBe('Clear');
    expect(weather.location).toBe('Sandton');
  });

  test('should throw error for invalid current temperature', () => {
    expect(() => new Weather({
      temperature: 100,
      minTemperature: 20,
      maxTemperature: 30,
      condition: 'Clear',
      location: 'Sandton'
    })).toThrow('Temperature must be between -90°C and 60°C');
  });

  test('should throw error for invalid minimum temperature', () => {
    expect(() => new Weather({
      temperature: 25,
      minTemperature: -100,
      maxTemperature: 30,
      condition: 'Clear',
      location: 'Sandton'
    })).toThrow('Temperature must be between -90°C and 60°C');
  });

  test('should throw error for invalid maximum temperature', () => {
    expect(() => new Weather({
      temperature: 25,
      minTemperature: 20,
      maxTemperature: 70,
      condition: 'Clear',
      location: 'Sandton'
    })).toThrow('Temperature must be between -90°C and 60°C');
  });

  test('should throw error when min temperature is greater than max', () => {
    expect(() => new Weather({
      temperature: 25,
      minTemperature: 30,
      maxTemperature: 20,
      condition: 'Clear',
      location: 'Sandton'
    })).toThrow('Minimum temperature cannot be greater than maximum temperature');
  });
}); 