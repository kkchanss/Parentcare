import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppNavigator } from './src/navigation/AppNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ padding: 30, backgroundColor: '#f0f0f0' }}>
      </View>
      <AppNavigator />
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
