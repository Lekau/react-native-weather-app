import { useState, useCallback } from 'react';
import { Weather } from '../../domain/entities/Weather';
import { WeatherFactory } from '../../core/factory/WeatherFactory';
import { WeatherThemeService } from '../services/WeatherThemeService';
import { WeatherTheme } from '../models/WeatherUIModel';

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<WeatherTheme>(WeatherThemeService.getTheme());

  const getWeather = useCallback(async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const useCase = WeatherFactory.makeGetWeatherUseCase();
      const result = await useCase.execute(location);
      setWeather(result);
      setTheme(WeatherThemeService.getTheme(result.condition));
    } catch (e) {
      setError(e.message);
      setWeather(null);
      setTheme(WeatherThemeService.getTheme());
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    weather,
    error,
    isLoading,
    theme,
    getWeather
  };
}; 