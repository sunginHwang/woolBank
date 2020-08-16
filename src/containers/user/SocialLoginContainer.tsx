import React from 'react';
import styled from 'styled-components';
import  { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import KaKaoLogin from 'react-kakao-login';
import SocialLoginButton from '../../components/user/SocialLoginButton';
import SocialLogin from '../../components/user/SocialLogin';
import { KakaoLoginResponseV2 } from 'react-kakao-login/dist/types';
import { ISocialUser } from '../../models/ISocialUser';
import { delay } from '../../support/util/delay';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Auth from '../../store/modules/Auth';
import Layout from '../../store/modules/Layout';
import { IUser } from '../../models/IUser';
import keys from '../../../keys';

type SocialLoginContainerProps = {
};

function SocialLoginContainer({}: SocialLoginContainerProps) {

  const user = useSelector((state: RootState) => state.Auth.user);
  const dispatch = useDispatch();

  /**
   * facebook 간편 로그인 성공 콜백
   */
  const onFacebookLogin = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {

    const isFacebookLoginSuccess = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): response is ReactFacebookLoginInfo => {
      return (response as ReactFacebookLoginInfo).id !== undefined;
    }

    if(!isFacebookLoginSuccess(response)){
      onLoginFailure();
      return null;
    }

    onSocialLogin( {
      name: response.name || '',
      email: response.email || '',
      imageUrl: response.picture?.data.url || ''
    });

  }

  /**
   * google 간편 로그인 성공 콜백
   */
  const onGoogleLogin = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const isGoogleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline): response is GoogleLoginResponse => {
      return (response as GoogleLoginResponse).tokenId !== undefined;
    }

    if(!isGoogleLoginSuccess(response)){
      onLoginFailure();
      return null;
    }

    onSocialLogin( {
      name: response.profileObj.name,
      email: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl
    });
  }

  /**
   * kakaoTalk 간편 로그인 성공 콜백
   */
  const onKakaoTalkLogin = (response: KakaoLoginResponseV2) => {
    onSocialLogin({
      name: response.profile.properties.nickname || '',
      email: response.profile.kakao_account.email || '',
      imageUrl: response.profile.properties.thumbnail_image || ''
    });
  }

  /**
   * 소셜로그인 인증
   */
  const onSocialLogin = async (socialUser: ISocialUser) => {
    dispatch(Layout.actions.showLoading('로그인중입니다. 잠시만 기다려주세요.'));
    await delay(1000);

    const user: IUser = {
      id: 1,
      name: socialUser.name,
      email: socialUser.email,
      imageUrl: socialUser.imageUrl,
    }

    dispatch(Auth.actions.setUser(user));
    dispatch(Layout.actions.hideLoading());
  }

  const onLoginFailure = () => {
    alert('다시 로그인 해 주세요.');
  }

  const isLogin = user.id > 0;

  return (
    <S.SocialLoginContainer>
      {!isLogin && (
        <SocialLogin>
          <FacebookLogin
            appId={keys.social.facebook}
            fields='name,email,picture'
            render={(renderProps: any) => (
              <SocialLoginButton provider='facebook' handleLoginClick={renderProps.onClick} />
            )}
            callback={onFacebookLogin}
          />
          <GoogleLogin
            clientId={keys.social.google}
            cookiePolicy='single_host_origin'
            render={renderProps => (
              <SocialLoginButton provider='google' handleLoginClick={renderProps.onClick} />
            )}
            onSuccess={onGoogleLogin}
            onFailure={onLoginFailure}
          />
          <KaKaoLogin
            jsKey={keys.social.kakaoTalk}
            getProfile={true}
            render={renderProps => (
              <SocialLoginButton provider='kakaoTalk' handleLoginClick={renderProps.onClick} />
            )}
            onSuccess={onKakaoTalkLogin}
            onFailure={onLoginFailure}
          />
        </SocialLogin>
      )}
      {isLogin && (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <img src={user.imageUrl} />
        </div>
      )}
    </S.SocialLoginContainer>
  );
}

const S: {
  SocialLoginContainer: any;
} = {
  SocialLoginContainer: styled.div``
};

export default SocialLoginContainer;
