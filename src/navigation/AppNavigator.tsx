// 네비게이션 설정
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TestScreen } from '../screens/TestScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'ParentCare' }}
        />
        <Stack.Screen 
          name="Test" 
          component={TestScreen}
          options={{ title: 'Test Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
