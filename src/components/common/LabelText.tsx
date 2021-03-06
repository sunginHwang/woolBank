import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface LabelTextProps {
  children: ReactNode;
}

function LabelText({ children }: LabelTextProps) {
  return <S.LabelText>{children}</S.LabelText>;
}

const S: {
  LabelText: any;
} = {
  LabelText: styled.p`
    font-size: 2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.mainColor};
    text-align: left;
    margin-bottom: 2rem;
  `
};

export default LabelText;
