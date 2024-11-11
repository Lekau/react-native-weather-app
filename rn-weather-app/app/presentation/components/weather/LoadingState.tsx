import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingStateProps {
  textColor: string;
}

export const LoadingState = ({ textColor }: LoadingStateProps) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={textColor} />
    <Text style={[styles.loadingText, { color: textColor }]}>
      Loading weather data...
    </Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
}); 