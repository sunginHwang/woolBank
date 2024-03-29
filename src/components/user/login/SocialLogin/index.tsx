import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ReactFacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import KaKaoLogin from 'react-kakao-login';
import { KakaoLoginResponseV2 } from 'react-kakao-login/dist/types';

import SocialLoginButton from '@components/user/login/SocialLogin/SocialLoginButton';
import LoginBox from '@components/user/login/LoginBox';

import { RootState } from '@/store';
import Auth from '@store/modules/Auth';
import Layout from '@store/modules/Layout';
import { delay } from '@support/util/delay';
import { useAlert } from '@support/hooks/useAlert';
import { ISocialUser } from '@models/ISocialUser';
import config from '@support/config';
import { createSocialUser } from '@support/api/userApi';
import { saveToken, setHeaderAuthToken } from '@support/util/apiCall';
import { ITokenInfo } from '@models/ITokenInfo';

const { socialAuthKey } = config;

/**
 * 소셜 로그인
 * @component
 */

function SocialLogin() {
  const user = useSelector((state: RootState) => state.Auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [onAlert] = useAlert();

  /**
   * facebook 간편 로그인 성공 콜백
   */
  const onFacebookLogin = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    const isFacebookLoginSuccess = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
      //@ts-ignore
      return response.id !== undefined;
    };

    if (!isFacebookLoginSuccess(response)) {
      onLoginFailure();
      return null;
    }

    //@ts-ignore
    onSocialLogin({
      //@ts-ignore
      name: response.name || '',
      //@ts-ignore
      email: response.email || '',
      //@ts-ignore
      imageUrl: response.picture?.data.url || '',
      //@ts-ignore
      socialId: response.id,
      loginType: 'facebook'
    });
  };

  /**
   * google 간편 로그인 성공 콜백
   */
  const onGoogleLogin = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const isGoogleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      //@ts-ignore
      return response.tokenId !== undefined;
    };

    if (!isGoogleLoginSuccess(response)) {
      onLoginFailure();
      return null;
    }

    onSocialLogin({
      //@ts-ignore
      name: response.profileObj.name,
      //@ts-ignore
      email: response.profileObj.email,
      //@ts-ignore
      imageUrl: response.profileObj.imageUrl,
      //@ts-ignore
      socialId: response.profileObj.googleId,
      loginType: 'google'
    });
  };

  /**
   * kakaoTalk 간편 로그인 성공 콜백
   */
  const onKakaoTalkLogin = (response: KakaoLoginResponseV2) => {
    onSocialLogin({
      name: response.profile.properties.nickname || '',
      email: response.profile.kakao_account.email || '',
      imageUrl: response.profile.properties.thumbnail_image || '',
      //@ts-ignore
      socialId: String(response.profile.id), // kakaoTalk 인터페이스 스펙이랑 다름.
      loginType: 'kakaoTalk'
    });
  };

  /**
   * 소셜로그인 인증
   */
  const onSocialLogin = async (socialUser: ISocialUser) => {
    dispatch(Layout.actions.showLoading('로그인중입니다. 잠시만 기다려주세요.'));
    await delay(1000);

    try {
      const res = await createSocialUser(socialUser);
      const { user, accessToken, refreshToken } = res.data.data;
      const tokenInfo: ITokenInfo = { accessToken, refreshToken };
      // token 로컬 스토리지 저장
      saveToken(tokenInfo);
      // api header 토큰 세팅
      setHeaderAuthToken(tokenInfo);
      dispatch(Auth.actions.setUser(user));
      history.push('/');
    } catch (e) {
      onLoginFailure();
    } finally {
      dispatch(Layout.actions.hideLoading());
    }
  };

  const onLoginFailure = () => {
    onAlert('다시 로그인 해 주세요.');
  };

  const isLogin = user.id > 0;

  if (isLogin) {
    return null;
  }

  return (
    <LoginBox title='소셜 로그인 하기' type='social'>
      <FacebookLogin
        appId={socialAuthKey.facebook}
        fields='name,email,picture'
        render={(renderProps: any) => <SocialLoginButton provider='facebook' handleLoginClick={renderProps.onClick} />}
        callback={onFacebookLogin}
      />
      <GoogleLogin
        clientId={socialAuthKey.google}
        cookiePolicy='single_host_origin'
        render={(renderProps) => <SocialLoginButton provider='google' handleLoginClick={renderProps.onClick} />}
        onSuccess={onGoogleLogin}
        onFailure={onLoginFailure}
      />
      <KaKaoLogin
        jsKey={socialAuthKey.kakaoTalk}
        getProfile={true}
        render={(renderProps) => <SocialLoginButton provider='kakaoTalk' handleLoginClick={renderProps.onClick} />}
        onSuccess={onKakaoTalkLogin}
        onFailure={onLoginFailure}
      />
    </LoginBox>
  );
}

export default SocialLogin;
