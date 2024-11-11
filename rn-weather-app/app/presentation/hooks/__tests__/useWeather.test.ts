import { renderHook, act } from '@testing-library/react-native';
import { useWeather } from '../useWeather';
import { WeatherFactory } from '../../../core/factory/WeatherFactory';

jest.mock('../../../core/factory/WeatherFactory');

describe('useWeather', () => {
  const mockWeather = {
    temperature: 25,
    minTemperature: 20,
    maxTemperature: 30,
    condition: 'Clear',
    location: 'Sandton'
  };

  const mockForecast = {
    days: [
      { day: 'Today', temperature: 25, condition: 'Clear' },
      { day: 'Tomorrow', temperature: 26, condition: 'Clouds' },
      { day: 'Wednesday', temperature: 24, condition: 'Rain' }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch weather and forecast data successfully', async () => {
    const mockWeatherUseCase = {
      execute: jest.fn().mockResolvedValue(mockWeather)
    };

    const mockForecastUseCase = {
      execute: jest.fn().mockResolvedValue(mockForecast)
    };

    (WeatherFactory.makeGetWeatherUseCase as jest.Mock).mockReturnValue(mockWeatherUseCase);
    (WeatherFactory.makeGetForecastUseCase as jest.Mock).mockReturnValue(mockForecastUseCase);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.getWeatherAndForecast('Sandton');
    });

    expect(result.current.weather).toEqual(mockWeather);
    expect(result.current.forecast).toEqual(mockForecast);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  test('should handle errors properly', async () => {
    const mockError = new Error('Failed to fetch weather');
    const mockWeatherUseCase = {
      execute: jest.fn().mockRejectedValue(mockError)
    };

    (WeatherFactory.makeGetWeatherUseCase as jest.Mock).mockReturnValue(mockWeatherUseCase);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.getWeatherAndForecast('InvalidLocation');
    });

    expect(result.current.weather).toBeNull();
    expect(result.current.forecast).toBeNull();
    expect(result.current.error).toBe(mockError.message);
    expect(result.current.isLoading).toBe(false);
  });
}); 