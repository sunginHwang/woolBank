import { IEnvConfig } from '@support/config/index';

const prod: IEnvConfig = {
  socialAuthKey: {
    kakaoTalk: '',
    google: '',
    facebook: ''
  },
  api: {
    WBANK_URL: 'https://banketlist-api.woolta.com'
  }
};

export default prod;
