import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Text style={styles.error}>{message}</Text>
);

const styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
}); 