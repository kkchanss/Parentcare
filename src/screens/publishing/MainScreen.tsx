import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export const MainScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleNaverPress = () => {
    (navigation as any).navigate('WebView', {
      url: 'https://api.chanolja.com',
      title: '메인'
    });
  };

  const handleGooglePress = () => {
    (navigation as any).navigate('WebView', {
      url: 'https://api.chanolja.com/sub',
      title: '서브'
    });
  };

  const handleYouTubePress = () => {
    (navigation as any).navigate('WebView', {
      url: 'https://api.chanolja.com/sub2',
      title: '서브2'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
        
        <View>
            <Pressable style={styles.button} onPress={handleNaverPress}>
                <Text style={styles.buttonText}>메인 이동</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleGooglePress}>
                <Text style={styles.buttonText}>서브 이동</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleYouTubePress}>
                <Text style={styles.buttonText}>서브2 이동</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
