import React from 'react';
import styled from 'styled-components';

export interface LoginBoxProps {
  title: string;
  type: 'normal' | 'social';
  children: React.ReactNode;
}

function LoginBox({ title, type, children }: LoginBoxProps) {
  return (
    <S.LoginBox>
      <h3>{title}</h3>
      {type === 'social' && <S.ButtonArea>{children}</S.ButtonArea>}
      {type === 'normal' && <S.NormalArea>{children}</S.NormalArea>}
    </S.LoginBox>
  );
}

const S: {
  LoginBox: any;
  ButtonArea: any;
  NormalArea: any;
} = {
  LoginBox: styled.div`
    margin-bottom: 4rem;
    
    > h3 {
      font-size: 1.6rem;
      margin: 2rem 0 1.5rem 0;
      color: ${(props) => props.theme.colors.greyD2};
    }
  `,
  ButtonArea: styled.div`
    display: flex;
    justify-content: space-around;
  `,
  NormalArea: styled.div`
    div + div {
      margin-top: 2rem;
    }

    > button {
      margin-top: 3em;
      height: 5.5rem;
    }
  `
};

export default LoginBox;
