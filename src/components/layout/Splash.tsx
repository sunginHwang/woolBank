import React, { useState } from 'react';
import styled from 'styled-components';
import { useInterval } from '../../support/hooks/useInterval';
import mainImage from '../../image/main_image.svg';

function Splash() {
  const [dot, setDot] = useState('.');

  useInterval(() => {
    setDot(dot === '...' ? '.' : dot + '.');
  }, 500);

  return (
    <S.Splash>
      <img src={mainImage} />
      <S.Text>
        <p>잠시만 기다려주세요{dot}</p>
      </S.Text>
    </S.Splash>
  );
}

const S: {
  Splash: any;
  Text: any;
} = {
  Splash: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
    
    img {
      width: 10rem;
      height: 10rem;
    }
  `,
  Text: styled.div`
    width: 100%;
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${(props) => props.theme.colors.blackL2};
  `
};

export default Splash;
