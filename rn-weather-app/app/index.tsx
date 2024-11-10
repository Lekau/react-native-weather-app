import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useWeather } from './presentation/hooks/useWeather';

export default function HomeScreen() {
  const { weather, error, isLoading, getWeather } = useWeather();

  
  React.useEffect(() => {
    getWeather('Sandton');
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      )}
      
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.location}>{weather.location}</Text>
          <Text style={styles.temperature}>{weather.temperature}°C</Text>
          <Text style={styles.condition}>{weather.condition}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50,
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