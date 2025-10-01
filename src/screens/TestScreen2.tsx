// 테스트 화면 컴포넌트
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo';
import { COLORS, SIZES, FONTS } from '../constants';
import { Button } from '../components/common/Button';

interface WiFiInfo {
  ssid: string | null;
  bssid: string | null;
  type: string;
  isConnected: boolean;
  isWifiEnabled: boolean;
  frequency: number | null;
  ipAddress: string | null;
  subnet: string | null;
}

export const TestScreen2: React.FC = () => {
  // 위치 관련 상태
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  
  // WiFi 관련 상태
  const [wifiInfo, setWifiInfo] = useState<WiFiInfo | null>(null);
  const [isLoadingWifi, setIsLoadingWifi] = useState(false);
  const [homeWiFiBSSID, setHomeWiFiBSSID] = useState<string | null>(null);

  // 앱 로드 시 WiFi 정보 자동 확인
  useEffect(() => {
    getCurrentWiFi();
    
    // WiFi 변경 실시간 감지
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('네트워크 상태 변경:', state);
      
      const details = state.details as any;
      const newWifiData: WiFiInfo = {
        ssid: details?.ssid || null,
        bssid: details?.bssid || null,
        type: state.type || 'unknown',
        isConnected: state.isConnected || false,
        isWifiEnabled: state.type === 'wifi',
        frequency: details?.frequency || null,
        ipAddress: details?.ipAddress || null,
        subnet: details?.subnet || null,
      };
      
      // 상태 업데이트 (중복 체크는 React가 처리)
      setWifiInfo(prevWifiInfo => {
        // 이전 WiFi와 다른지 확인하여 알림 표시
        if (prevWifiInfo?.bssid !== newWifiData.bssid || prevWifiInfo?.ssid !== newWifiData.ssid) {
          // WiFi 변경 알림 (중요한 변경만 알림)
          if (newWifiData.isConnected && newWifiData.type === 'wifi' && prevWifiInfo) {
            setTimeout(() => {
              Alert.alert(
                '📶 WiFi 변경 감지',
                `새로운 WiFi에 연결되었습니다!\n\n` +
                `WiFi 이름: ${newWifiData.ssid || '알 수 없음'}\n` +
                `BSSID: ${newWifiData.bssid || '알 수 없음'}`,
                [{ text: '확인' }]
              );
            }, 100);
          } else if (!newWifiData.isConnected && prevWifiInfo?.isConnected) {
            setTimeout(() => {
              Alert.alert(
                '📶 WiFi 연결 끊김',
                'WiFi 연결이 끊어졌습니다.',
                [{ text: '확인' }]
              );
            }, 100);
          }
        }
        return newWifiData;
      });
    });

    // 컴포넌트 언마운트 시 리스너 제거
    return () => unsubscribe();
  }, []); // 의존성 배열에서 wifiInfo 제거

  // 현재 WiFi를 집으로 설정
  const setAsHomeWiFi = () => {
    if (wifiInfo?.bssid) {
      setHomeWiFiBSSID(wifiInfo.bssid);
      Alert.alert(
        '🏠 집 WiFi 설정 완료',
        `현재 WiFi를 집으로 설정했습니다!\n\n` +
        `WiFi 이름: ${wifiInfo.ssid || '알 수 없음'}\n` +
        `BSSID: ${wifiInfo.bssid}`,
        [{ text: '확인' }]
      );
    } else {
      Alert.alert(
        '오류',
        '현재 WiFi 정보를 먼저 확인해주세요.',
        [{ text: '확인' }]
      );
    }
  };

  // 집인지 확인
  const isAtHome = () => {
    return homeWiFiBSSID && wifiInfo?.bssid === homeWiFiBSSID;
  };

  // 테스트용: WiFi 변경 시뮬레이션
  const simulateWiFiChange = () => {
    const testWiFiData: WiFiInfo = {
      ssid: "테스트_카페_WiFi",
      bssid: "test:ca:fe:wi:fi:00", 
      type: "wifi",
      isConnected: true,
      isWifiEnabled: true,
      frequency: 2400,
      ipAddress: "192.168.1.100",
      subnet: "255.255.255.0",
    };
    
    setWifiInfo(testWiFiData);
    
    Alert.alert(
      '🧪 WiFi 변경 시뮬레이션',
      `가상의 WiFi로 변경되었습니다!\n\n` +
      `WiFi 이름: ${testWiFiData.ssid}\n` +
      `BSSID: ${testWiFiData.bssid}\n` +
      `집 여부: ${homeWiFiBSSID === testWiFiData.bssid ? '🏠 집' : '❌ 집 아님'}`,
      [{ text: '확인' }]
    );
  };

  // 테스트용: 집 WiFi로 복원
  const simulateHomeWiFi = () => {
    if (homeWiFiBSSID) {
      const homeWiFiData: WiFiInfo = {
        ssid: "우리집_WiFi",
        bssid: homeWiFiBSSID,
        type: "wifi", 
        isConnected: true,
        isWifiEnabled: true,
        frequency: 5000,
        ipAddress: "192.168.0.50",
        subnet: "255.255.255.0",
      };
      
      setWifiInfo(homeWiFiData);
      
      Alert.alert(
        '🏠 집 WiFi 시뮬레이션',
        `집 WiFi로 복원되었습니다!\n\n` +
        `WiFi 이름: ${homeWiFiData.ssid}\n` +
        `BSSID: ${homeWiFiData.bssid}`,
        [{ text: '확인' }]
      );
    } else {
      Alert.alert('오류', '먼저 집 WiFi를 설정해주세요.');
    }
  };

  // WiFi 정보 가져오기
  const getCurrentWiFi = async (showAlert: boolean = false) => {
    try {
      setIsLoadingWifi(true);
      
      const netInfo = await NetInfo.fetch();
      console.log('NetInfo:', netInfo);
      
      const details = netInfo.details as any;
      const wifiData: WiFiInfo = {
        ssid: details?.ssid || null,
        bssid: details?.bssid || null,
        type: netInfo.type || 'unknown',
        isConnected: netInfo.isConnected || false,
        isWifiEnabled: netInfo.type === 'wifi',
        frequency: details?.frequency || null,
        ipAddress: details?.ipAddress || null,
        subnet: details?.subnet || null,
      };
      
      setWifiInfo(wifiData);
      
      // 버튼을 눌렀을 때만 Alert 표시
      if (showAlert) {
        Alert.alert(
          'WiFi 정보',
          `연결 상태: ${wifiData.isConnected ? '연결됨' : '연결 안됨'}\n` +
          `네트워크 타입: ${wifiData.type}\n` +
          `WiFi 이름: ${wifiData.ssid || '알 수 없음'}\n` +
          `BSSID (고유번호): ${wifiData.bssid || '알 수 없음'}\n` +
          `주파수: ${wifiData.frequency ? wifiData.frequency + 'MHz' : '알 수 없음'}\n` +
          `IP 주소: ${wifiData.ipAddress || '알 수 없음'}`,
          [{ text: '확인' }]
        );
      }
    } catch (error) {
      console.error('WiFi 정보 가져오기 오류:', error);
      if (showAlert) {
        Alert.alert('오류', 'WiFi 정보를 가져오는 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoadingWifi(false);
    }
  };

  // 위치 권한 요청
  const requestLocationPermission = async () => {
    try {
      setIsLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          '위치 권한 필요',
          '현재 위치를 가져오려면 위치 권한이 필요합니다.',
          [{ text: '확인' }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('위치 권한 요청 오류:', error);
      Alert.alert('오류', '위치 권한 요청 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // 현재 위치 가져오기
  const getCurrentLocation = async () => {
    try {
      setIsLoadingLocation(true);
      
      // 권한 확인
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      // 현재 위치 가져오기
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocation(currentLocation);
      
      Alert.alert(
        '위치 정보',
        `위도: ${currentLocation.coords.latitude.toFixed(6)}\n경도: ${currentLocation.coords.longitude.toFixed(6)}`,
        [{ text: '확인' }]
      );
    } catch (error) {
      console.error('위치 가져오기 오류:', error);
      Alert.alert('오류', '현재 위치를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Test Screen 2</Text>
          <Text style={styles.subtitle}>지오펜싱 테스트 화면</Text>

        {/* 위치 정보 섹션 */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>📍 위치 정보</Text>
          
          {location ? (
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>
                위도: {location.coords.latitude.toFixed(6)}
              </Text>
              <Text style={styles.locationText}>
                경도: {location.coords.longitude.toFixed(6)}
              </Text>
              <Text style={styles.locationText}>
                정확도: {location.coords.accuracy?.toFixed(0)}m
              </Text>
              <Text style={styles.locationText}>
                시간: {new Date(location.timestamp).toLocaleString()}
              </Text>
            </View>
          ) : (
            <Text style={styles.noLocationText}>
              위치 정보가 없습니다. 아래 버튼을 눌러 현재 위치를 가져오세요.
            </Text>
          )}

          <View style={styles.locationButtonContainer}>
            <Button
              title={isLoadingLocation ? "위치 가져오는 중..." : "현재 위치 가져오기"}
              variant="primary"
              size="medium"
              onPress={getCurrentLocation}
              disabled={isLoadingLocation}
            />
          </View>
        </View>

        {/* WiFi 정보 섹션 */}
        <View style={styles.wifiSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📶 WiFi 정보</Text>
            {isAtHome() && (
              <Text style={styles.homeIndicator}>🏠 집</Text>
            )}
          </View>
          
          {wifiInfo ? (
            <View style={styles.wifiInfo}>
              <Text style={styles.wifiText}>
                연결 상태: {wifiInfo.isConnected ? '✅ 연결됨' : '❌ 연결 안됨'}
              </Text>
              <Text style={styles.wifiText}>
                네트워크 타입: {wifiInfo.type}
              </Text>
              <Text style={styles.wifiText}>
                WiFi 이름: {wifiInfo.ssid || '알 수 없음'}
              </Text>
              <Text style={styles.wifiText}>
                🆔 BSSID (고유번호): {wifiInfo.bssid || '알 수 없음'}
              </Text>
              <Text style={styles.wifiText}>
                📡 주파수: {wifiInfo.frequency ? wifiInfo.frequency + 'MHz' : '알 수 없음'}
              </Text>
              <Text style={styles.wifiText}>
                🌐 IP 주소: {wifiInfo.ipAddress || '알 수 없음'}
              </Text>
              <Text style={styles.wifiText}>
                WiFi 활성화: {wifiInfo.isWifiEnabled ? '✅ 활성화' : '❌ 비활성화'}
              </Text>
            </View>
          ) : (
            <Text style={styles.noWifiText}>
              WiFi 정보가 없습니다. 아래 버튼을 눌러 현재 WiFi 정보를 가져오세요.
            </Text>
          )}

          <View style={styles.wifiButtonContainer}>
            <View style={styles.wifiButtonRow}>
              <Button
                title={isLoadingWifi ? "WiFi 확인 중..." : "현재 WiFi 확인"}
                variant="secondary"
                size="medium"
                onPress={() => getCurrentWiFi(true)}
                disabled={isLoadingWifi}
              />
              {wifiInfo?.bssid && (
                <Button
                  title="🏠 집으로 설정"
                  variant="outline"
                  size="medium"
                  onPress={setAsHomeWiFi}
                  style={{ marginLeft: SIZES.sm }}
                />
              )}
            </View>
          </View>
        </View>


        {/* 테스트 섹션 */}
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>🧪 WiFi 변경 테스트</Text>
          <Text style={styles.testDescription}>
            실제 WiFi 변경 없이 기능을 테스트해보세요
          </Text>
          
          <View style={styles.testButtonContainer}>
            <Button
              title="🏪 카페 WiFi로 변경"
              variant="outline"
              size="medium"
              onPress={simulateWiFiChange}
            />
            <Button
              title="🏠 집 WiFi로 복원"
              variant="outline"
              size="medium"
              onPress={simulateHomeWiFi}
              style={{ marginTop: SIZES.sm }}
            />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Button
            title="홈으로 돌아가기"
            variant="primary"
            size="large"
            onPress={() => console.log('홈으로 돌아가기 버튼 클릭')}
          />
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SIZES.xl,
  },
  content: {
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: SIZES.lg,
    marginBottom: SIZES.xl,
  },
  locationSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SIZES.md,
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  locationInfo: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SIZES.sm,
    marginBottom: SIZES.sm,
  },
  locationText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginBottom: 2,
  },
  noLocationText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.sm,
    fontStyle: 'italic',
  },
  locationButtonContainer: {
    alignItems: 'center',
  },
  wifiSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SIZES.md,
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  wifiInfo: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SIZES.sm,
    marginBottom: SIZES.sm,
  },
  wifiText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginBottom: 2,
  },
  noWifiText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.sm,
    fontStyle: 'italic',
  },
  wifiButtonContainer: {
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  homeIndicator: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.success,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  wifiButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  testSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SIZES.md,
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  testDescription: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.md,
    fontStyle: 'italic',
  },
  testButtonContainer: {
    alignItems: 'center',
  },
});
