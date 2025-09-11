// API 서비스
const BASE_URL = 'https://api.example.com';

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

const defaultConfig: ApiConfig = {
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export class ApiService {
  private config: ApiConfig;

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.config.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.config.headers,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.config.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
}

export const apiService = new ApiService();
