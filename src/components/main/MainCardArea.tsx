import React, { ReactNode } from 'react';
import styled from 'styled-components';

type MainCardAreaProps = {
  title: string;
  children: ReactNode
}

function MainCardArea({ title, children }: MainCardAreaProps) {
  return (
    <S.MainCardArea>
      <p>{title}</p>
      {children}
    </S.MainCardArea>
  );
}

const S: {
  MainCardArea: any;
} = {
  MainCardArea: styled.div`
    margin: 0 2rem 3rem 2rem;
    >p{
      font-size: 2rem;
      color: ${props => props.theme.colors.blackL1};
      font-weight: bold;
      margin-bottom: 1.4rem;
    }
  `
};

export default MainCardArea;
