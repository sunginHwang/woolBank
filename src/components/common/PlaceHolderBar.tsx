import React from 'react';
import styled from 'styled-components';

export interface PlaceHolderBarProps {
  width: string;
  height: string;
}

function PlaceHolderBar({ width = '100%', height = '1rem' }: PlaceHolderBarProps) {
  return (
    <S.PlaceHolderBar width={width} height={height} />
  );
};

const S: any = {};

S.PlaceHolderBar = styled.div`
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.height};
  animation: ${({ theme }) => theme.animations.loading} 1.3s infinite ease-in-out;
  border-radius: .3rem;
  margin-bottom: .5rem;
`;

export default PlaceHolderBar;
