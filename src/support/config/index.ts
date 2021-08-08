
const defaultConfig = {
  socialAuthKey: {
    kakaoTalk: '',
    google: '',
    facebook: ''
  },
  api: {
    WBANK_URL: process.env.NODE_ENV === 'production' ? 'http://localhost:4000' : 'http://localhost:4000'
  },
  auth: {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    ACCESS_HEADER_TOKEN: 'bearer-auth'
  },
  message: {
    ACCESS_TOKEN_EXPIRED: 'jwt expired'
  }
}

export default defaultConfig;
