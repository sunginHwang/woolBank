import React from 'react';
import styled from 'styled-components';

function Splash() {
  return (
    <S.Splash>
      <h2>스플래시 이미지에요</h2>
    </S.Splash>
  );
}

const S: {
  Splash: any;
} = {
  Splash: styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.white};
  `
};

export default Splash;
