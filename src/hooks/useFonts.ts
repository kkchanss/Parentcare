import { useFonts } from 'expo-font';

export const usePretendard = () => {
  const [fontsLoaded] = useFonts({
    'Pretendard-Thin': require('@assets/fonts/Pretendard-Thin.ttf'),
    'Pretendard-ExtraLight': require('@assets/fonts/Pretendard-ExtraLight.ttf'),
    'Pretendard-Light': require('@assets/fonts/Pretendard-Light.ttf'),
    'Pretendard-Regular': require('@assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-Medium': require('@assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-SemiBold': require('@assets/fonts/Pretendard-SemiBold.ttf'),
    'Pretendard-Bold': require('@assets/fonts/Pretendard-Bold.ttf'),
    'Pretendard-ExtraBold': require('@assets/fonts/Pretendard-ExtraBold.ttf'),
    'Pretendard-Black': require('@assets/fonts/Pretendard-Black.ttf'),
  });

  return fontsLoaded;
};