import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import pageNotFound from '@/image/page_not_found.svg';

function PageNotFound() {
  return (
    <S.Screen>
      <img src={pageNotFound} alt='404 에러' />
      <p>
        해당 페이지는 존재하지 않는 페이지 입니다. <br /> 뒤로가기 혹은 홈 버튼을 눌러 뒤로 가주세요.
      </p>
      <Link to='/'>홈으로 이동</Link>
    </S.Screen>
  );
}

export default PageNotFound;

const S: {
  Screen: any;
} = {
  Screen: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      width: 20rem;
      height: auto;
      margin-bottom: 4rem;
    }

    a {
      width: 10rem;
      margin-top: 2rem;
      background-color: ${(props) => props.theme.colors.mainColor};
      color: ${(props) => props.theme.colors.white};
      border-radius: 0.8rem;
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    p {
      padding-left: 2rem;
      padding-right: 2rem;
      text-align: center;
      line-height: 1.5;
      font-size: 1.8rem;
      margin-top: 2rem;
    }
    div:last-child {
      margin-top: 2rem;
    }
  `
};
