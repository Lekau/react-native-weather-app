import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ImageBackground } from 'react-native';
import { useWeather } from './presentation/hooks/useWeather';

export default function HomeScreen() {
  const { weather, error, isLoading, theme, getWeather } = useWeather();

  React.useEffect(() => {
    getWeather('Sandton');
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.overlay}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.textColor} />
              <Text style={[styles.loadingText, { color: theme.textColor }]}>
                Loading weather data...
              </Text>
            </View>
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : weather && (
            <View style={styles.weatherContainer}>
              <Image 
                source={theme.backgroundImage} 
                style={styles.weatherImage}
                resizeMode="cover"
              />
              <Text style={[styles.location, { color: theme.textColor }]}>
                {weather.location}
              </Text>
              <Text style={[styles.temperature, { color: theme.textColor }]}>
                {weather.temperature}°
              </Text>
              <Text style={[styles.condition, { color: theme.textColor }]}>
                {weather.condition}
              </Text>
            </View>
          )}
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
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  loadingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  weatherImage: {
    width: '100%',
    height: '70%',
    marginBottom: 20,
  },
  location: {
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    position: 'absolute',
    top: 30,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '700',
    marginVertical: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    position: 'absolute',
    top: 70,
  },
  condition: {
    fontSize: 34,
    textTransform: 'capitalize',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    position: 'absolute',
    top: 180,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
}); 