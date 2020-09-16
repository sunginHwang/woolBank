import React, { ReactNode } from 'react';
import styled from 'styled-components';

type CardItemProps = {
  children: ReactNode;
  useSideMargin?: boolean;
};

function CardItem({ children, useSideMargin = false }: CardItemProps) {
  return <S.CardItem useSideMargin={useSideMargin}>{children}</S.CardItem>;
}

const S: {
  CardItem: any;
} = {
  CardItem: styled.div`
    padding: 2rem;
    ${(props: any) => props.useSideMargin && 'margin: 0 2rem'};
    background-color: ${(props) => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
    border-radius: 1.2rem;
    box-shadow: rgb(220, 220, 233) 0.1rem 0.3rem 1rem 0.3rem;
  `
};

export default CardItem;
