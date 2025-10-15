import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';

interface WebViewScreenProps {
  route: {
    params: {
      url: string;
      title?: string;
    };
  };
}

export const WebViewScreen: React.FC<WebViewScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const { url, title = '웹페이지' } = route.params;

  // 안드로이드 하드웨어 뒤로가기 버튼 처리
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // 이벤트를 처리했음을 알림 (앱 종료 방지)
      }
      return false; // 웹뷰에서 더 이상 뒤로갈 수 없으면 기본 동작 (앱 화면으로 돌아가기)
    });

    return () => backHandler.remove();
  }, [canGoBack]);

  const handleGoBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 네비게이션 바 */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={handleGoBack}>
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={handleGoForward}>
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={handleRefresh}>
          <Text style={styles.navButtonText}>⟳</Text>
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
        </View>
        
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* 웹뷰 */}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsBackForwardNavigationGestures={true}
        onNavigationStateChange={(navState) => {
          // 뒤로가기 가능 여부 업데이트
          setCanGoBack(navState.canGoBack);
          console.log('Current URL:', navState.url);
          console.log('Can go back:', navState.canGoBack);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.pd10,
    paddingVertical: SIZES.pd10,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyD9,
  },
  navButton: {
    paddingHorizontal: SIZES.pd10,
    paddingVertical: SIZES.pd5,
    marginRight: SIZES.mg5,
  },
  navButtonText: {
    fontSize: SIZES.ft18,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: SIZES.pd10,
  },
  titleText: {
    fontSize: SIZES.ft16,
    color: COLORS.background,
    textAlign: 'center',
  },
  closeButton: {
    paddingHorizontal: SIZES.pd10,
    paddingVertical: SIZES.pd5,
  },
  closeButtonText: {
    fontSize: SIZES.ft18,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
});
