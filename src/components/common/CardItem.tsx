import React, { ReactNode } from 'react';
import styled from 'styled-components';

type CardItemProps = {
  children: ReactNode;
};

function CardItem({ children }: CardItemProps) {
  return <S.CardItem>{children}</S.CardItem>;
}

const S: {
  CardItem: any;
} = {
  CardItem: styled.div`
    padding: 2rem;
    background-color: ${(props) => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
    border-radius: 1.2rem;
    box-shadow: rgb(220, 220, 233) 0.1rem 0.7rem 1.3rem 0.6rem;
  `
};

export default CardItem;
