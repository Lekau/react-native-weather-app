import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Weather } from '../../../domain/entities/Weather';

interface CurrentWeatherProps {
  weather: Weather;
  theme: {
    textColor: string;
    backgroundImage: any;
  };
}

export const CurrentWeather = ({ weather, theme }: CurrentWeatherProps) => (
  <View style={styles.weatherContainer}>
    <Image 
      source={theme.backgroundImage} 
      style={styles.weatherIcon}
      resizeMode="cover"
    />
    <Text style={[styles.location, { color: theme.textColor }]}>
      {weather.location}
    </Text>
    <Text style={[styles.temperature, { color: theme.textColor }]}>
      {weather.temperature}°C
    </Text>
    <View style={styles.minMaxContainer}>
      <MinMaxColumn 
        value={weather.minTemperature} 
        label="Min" 
        textColor={theme.textColor} 
      />
      <MinMaxColumn 
        value={weather.temperature} 
        label="Current" 
        textColor={theme.textColor} 
      />
      <MinMaxColumn 
        value={weather.maxTemperature} 
        label="Max" 
        textColor={theme.textColor} 
      />
    </View>
    <Text style={[styles.condition, { color: theme.textColor }]}>
      {weather.condition}
    </Text>
  </View>
);

interface MinMaxColumnProps {
  value: number;
  label: string;
  textColor: string;
}

const MinMaxColumn = ({ value, label, textColor }: MinMaxColumnProps) => (
  <View style={styles.minMaxTempColumn}>
    <Text style={[styles.minMaxTemp, { color: textColor }]}>
      {value}°
    </Text>
    <Text style={[styles.minMaxTemp, { color: textColor }]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  weatherIcon: {
    width: '100%',
    height: 400,
  },
  location: {
    fontSize: 32,
    fontWeight: '300',
    position: 'absolute',
    top: 10,
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
  minMaxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 10,
  },
  minMaxTempColumn: {
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  minMaxTemp: {
    fontSize: 16,
    fontWeight: '400',
  },
}); 