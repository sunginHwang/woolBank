const config = {
  api: {
    WBANK_URL: process.env.NODE_ENV === 'production' ? 'https://banketlist-api.woolta.com' : 'https://banketlist-api.woolta.com'
  },
  auth: {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    ACCESS_HEADER_TOKEN: 'bearer-auth'
  },
  message: {
    ACCESS_TOKEN_EXPIRED: 'jwt expired'
  }
};

export default config;
