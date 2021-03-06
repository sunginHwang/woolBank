import React from 'react';
import styled from 'styled-components';

interface ICard {
  children: any;
  title?: string;
}

function Card({ title, children }: ICard) {
  return (
    <S.Card>
      {title && <h3>{title}</h3>}
      <div>
        {children}
      </div>
    </S.Card>
  );
}

interface IItem {
  children: any;
}

function Item({ children }: IItem) {
  return <S.Item>{children}</S.Item>;
}

interface IDefaultItem {
  title: string;
  onClick: () => void;
}

function DefaultItem({ title, onClick }: IDefaultItem) {
  return (
    <S.Item onClick={onClick}>
      <S.DefaultItem>
        <p>{title}</p>
        <p>&gt;</p>
      </S.DefaultItem>
    </S.Item>
  );
}

Card.Item = Item;
Card.DefaultItem = DefaultItem;

export default Card;

const S = {
  Card: styled.section`
    
    
    > h3 {
      font-size: 1.4rem;
      padding: 1rem 0;
    }
    > div {
      border: 0.1rem solid #e6e6e6;
      border-radius: 0.8rem;
      box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.1);
    }
  `,
  Item: styled.div`
    border-top: 0.1rem solid #f2f2f2;
    height: 4.8rem;
    display: flex;
    padding: 0 2rem;
    color: ${({ theme }) => theme.colors.blackL1};
  `,
  DefaultItem: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `
};
