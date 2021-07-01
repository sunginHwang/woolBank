import React from 'react';
import styled from 'styled-components';

interface IProps {
  onClick?: () => void;
  text: string;
}
/**
 * 레이블 ( todo size, color 선택 옵션 추가해야 함)
 * @component
 */

function Label({ text, onClick }: IProps) {
  return <S.Label onClick={onClick}>{text}</S.Label>;
}

const S: {
  Label: any;
} = {
  Label: styled.label`
    border-radius: 1.3rem;
    padding: 0.8rem 1.5rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.greyD3};
    background-color: ${({ theme }) => theme.colors.greyL2};
  `
};

export default Label;
