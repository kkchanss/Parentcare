// 유틸리티 함수들
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ko-KR');
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('ko-KR');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
