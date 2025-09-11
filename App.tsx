import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <View style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          App.tsx에서 렌더링됨!
        </Text>
      </View>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
