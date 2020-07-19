import React from 'react';
import styled from 'styled-components';
import CardItem from '../../common/CardItem';
import PlaceHolderBar from '../../common/PlaceHolderBar';

function AccountListItemPlaceHolder() {
  return (
    <CardItem>
      <S.Top>
        <PlaceHolderBar width='13rem' height='1.8rem' />
        <PlaceHolderBar width='6rem' height='1.4rem' />
      </S.Top>
      <S.Content>
        <PlaceHolderBar width='15rem' height='3.1rem' />
      </S.Content>
      <S.Bottom>
        <PlaceHolderBar width='10rem' height='1.2rem' />
        <PlaceHolderBar width='10rem' height='1.2rem' />
      </S.Bottom>
      <S.Progress>
        <PlaceHolderBar width='100%' height='.1rem' />
      </S.Progress>
    </CardItem>
  );
}

const S: {
  Top: any;
  Content: any;
  Bottom: any;
  Progress: any;
} = {
  Top: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
  `,
  Content: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.8rem;
  `,
  Bottom: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Progress: styled.div`
    margin-top: 1.6rem;
  `
};

export default React.memo(AccountListItemPlaceHolder);
