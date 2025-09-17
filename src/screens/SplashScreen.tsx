import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const lottieSize = Math.min(width, height) * 0.7;

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const handleAnimationFinish = () => {
        setTimeout(onFinish, 700);
    };

    return (
        <LinearGradient
            colors={['#75D89A', '#75D9BB', '#75D4D9']}
            locations={[0, 0.54, 0.9]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <LottieView
                source={require('../../assets/splash-icon-lottie.json')}
                autoPlay
                loop={false}
                speed={2.2}
                onAnimationFinish={handleAnimationFinish}
                style={{ width: lottieSize, height: lottieSize }}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});