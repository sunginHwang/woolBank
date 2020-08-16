import React from 'react';
import styled from 'styled-components';

type LoginTitleProps = {
};

function LoginTitle({}: LoginTitleProps) {
  return (
    <S.LoginTitle>
      <h2>로그인</h2>
    </S.LoginTitle>
  );
}

const S: {
  LoginTitle: any;
} = {
  LoginTitle: styled.div`
    margin-top: 7rem;
    margin-bottom: 15rem;
    > h2 {
      font-size: 2.4rem;
      color: ${props => props.theme.colors.blackL1};
      font-weight: bold;
    }
  `
};

export default LoginTitle;
