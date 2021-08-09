import { IEnvConfig } from '@support/config/index';

const dev: IEnvConfig = {
  socialAuthKey: {
    kakaoTalk: '',
    google: '',
    facebook: ''
  },
  api: {
    WBANK_URL: 'http://localhost:4000'
  }
};

export default dev;
