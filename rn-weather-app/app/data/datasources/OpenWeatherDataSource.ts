import { WeatherDataSource } from '../../domain/datasources/WeatherDataSource';
import { Weather } from '../../domain/entities/Weather';
import { Forecast, DayForecast } from '../../domain/entities/Forecast';
import { format } from 'date-fns';
import { ENV } from '../../core/config/env';

interface OpenWeatherResponse {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;  // Unix timestamp
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
    }>;
  }>;
  city: {
    name: string;
  };
}

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

      const data: OpenWeatherResponse = await response.json();
      return this.mapToWeather(data);
    } catch (error) {
      console.error('OpenWeatherDataSource error:', error);
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  async getForecast(city: string): Promise<Forecast> {
    try {
      const response = await fetch(
        `${ENV.OPENWEATHER_BASE_URL}/forecast?q=${city}&appid=${ENV.OPENWEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch forecast data');
      }

      const data: OpenWeatherForecastResponse = await response.json();
      return this.mapToForecast(data);
    } catch (error) {
      console.error('OpenWeatherDataSource forecast error:', error);
      throw new Error(`Failed to fetch forecast data: ${error.message}`);
    }
  }

  private mapToWeather(data: OpenWeatherResponse): Weather {
    return new Weather({
      temperature: Math.round(data.main.temp),
      minTemperature: Math.round(data.main.temp_min),
      maxTemperature: Math.round(data.main.temp_max),
      condition: data.weather[0].main,
      location: data.name,
    });
  }

  private mapToForecast(data: OpenWeatherForecastResponse): Forecast {
    const dailyForecasts: DayForecast[] = data.list
      .filter(item => item.dt_txt.includes('12:00:00'))
      .slice(0, 5)
      .map(item => {
        const date = new Date(item.dt * 1000);
        return {
          day: this.getDayName(date),
          temperature: Math.round(item.main.temp),
          condition: item.weather[0].main
        };
      });

    return new Forecast(dailyForecasts);
  }

  private getDayName(date: Date): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return format(date, 'EEEE');
    }
  }
} 