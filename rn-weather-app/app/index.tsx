import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useWeather } from './presentation/hooks/useWeather';
import { CurrentWeather } from './presentation/components/weather/CurrentWeather';
import { WeatherForecast } from './presentation/components/weather/WeatherForecast';
import { LoadingState } from './presentation/components/weather/LoadingState';
import { ErrorMessage } from './presentation/components/common/ErrorMessage';

export default function HomeScreen() {
  const { 
    weather, 
    forecast, 
    error, 
    isLoading, 
    theme, 
    getWeatherAndForecast 
  } = useWeather();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.overlay}>
        {isLoading ? (
          <LoadingState textColor={theme.textColor} />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : weather && forecast ? (
          <View style={styles.weatherContainer}>
            <CurrentWeather 
              weather={weather} 
              theme={theme} 
            />
            <WeatherForecast 
              forecast={forecast} 
              textColor={theme.textColor} 
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
  },
  weatherContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});