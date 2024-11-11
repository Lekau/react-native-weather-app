import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { OpenWeatherDataSource } from '../OpenWeatherDataSource';
import { WeatherModel } from '../../../models/WeatherModel';
import { format } from 'date-fns';

describe('OpenWeatherDataSource', () => {
  let dataSource: OpenWeatherDataSource;

  const mockWeatherResponse: WeatherModel = {
    main: {
      temp: 20,
      feels_like: 19,
      temp_min: 18,
      temp_max: 22,
      pressure: 1015,
      humidity: 65
    },
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    name: 'London',
    cod: 200
  };

  const mockForecastResponse = {
    list: [
      {
        dt: Math.floor(Date.now() / 1000), 
        dt_txt: format(new Date(), 'yyyy-MM-dd 12:00:00'),
        main: { temp: 20 },
        weather: [{ main: 'Clear' }]
      },
      {
        dt: Math.floor(Date.now() / 1000) + 86400, 
        dt_txt: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd 12:00:00'),
        main: { temp: 22 },
        weather: [{ main: 'Clouds' }]
      },
    ],
    city: {
      name: 'Sandton'
    }
  };

  beforeEach(() => {
    dataSource = new OpenWeatherDataSource();
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test('getWeatherByCity returns weather entity', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWeatherResponse)
    });

    const result = await dataSource.getWeatherByCity('London');

    expect(result.temperature).toBe(20);
    expect(result.condition).toBe('Clear');
    expect(result.location).toBe('London');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('getWeatherByLocation returns weather entity', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWeatherResponse)
    });

    const result = await dataSource.getWeatherByLocation(51.5074, -0.1278);


    expect(result.temperature).toBe(20);
    expect(result.condition).toBe('Clear');
    expect(result.location).toBe('London');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('handles API error correctly', async () => {
   
    const errorResponse = {
      ok: false,
      json: () => Promise.resolve({ message: 'City not found' })
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce(errorResponse);

    
    await expect(dataSource.getWeatherByCity('NonExistentCity'))
      .rejects
      .toThrow('Failed to fetch weather data: City not found');
  });

  test('handles network error correctly', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    
    await expect(dataSource.getWeatherByCity('London'))
      .rejects
      .toThrow('Failed to fetch weather data: Network error');
  });

  test('getWeatherByCity returns weather entity with correct temperatures', async () => {
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWeatherResponse)
    });

    const result = await dataSource.getWeatherByCity('Sandton');

    expect(result.temperature).toBe(20);
    expect(result.minTemperature).toBe(18);
    expect(result.maxTemperature).toBe(22);
    expect(result.condition).toBe('Clear');
    expect(result.location).toBe('Sandton');
  });

  test('getForecast returns 5-day forecast', async () => {
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockForecastResponse)
    });


    const result = await dataSource.getForecast('Sandton');

    expect(result.days.length).toBeLessThanOrEqual(5);
    expect(result.days[0].day).toBe('Today');
    expect(result.days[1].day).toBe('Tomorrow');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('getForecast handles API error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'City not found' })
    });
 
    await expect(dataSource.getForecast('NonExistentCity'))
      .rejects
      .toThrow('Failed to fetch forecast data: City not found');
  });
}); 