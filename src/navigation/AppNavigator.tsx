// 네비게이션 설정
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TestScreen } from '../screens/TestScreen';
import { MainScreen } from '../screens/publishing/mainScreen';
import { Login } from '../screens/auth/Login';
import  JoinPage  from '../screens/auth/Join';


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
          name="Login" 
          component={Login}
          options={{ title: '로그인' }}
        />
        <Stack.Screen 
          name="Join" 
          component={JoinPage}
          options={{ title: '회원가입' }}
        />
        <Stack.Screen 
          name="Test" 
          component={TestScreen}
          options={{ title: 'Test Screen' }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{ title: 'Main Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
