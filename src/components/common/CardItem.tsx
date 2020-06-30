import React, { ReactNode } from 'react';
import styled from 'styled-components';

type CardItemProps = {
  children: ReactNode;
}

function CardItem({ children }: CardItemProps) {
  return (
    <S.CardItem>
      {children}
    </S.CardItem>
  );
}


const S: {
  CardItem: any;
} = {
  CardItem: styled.div`
    padding: 2rem;
    background-color: ${props => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
    border-radius: 1.2rem;
    color: ${props => props.theme.colors.blackL1};
    box-shadow: rgb(220, 220, 233) .1rem .7rem 1.3rem .6rem;
  `
};

export default CardItem;
