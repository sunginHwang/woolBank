import axios from 'axios';

import config from '@/config';
import { ITokenInfo } from '@models/ITokenInfo';

const { WBANK_URL } = config.api;
const { ACCESS_HEADER_TOKEN, ACCESS_TOKEN, REFRESH_TOKEN } = config.auth;
const { ACCESS_TOKEN_EXPIRED } = config.message;

const apiCall = axios.create({
  baseURL: WBANK_URL
});

// cors header config
apiCall.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
apiCall.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
apiCall.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

if (typeof (Storage) !== 'undefined') {
  apiCall.defaults.headers.common[ACCESS_HEADER_TOKEN] = localStorage.getItem(ACCESS_TOKEN);
}

// apiAccessToken 재발급 인터셉트
apiCall.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const isAccessTokenExpired = error.response.data.data.message === ACCESS_TOKEN_EXPIRED && error.response.status === 401;

    // accessToken 만료가 아닌 다른 에러는 바로 throw
    if (!isAccessTokenExpired) {
      return Promise.reject(error);
    }

    // 직전 호출 request
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    // accessToken 재발급은 첫 retry 일경우와 refresh 토큰이 있을 경우만 가능
    const isNotRetryGetAccessToken = originalRequest._retry || refreshToken === null;

    // Todo 인증이 안되니 정보 초기화 후 login 이동
    if (isNotRetryGetAccessToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    return apiCall
      .post('/auth/refresh-token-check', {
        refreshToken
      })
      .then(response => {
        const tokenInfo: ITokenInfo = response.data.data.authTokens;
        setHeaderAuthToken(tokenInfo);
        // 이전요청에서의 헤더정보도 변경해서 호출해야 함.
        originalRequest.headers.bearer_auth = response.data.data.authTokens.accessToken;
        return apiCall.request(originalRequest);
      });
  }
);

export const setHeaderAuthToken = (tokenInfo: ITokenInfo) => {
  localStorage.setItem(ACCESS_TOKEN, tokenInfo.accessToken);
  localStorage.setItem(REFRESH_TOKEN, tokenInfo.refreshToken);
  apiCall.defaults.headers.common.bearer_auth = tokenInfo.accessToken;
};

export default apiCall;
