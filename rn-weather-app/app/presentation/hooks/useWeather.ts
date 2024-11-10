import { useState, useCallback } from 'react';
import { Weather } from '../../domain/entities/Weather';
import { WeatherFactory } from '../../core/factory/WeatherFactory';

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = useCallback(async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const useCase = WeatherFactory.makeGetWeatherUseCase();
      const result = await useCase.execute(location);
      setWeather(result);
    } catch (e) {
      setError(e.message);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    weather,
    error,
    isLoading,
    getWeather
  };
}; 