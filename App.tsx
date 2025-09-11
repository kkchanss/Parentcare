import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <View style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
      </View>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
