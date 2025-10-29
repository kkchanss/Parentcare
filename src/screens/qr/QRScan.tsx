import * as React from 'react';
import { WebView } from 'react-native-webview';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function QRScan() {
  const [loading, setLoading] = React.useState(true);
  const [permission, requestPermission] = useCameraPermissions();
  const [scannerVisible, setScannerVisible] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);
  const webviewRef = React.useRef<any>(null);

  // 권한 처리
  React.useEffect(() => {
    if (permission === null) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);
  

  
  // 웹뷰에서 메시지 받기
  const handleWebMessage = (event: any) => {
    try {
      const msg = event.nativeEvent.data;
      if (msg === 'open_scanner') {
        if (permission?.granted) {
          setScanned(false); // 스캐너 열 때 리셋
          setScannerVisible(true);
        } else Alert.alert('권한 없음', '카메라 권한이 필요합니다.');
      } else {
        console.log('WebView message:', msg);
      }
    } catch (e) {
      console.warn('handleWebMessage error', e);
    }
  };

  // QR 스캔 결과 처리
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return; // 이미 스캔했으면 무시
    setScanned(true);
    
    const message = JSON.stringify({ type: 'qr_scanned', payload: { type, data } });
    if (webviewRef.current) {
      webviewRef.current.postMessage(message);
    }
    setScannerVisible(false);
  };

  // ----------------------------
  // 권한 상태에 따른 렌더링 제어
  if (!permission) {
    return <View style={styles.container} />; // 권한 요청 중
  }
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
            카메라 권한이 필요합니다.
          </Text>
          <TouchableOpacity onPress={requestPermission} style={styles.button}>
            <Text style={{ color: '#fff' }}>권한 요청</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  // ----------------------------


  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* 카메라 스캐너 오버레이 */}
      {scannerVisible ? (
        <View style={styles.scannerContainer}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          />
          <View style={styles.scannerTop}>
            <TouchableOpacity
              onPress={() => setScannerVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <WebView
          ref={webviewRef}
          style={styles.webview}
          source={{ uri: 'https://api.chanolja.com/qr/scanner' }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onMessage={handleWebMessage}
          androidLayerType="hardware"
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          originWhitelist={['*']}
          mixedContentMode="always"
          allowsProtectedMedia={true}
          javaScriptEnabled
          domStorageEnabled
          androidHardwareAccelerationDisabled={false}
          injectedJavaScript={`
            (function() {
              window.openNativeScanner = function() { window.ReactNativeWebView.postMessage('open_scanner'); };
              document.addEventListener('message', function(e) {
                try {
                  var msg = JSON.parse(e.data);
                  window.dispatchEvent(new MessageEvent('messageFromNative', { data: msg }));
                } catch (err) {
                  console.log('message from native:', e.data);
                }
              });
            })();
            true;
          `}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  webview: { flex: 1 },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  scannerContainer: { flex: 1, backgroundColor: '#000' },
  scannerTop: { position: 'absolute', top: 40, left: 16 },
  cancelButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelText: { color: '#fff', fontSize: 16 },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
