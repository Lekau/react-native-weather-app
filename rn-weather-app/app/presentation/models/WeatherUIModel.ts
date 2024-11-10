export interface WeatherBackgrounds {
  Clear: string;
  Clouds: string;
  Rain: string;
  default: string;
}

export type WeatherCondition = keyof WeatherBackgrounds;

export interface WeatherTheme {
  backgroundColor: string;
  textColor: string;
} 