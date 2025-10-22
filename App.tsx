import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import SplashScreenComponent from './src/screens/SplashScreen';
import { Login } from './src/screens/auth/Login';
import { HomeScreen } from './src/screens/home/HomeScreen';
import { MainScreen } from './src/screens/publishing/MainScreen';
import { WebViewScreen } from './src/screens/WebViewScreen';
import { usePretendard } from './src/hooks/useFonts';
import JoinPage from './src/screens/auth/Join';


const Stack = createNativeStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const fontsLoaded = usePretendard();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (showSplash) {
    return <SplashScreenComponent onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="WebView" component={WebViewScreen} />
          <Stack.Screen name="JoinPage" component={JoinPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
