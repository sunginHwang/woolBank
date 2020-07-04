import React from 'react';
import styled from 'styled-components';
import theme from '../../style/colors';
import IcoChevronLeft from '../icon/IcoChevronLeft';

type HeaderWithBackProps = {
  title: string;
  onBackClick: () => void;
};


function HeaderWithBack({ title, onBackClick }: HeaderWithBackProps) {
  return (
    <S.HeaderWithBack>
      <div onClick={onBackClick}>
        <IcoChevronLeft width={26} height={26} fill={theme.colors.navyD1}/>
        <p>{title}</p>
      </div>
    </S.HeaderWithBack>
  );
}

const S: any = {
  HeaderWithBack: styled.div`
    height: 5.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    background-color: ${(props) => props.theme.colors.white};
    border-bottom: .1rem solid #DCDCE9;
    
    div {
      display: flex;
      flex-direction: row;
    }
    
    p {
      font-size: 1.6rem;
      margin-top: 0.4rem;
      color: ${(props) => props.theme.colors.blackL1};
    }
  `
};

export default HeaderWithBack;