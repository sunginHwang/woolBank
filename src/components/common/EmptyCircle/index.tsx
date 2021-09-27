import React from 'react';
import styled from 'styled-components';

interface IProps {
  size: number;
}

/**
 * 공백의 원형 div
 * @component
 */

function EmptyCircle({ size }: IProps) {
  return <S.EmptyCircle size={size / 10} />;
}

export default EmptyCircle;

const S = {
  EmptyCircle: styled.div<{ size: number }>`
    width: ${({ size }) => `${size}rem`};
    height: ${({ size }) => `${size}rem`};
    min-width: ${({ size }) => `${size}rem`};
    min-height: ${({ size }) => `${size}rem`};
    background-color: ${({ theme }) => theme.colors.pinkL1};
    border-radius: 50%;
  `
};
