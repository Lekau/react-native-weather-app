import { WeatherBackgrounds, WeatherCondition, WeatherTheme } from '../models/WeatherUIModel';

export class WeatherThemeService {
  private static readonly backgrounds: WeatherBackgrounds = {
    Clear: '#47AB2F',
    Clouds: '#54717A',
    Rain: '#57575D',
    default: '#FFFFFF'
  };

  private static readonly darkConditions: WeatherCondition[] = ['Clear', 'Rain', 'Clouds'];

  static getTheme(condition?: string): WeatherTheme {
    const backgroundColor = this.getBackgroundColor(condition);
    const textColor = this.getTextColor(condition);

    return {
      backgroundColor,
      textColor
    };
  }

  private static getBackgroundColor(condition?: string): string {
    if (!condition) return this.backgrounds.default;
    return this.backgrounds[condition as WeatherCondition] || this.backgrounds.default;
  }

  private static getTextColor(condition?: string): string {
    return this.darkConditions.includes(condition as WeatherCondition) ? '#FFFFFF' : '#333333';
  }
} 