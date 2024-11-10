import { WeatherThemeAssets, WeatherCondition, WeatherTheme } from '../models/WeatherUIModel';

export class WeatherThemeService {
  private static readonly backgrounds: WeatherBackgrounds = {
    Clear: '#47AB2F',
    Clouds: '#54717A',
    Rain: '#57575D',
    default: '#FFFFFF'
  };

  private static readonly images: WeatherThemeAssets = {
    Clear: require('../../../assets/images/forest_sunny.png'),
    Clouds: require('../../../assets/images/forest_cloudy.png'),
    Rain: require('../../../assets/images/forest_rainy.png'),
    default: require('../../../assets/images/forest_sunny.png')
  };

  private static readonly darkConditions: WeatherCondition[] = ['Rain'];

  static getTheme(condition?: string): WeatherTheme {
    const safeCondition = this.normalizeCondition(condition);
    
    return {
      backgroundColor: this.getBackgroundColor(safeCondition),
      textColor: this.getTextColor(safeCondition),
      backgroundImage: this.getWeatherImage(safeCondition)
    };
  }

  private static normalizeCondition(condition?: string): WeatherCondition {
    if (!condition) return 'default';
    return (this.images.hasOwnProperty(condition) ? condition : 'default') as WeatherCondition;
  }

  private static getBackgroundColor(condition: WeatherCondition): string {
    return this.backgrounds[condition];
  }

  private static getTextColor(condition: WeatherCondition): string {
    return this.darkConditions.includes(condition) ? '#FFFFFF' : '#333333';
  }

  private static getWeatherImage(condition: WeatherCondition): any {
    return this.images[condition];
  }
} 