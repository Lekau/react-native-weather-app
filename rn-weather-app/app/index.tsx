import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useWeather } from './presentation/hooks/useWeather';

export default function HomeScreen() {
  const { weather, error, isLoading, theme, getWeather } = useWeather();

  React.useEffect(() => {
    getWeather('Cape Town');
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.textColor} />
          <Text style={[styles.loadingText, { color: theme.textColor }]}>
            Loading weather data...
          </Text>
        </View>
      )}
      
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={[styles.location, { color: theme.textColor }]}>
            {weather.location}
          </Text>
          <Text style={[styles.temperature, { color: theme.textColor }]}>
            {weather.temperature}°C
          </Text>
          <Text style={[styles.condition, { color: theme.textColor }]}>
            {weather.condition}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  location: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '200',
    color: '#222',
    marginVertical: 10,
  },
  condition: {
    fontSize: 24,
    color: '#666',
    textTransform: 'capitalize',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    padding: 20,
  },
}); 