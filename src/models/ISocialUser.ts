export interface ISocialUser {
  name: string;
  email: string;
  imageUrl: string;
  loginType: 'kakaoTalk' | 'google' | 'facebook';
  socialId: string;
};
