// 간단한 axios API 서비스
import axios from 'axios';

const BASE_URL = 'https://api.example.com';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 공휴일 API 인스턴스 (TestScreen에서 사용)
export const holidaysApi = axios.create({
  baseURL: 'https://date.nager.at/api/v3',
  timeout: 8000,
});

// 공휴일 API 함수 (TestScreen에서 사용)
export const fetchKoreanHolidays = async () => {
  const year = new Date().getFullYear();
  const { data } = await holidaysApi.get(`/PublicHolidays/${year}/KR`);
  return data as Array<{ date: string; localName: string; name: string }>;
};

export default apiClient;
