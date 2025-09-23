import { useWindowDimensions } from "react-native";

const GUIDE_WIDTH = 390;   // 디자인 기준 너비
const TABLET_WIDTH = 768;  // 태블릿 기준 너비

export const useResponsive = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const isTablet = SCREEN_WIDTH >= TABLET_WIDTH;
  const isPhone = SCREEN_WIDTH < 360;

  const scale = (size: number, maxMultiplier = 1.4, minFont = 12) => {
    // GUIDE_WIDTH 기준 비율 계산
    let scaled = (SCREEN_WIDTH / GUIDE_WIDTH) * size;

    // 태블릿 확대
    if (isTablet) scaled *= 1.4;

    // 최대·최소 범위 지정
    const maxSize = size * maxMultiplier;

    // 390 이하에서는 size(디자인값)보다 더 작아지지 않게 보정
    const finalSize = Math.min(Math.max(scaled, size), maxSize);

    // 폰트 등 최소 크기 보장
    return Math.max(finalSize, minFont);
  };

  return { SCREEN_WIDTH, SCREEN_HEIGHT, isTablet, isPhone, scale };
};
