import React from 'react';
import styled from 'styled-components';
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo
} from 'react-facebook-login';

import IcoGoogle from '@components/atoms/icon/IcoGoogle';
import IcoKakaoTalk from '@components/atoms/icon/IcoKakaoTalk';
import IcoFacebook from '@components/atoms/icon/IcoFacebook';

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

interface IProps {
  provider: 'facebook' | 'google' | 'kakaoTalk';
  handleLoginClick: (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => void;
};

/**
 * 소셜 로그인 버튼
 * @component
 */

function SocialLoginButton({ provider, handleLoginClick }: IProps) {
  const socialButton = providerMap[provider];

  return (
    <S.SocialLoginButton color={socialButton.color} onClick={handleLoginClick}>
      <socialButton.icon />
    </S.SocialLoginButton>
  );
}

export default SocialLoginButton;

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

