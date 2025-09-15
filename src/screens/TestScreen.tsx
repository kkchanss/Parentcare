// 테스트 화면 컴포넌트
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import { Button } from '../components/common/Button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://date.nager.at/api/v3',
  timeout: 8000,
});

// 공휴일 API 호출 함수 (한국 2025년)
const fetchKoreanHolidays = async () => {
  const year = new Date().getFullYear();
  const { data } = await api.get(`/PublicHolidays/${year}/KR`);
  return data as Array<{ date: string; localName: string; name: string }>;
};

export const TestScreen: React.FC = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['holidays', 'KR', 2025],
    queryFn: fetchKoreanHolidays,
    staleTime: 5 * 60 * 1000, // 5분
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Test Screen</Text>
        <Text style={styles.subtitle}>공공 API로 2025년 한국 공휴일 불러오기</Text>

        {/* 로딩/에러/리스트 */}
        {isLoading ? (
          <ActivityIndicator size="large" style={{ marginVertical: SIZES.xl }} />
        ) : isError ? (
          <Text style={styles.errorMsg}>불러오기 실패 😵 다시 시도해보세요.</Text>
        ) : (
          <FlatList
            style={{ alignSelf: 'stretch' }}
            contentContainerStyle={{ paddingBottom: SIZES.xl }}
            data={data}
            keyExtractor={(item, index) => `${item.date}-${index}`}
            refreshing={isFetching}
            onRefresh={refetch}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.localName}</Text>
                <Text style={styles.cardSub}>{item.date}</Text>
                {item.name !== item.localName && (
                  <Text style={styles.cardEng}>{item.name}</Text>
                )}
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.msg}>표시할 공휴일이 없습니다.</Text>
            }
          />
        )}

        <View style={styles.buttonRow}>
          <Button
            title="새로고침"
            variant="secondary"
            size="medium"
            onPress={() => refetch()}
          />
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
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.lg,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: SIZES.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SIZES.lg,
    textAlign: 'center',
  },
  errorMsg: {
    textAlign: 'center',
    marginVertical: SIZES.xl,
    fontSize: 16,
    color: COLORS.danger ?? '#E11D48',
    fontFamily: FONTS.regular,
  },
  msg: {
    textAlign: 'center',
    marginTop: SIZES.lg,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.card ?? '#F4F4F5',
    borderRadius: 12,
    padding: SIZES.md,
    marginBottom: SIZES.md,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: FONTS.semibold ?? FONTS.bold,
    color: COLORS.text,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  cardEng: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: SIZES.lg,
    marginBottom: SIZES.xl,
  },
});
