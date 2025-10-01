// 네비게이션 설정
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TestScreen } from '../screens/TestScreen';
import SplashScreen from '../screens/SplashScreen';
import { TestScreen2 } from '../screens/TestScreen2';
const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

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
        <Stack.Screen 
          name="Test2" 
          component={TestScreen2}
          options={{ title: 'Test Screen2' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
