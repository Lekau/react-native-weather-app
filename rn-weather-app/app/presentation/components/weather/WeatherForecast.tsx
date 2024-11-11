import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ForecastDay } from './ForecastDay';
import { Forecast } from '../../../domain/entities/Forecast';

interface WeatherForecastProps {
  forecast: Forecast;
  textColor: string;
}

export const WeatherForecast = ({ forecast, textColor }: WeatherForecastProps) => (
  <View style={styles.forecastContainer}>
    {forecast.days.map((day) => (
      <ForecastDay
        key={day.day}
        {...day}
        textColor={textColor}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  forecastContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 0,
  },
}); 