import React from 'react';
import styled from 'styled-components';

type SocialLoginProps = {
  children: React.ReactNode;
};

function SocialLogin({
  children
}: SocialLoginProps) {
  return (
    <S.SocialLogin>
      <h3>소셜 로그인 하기</h3>
      <S.ButtonArea>
        {children}
      </S.ButtonArea>
    </S.SocialLogin>
  );
}

const S: {
  SocialLogin: any;
  ButtonArea: any;
} = {
  SocialLogin: styled.div`
    margin-top: 2rem;
    
    > h3 {
      font-size: 1.6rem;
      color: ${props => props.theme.colors.greyD2};
    }
  `,
  ButtonArea: styled.div`
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-around;
  `
};

export default SocialLogin;
