import React from 'react';
import styled from 'styled-components';

interface IProps {
  width: string;
  height: string;
}

/**
 * 로딩 스켈레톤 용 bar
 * @component
 */

function PlaceHolderBar({ width = '100%', height = '1rem' }: IProps) {
  return <S.PlaceHolderBar width={width} height={height} />;
}

export default PlaceHolderBar;

type PlaceHolderBarProps = {
  width: string;
  height: string;
};
const S = {
  PlaceHolderBar: styled.div<PlaceHolderBarProps>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    animation: ${({ theme }) => theme.animations.loading} 1.3s infinite ease-in-out;
    border-radius: 0.3rem;
    margin-bottom: 0.5rem;
  `
};
