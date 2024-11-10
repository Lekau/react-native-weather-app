import { renderHook, act } from '@testing-library/react-native';
import { useWeather } from '../useWeather';
import { WeatherFactory } from '../../../core/factory/WeatherFactory';

jest.mock('../../../core/factory/WeatherFactory');

describe('useWeather', () => {
  test('should fetch weather data successfully', async () => {
    
    const mockWeather = {
      temperature: 25,
      condition: 'Sunny',
      location: 'London'
    };

    const mockUseCase = {
      execute: jest.fn().mockResolvedValue(mockWeather)
    };

    (WeatherFactory.makeGetWeatherUseCase as jest.Mock).mockReturnValue(mockUseCase);


    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.getWeather('London');
    });

 
    expect(result.current.weather).toEqual(mockWeather);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
}); 