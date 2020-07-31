import React from 'react';
import styled from 'styled-components';
import theme from '../../style/colors';
import IcoChevronLeft from '../icon/IcoChevronLeft';

type HeaderWithBackProps = {
  title: string;
  onBackClick: () => void;
  right?: React.ReactNode | string;
};

function HeaderWithBack({ title, onBackClick, right }: HeaderWithBackProps) {
  return (
    <S.HeaderWithBack>
      <div>
        <div onClick={onBackClick}>
          <IcoChevronLeft width={26} height={26} fill={theme.colors.navyD1} />
        </div>
        <p>{title}</p>
        <S.rightHeader>{right}</S.rightHeader>
      </div>
    </S.HeaderWithBack>
  );
}

const S: any = {
  HeaderWithBack: styled.div`
    height: 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: ${(props) => props.theme.zIndex.header};
    background-color: ${(props) => props.theme.colors.white};
    border-bottom: 0.1rem solid #dcdce9;

    > div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      &:first-child {
        margin-left: 2rem;
      }
      &:last-child {
        margin-right: 2rem;
      }

      > div {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          justify-content: flex-start;
          text-align: left;
        }
        &:last-child {
          justify-content: flex-end;
          text-align: right;
        }
      }

      > p {
        flex: 2;
        text-align: center;
        font-size: 1.6rem;
        font-weight: bold;
        color: ${(props) => props.theme.colors.blackL1};
      }
    }
  `,
  rightHeader: styled.div`
    padding-top: 0.4rem;
    color: ${props => props.theme.colors.greyD2};
  `
};

export default HeaderWithBack;
