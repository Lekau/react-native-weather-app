import { useState, useCallback } from 'react';
import { Weather } from '../../domain/entities/Weather';
import { Forecast } from '../../domain/entities/Forecast';
import { WeatherFactory } from '../../core/factory/WeatherFactory';
import { WeatherThemeService } from '../services/WeatherThemeService';
import React from 'react';

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(WeatherThemeService.getTheme());

  const getWeatherAndForecast = useCallback(async (location: string) => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const weatherUseCase = WeatherFactory.makeGetWeatherUseCase();
      const forecastUseCase = WeatherFactory.makeGetForecastUseCase();

      const [weatherResult, forecastResult] = await Promise.all([
        weatherUseCase.execute(location),
        forecastUseCase.execute(location)
      ]);

      setWeather(weatherResult);
      setForecast(forecastResult);
      setTheme(WeatherThemeService.getTheme(weatherResult.condition));
    } catch (e) {
      console.error('Weather fetch error:', e);
      setError(e.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getWeatherAndForecast('Sandton');
  }, []);

  return {
    weather,
    forecast,
    error,
    isLoading,
    theme,
    getWeatherAndForecast
  };
}; 