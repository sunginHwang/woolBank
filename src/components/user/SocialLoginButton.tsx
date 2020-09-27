import React from 'react';
import styled from 'styled-components';
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from 'react-facebook-login';

import IcoGoogle from '@components/icon/IcoGoogle';
import IcoKakaoTalk from '@components/icon/IcoKakaoTalk';
import IcoFacebook from '@components/icon/IcoFacebook';

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

export interface SocialLoginButtonProps {
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
  SocialLoginButton: styled.button<{
    color: string;
  }>`
    width: 4.8rem;
    height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ color }) => color};
    border-radius: 2.4rem;
    outline: none;
    border: 0.1rem solid rgb(222, 226, 230);
  `
};

export default SocialLoginButton;
