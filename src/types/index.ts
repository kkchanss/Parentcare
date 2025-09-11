// 공통 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}
