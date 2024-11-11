import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '@env';

if (!OPENWEATHER_API_KEY || !OPENWEATHER_BASE_URL) {
  throw new Error('Missing required environment variables');
}

export const config = {
  openWeather: {
    apiKey: OPENWEATHER_API_KEY,
    baseUrl: OPENWEATHER_BASE_URL,
  },
} as const; 