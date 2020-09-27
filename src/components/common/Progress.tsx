import React from 'react';
import styled from 'styled-components';

import palette from '@style/palette';

export interface ProgressProps {
  percent: number;
  color: string;
  label: string | number;
  labelSuffix?: string;
  labelPrefix?: string;
  startMessage?: string;
  endMessage?: string;
  messageColor?: string;
}

function Progress({
  percent,
  color,
  label,
  labelPrefix = '',
  labelSuffix = '',
  startMessage = '',
  endMessage = '',
  messageColor = palette.greyL1
}: ProgressProps) {
  return (
    <S.ProgressWrapper>
      <S.Label percent={percent}>
        {labelPrefix}
        {label}
        {labelSuffix}
      </S.Label>
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
  Label: styled.span<{
    percent: number;
  }>`
    width: 4rem;
    height: 3rem;
    left: ${({ percent }) => percent}%;
    top: -1.2rem;
    line-height: 3rem;
    text-align: center;
    background: ${({ theme }) => theme.colors.mainColor};
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.4rem;
    display: block;
    position: relative;
    transform: translate(-50%, 0);
    border-radius: 2.3rem;

    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-top: 0.5rem solid ${({ theme }) => theme.colors.mainColor};
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
      top: 100%;
      left: 50%;
      margin-left: -0.5rem;
      margin-top: -0.1rem;
    }
  `,
  Progress: styled.div`
    height: 0.5rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.greyL2};
    border-radius: 1.2rem;
  `,
  Bar: styled.div<{
    percent: number;
    color: string;
  }>`
    height: 0.5rem;
    border-radius: 1.2rem;
    width: ${({ percent }) => percent}%;
    background-color: ${({ color }) => color};
  `,
  Info: styled.div<{
    color: string;
  }>`
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
    justify-content: space-between;

    > span {
      font-size: 1.2rem;
      color: ${({ color }) => color};
    }
  `
};

export default Progress;
