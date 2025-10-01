// 홈 화면 컴포넌트
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONTS } from '../../constants';
import { Button } from '../../components/common/Button';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ParentCare</Text>
        <Text style={styles.subtitle}>부모님을 위한 케어 앱</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="시작하기"
            variant="primary"
            size="large"
            onPress={() => console.log('시작하기 버튼 클릭')}
          />
          <Button
            title="테스트 화면으로 이동"
            variant="secondary"
            size="large"
            onPress={() => navigation.navigate('Test' as never)}
            style={{ marginTop: SIZES.md }}
          />

          <Button
            title="테스트 화면2으로 이동"
            variant="secondary"
            size="large"
            onPress={() => navigation.navigate('Test2' as never)}
            style={{ marginTop: SIZES.md }}
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
