export interface WeatherThemeAssets {
  Clear: string;
  Clouds: string;
  Rain: string;
  default: string;
}

export type WeatherCondition = keyof WeatherThemeAssets;

export interface WeatherTheme {
  backgroundColor: string;
  textColor: string;
  backgroundImage: any;
} 