import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWeatherIcon } from '../../../core/utils/weatherIcons';

interface ForecastDayProps {
  day: string;
  temperature: number;
  condition: string;
  textColor: string;
}

export const ForecastDay = ({ day, temperature, condition, textColor }: ForecastDayProps) => (
  <View style={styles.forecastRow}>
    <Text style={[styles.forecastDay, { color: textColor }]}>
      {day}
    </Text>
    <View style={styles.forecastIconContainer}>
      <Ionicons 
        name={getWeatherIcon(condition)}
        size={24}
        color={textColor}
      />
    </View>
    <Text style={[styles.forecastTemp, { color: textColor }]}>
      {temperature}°
    </Text>
  </View>
);

const styles = StyleSheet.create({
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  forecastDay: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  forecastIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 100,
  },
  forecastTemp: {
    width: 50,
    fontSize: 16,
    textAlign: 'right',
  },
}); 