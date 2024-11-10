import { WeatherDataSource } from '../../domain/datasources/WeatherDataSource';
import { Weather } from '../../domain/entities/Weather';
import { WeatherModel } from '../models/WeatherModel';
import { ENV } from '../../core/config/env';

export class OpenWeatherDataSource implements WeatherDataSource {
  async getWeatherByCity(city: string): Promise<Weather> {
    try {
      const response = await fetch(
        `${ENV.OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${ENV.OPENWEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const data: WeatherModel = await response.json();
      return this.mapToWeather(data);
    } catch (error) {
      console.error('OpenWeatherDataSource error:', error);
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  async getWeatherByLocation(lat: number, lon: number): Promise<Weather> {
    try {
      const response = await fetch(
        `${ENV.OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${ENV.OPENWEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const data: WeatherModel = await response.json();
      return this.mapToWeather(data);
    } catch (error) {
      console.error('OpenWeatherDataSource error:', error);
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  private mapToWeather(data: WeatherModel): Weather {
    return new Weather({
      temperature: Math.round(data.main.temp),
      minTemperature: Math.round(data.main.temp_min),
      maxTemperature: Math.round(data.main.temp_max),
      condition: data.weather[0].main,
      location: data.name,
    });
  }
} 