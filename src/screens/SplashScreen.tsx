import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // 애니메이션 시작
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // 2초 후 메인 화면으로 이동
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>👶</Text>
        </View>
        <Text style={styles.appName}>ParentCare</Text>
        <Text style={styles.tagline}>부모님을 위한 특별한 케어</Text>
      </Animated.View>
      
      <Animated.View
        style={[
          styles.loadingContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.loadingDots}>
          <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
          <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
          <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xxl * 2,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 60,
  },
  appName: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: COLORS.surface,
    marginBottom: SIZES.sm,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.surface,
    opacity: 0.8,
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: height * 0.15,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.surface,
    marginHorizontal: 4,
  },
});

export default SplashScreen;
