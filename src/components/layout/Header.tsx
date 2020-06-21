import React from 'react';
import styled from 'styled-components';

type HeaderProps = {};

function Header({}: HeaderProps) {

  return (
    <S.Header>
      <h2>W.MANK</h2>
    </S.Header>
  );
}

const S: {
  Header: any;
} = {
  Header: styled.div`
    height: 5.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.navyD1};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  `,
};

export default Header;
