import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';

type ProgressProps = {
  percent: number;
  color: string;
  label: string | number;
  labelSuffix?: string;
  labelPrefix?: string;
  startMessage?: string;
  endMessage?: string;
  messageColor?: string;
};

function Progress({ percent, color, label, labelPrefix = '', labelSuffix = '', startMessage = '', endMessage = '', messageColor = colors.colors.greyL1 }: ProgressProps) {
  return (
    <S.ProgressWrapper>
      <S.Label percent={percent}>{labelPrefix}{label}{labelSuffix}</S.Label>
      <S.Progress>
        <S.Bar percent={percent} color={color} />
      </S.Progress>
      <S.Info color={messageColor}>
        <span>{startMessage}</span>
        <span>{endMessage}</span>
      </S.Info>
    </S.ProgressWrapper>
  );
}

const S: {
  ProgressWrapper: any;
  Progress: any;
  Bar: any;
  Info: any;
  Label: any;
} = {
  ProgressWrapper: styled.div`
    width: 100%;
  `,
  Label: styled.span`
    width:  4rem;
    height: 3rem;
    left: ${(props: any) => props.percent}%;
    top: -1.2rem;
    line-height: 3rem;;
    text-align: center;
    background: ${(props) => props.theme.colors.navyD1};
    color: #fff;
    font-size: 1.4rem;;
    display: block;
    position: relative;
    transform: translate(-50%, 0);
    border-radius: 2.3rem;
     
     &:before{
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-top: .5rem solid ${(props) => props.theme.colors.navyD1};
      border-left: .5rem solid transparent;
      border-right: .5rem solid transparent;
      top: 100%;
      left: 50%;
      margin-left: -.5rem;
      margin-top: -.1rem;
    }
  `,
  Progress: styled.div`
    height: 0.5rem;
    width: 100%;
    background-color: ${(props) => props.theme.colors.greyL2};
    border-radius: 1.2rem;
  `,
  Bar: styled.div`
    height: 0.5rem;
    border-radius: 1.2rem;
    width: ${(props: any) => props.percent}%;
    background-color: ${(props) => props.color};
  `,
  Info: styled.div`
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
    justify-content: space-between;

    > span {
      font-size: 1.2rem;
      color: ${(props:any) => props.color};
    }
  `
};

export default Progress;
