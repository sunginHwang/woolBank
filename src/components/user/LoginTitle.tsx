import React from 'react';
import styled from 'styled-components';

function LoginTitle() {
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
    margin-top: 5rem;
    margin-bottom: 4rem;

    > h2 {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.blackL1};
      font-weight: bold;
    }
  `
};

export default LoginTitle;
