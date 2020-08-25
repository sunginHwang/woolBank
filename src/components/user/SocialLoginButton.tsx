import React from 'react';
import styled from 'styled-components';
import IcoFacebook from '../icon/IcoFacebook';
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from 'react-facebook-login';
import IcoGoogle from '../icon/IcoGoogle';
import IcoKakaoTalk from '../icon/IcoKakaoTalk';

const providerMap = {
  kakaoTalk: {
    color: '#ffe812',
    icon: IcoKakaoTalk
  },
  google: {
    color: 'white',
    icon: IcoGoogle
  },
  facebook: {
    color: '#3b5998',
    icon: IcoFacebook
  }
};

type SocialLoginButtonProps = {
  provider: 'facebook' | 'google' | 'kakaoTalk';
  handleLoginClick: (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => void;
};

function SocialLoginButton({ provider, handleLoginClick }: SocialLoginButtonProps) {
  const socialButton = providerMap[provider];

  return (
    <S.SocialLoginButton color={socialButton.color} onClick={handleLoginClick}>
      <socialButton.icon />
    </S.SocialLoginButton>
  );
}

const S: {
  SocialLoginButton: any;
} = {
  SocialLoginButton: styled.button`
    width: 4.8rem;
    height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props: any) => props.color};
    border-radius: 2.4rem;
    outline: none;
    border: .1rem solid rgb(222, 226, 230);
  `
};

export default SocialLoginButton;
