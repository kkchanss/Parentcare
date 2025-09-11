// 테스트 화면 컴포넌트
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import { Button } from '../components/common/Button';

export const TestScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Test Screen</Text>
        <Text style={styles.subtitle}>테스트 화면입니다!</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="홈으로 돌아가기"
            variant="primary"
            size="large"
            onPress={() => console.log('홈으로 돌아가기 버튼 클릭')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xxl,
  },
  buttonContainer: {
    width: '100%',
  },
});
