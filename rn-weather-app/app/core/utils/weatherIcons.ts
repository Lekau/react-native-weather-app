import { Ionicons } from '@expo/vector-icons';

export const getWeatherIcon = (condition: string): keyof typeof Ionicons.glyphMap => {
  const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    Clear: 'sunny-outline',
    Clouds: 'cloudy-outline',
    Rain: 'rainy-outline',
    default: 'help-circle-outline'
  };
  
  return icons[condition] || icons.default;
}; 