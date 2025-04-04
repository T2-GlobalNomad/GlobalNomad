import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';
import { tokens } from '@/lib/types';

const BASE_URL = 'https://sp-globalnomad-api.vercel.app/12-2';

// api instance
/* 자동 데이터 파싱(JSON)
get, post, delete 등 체인방식으로 사용 가능 : instance.get('/users') */

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // Authorization: `Bearer TOKEN`, // << 하드코딩으로 데이터 확인할 때
    'Content-Type': 'application/json',
  },
  params: {
    method: 'offset',
    offset: 0,
  },
});

// 데이터 요청 시작시 토큰을 헤더에 담는 과정
instance.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig /* 데이터를 가공하는 config의 타입 지정 */,
  ) => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 401(토큰만료)시 갱신
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw new Error('! Refresh token이 없습니다.');
        }

        const { data } = await axios.post<tokens>(`${BASE_URL}/auth/tokens`, {
          refreshToken,
          accessToken: Cookies.get('accessToken'),
        });

        Cookies.set('accessToken', data.accessToken);
        Cookies.set('refreshToken', data.refreshToken);

        if (!error.config) return Promise.reject(error);
        const initialRequest = error.config as InternalAxiosRequestConfig & {
          retry?: boolean;
        };

        if (initialRequest.retry) return Promise.reject(error);
        initialRequest.retry = true;
        initialRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return instance(initialRequest);
      } catch (error) {
        console.error('토큰 갱신 실패: ', error);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
