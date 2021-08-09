import dev from './dev';
import prod from './prod';

const env = process.env?.REACT_APP_ENV || 'dev';

export interface IEnvConfig {
  socialAuthKey: {
    kakaoTalk: string;
    google: string;
    facebook: string;
  },
  api: {
    WBANK_URL: string;
  },
}

export interface IConfig extends IEnvConfig{
  auth: {
    ACCESS_TOKEN: string,
    REFRESH_TOKEN: string,
    ACCESS_HEADER_TOKEN: string
  },
  message: {
    ACCESS_TOKEN_EXPIRED: string;
  },
}

const envConfig: IEnvConfig = {
  dev,
  prod
}[env];

const defaultConfig: IConfig = {
  auth: {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    ACCESS_HEADER_TOKEN: 'bearer-auth'
  },
  message: {
    ACCESS_TOKEN_EXPIRED: 'jwt expired'
  },
  ...envConfig
}

export default defaultConfig;
