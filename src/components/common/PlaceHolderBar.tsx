import React from 'react';
import styled from 'styled-components';

export interface PlaceHolderBarProps {
  width: string;
  height: string;
}

function PlaceHolderBar({ width = '100%', height = '1rem' }: PlaceHolderBarProps) {
  return <S.PlaceHolderBar width={width} height={height} />;
}

const S: {
  PlaceHolderBar: any;
} = {
  PlaceHolderBar: styled.div<{
    width: string;
    height: string;
  }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    animation: ${({ theme }) => theme.animations.loading} 1.3s infinite ease-in-out;
    border-radius: 0.3rem;
    margin-bottom: 0.5rem;
  `
};

export default PlaceHolderBar;
