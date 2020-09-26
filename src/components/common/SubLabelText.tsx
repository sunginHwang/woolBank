import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface SubLabelTextProps {
  children: ReactNode;
}

function SubLabelText({ children }: SubLabelTextProps) {
  return (
    <S.SubLabelText>
      {children}
    </S.SubLabelText>
  );
}

const S: {
  SubLabelText: any;
} = {
  SubLabelText: styled.p`
    font-size: 1.2rem;
    margin: -1rem 0 2.5rem 0;
    color: ${props => props.theme.colors.greyD2};
  `
};

export default SubLabelText;
