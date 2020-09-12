import React, { useState } from 'react';
import styled from 'styled-components';
import IcoSplash from '../../components/icon/IcoSplash';
import { useInterval } from '../../support/hooks/useInterval';
import colors from '../../style/colors';

function Splash() {
  const [dot, setDot] = useState('.');

  useInterval(() => {
    setDot(dot === '...' ? '.' : dot + '.');
  }, 500);

  return (
    <S.Splash>
      <IcoSplash width={80} height={80} fill={colors.colors.navyD1} />
      <S.Text>
        <p>필요한 정보를 가져오고 있습니다.</p>
        <p>잠시만 기다려주세요.</p>
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
  `,
  Text: styled.div`
    width: 100%;
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `
};

export default Splash;
