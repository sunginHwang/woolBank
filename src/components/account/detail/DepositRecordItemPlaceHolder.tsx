import React from 'react';
import styled from 'styled-components';
import PlaceHolderBar from '../../common/PlaceHolderBar';

function DepositRecordItemPlaceHolder() {
  return (
    <S.DepositRecordItemPlaceHolder>
      <S.Info>
        <div>
          <PlaceHolderBar width='8rem' height='1.4rem' />
        </div>
        <div>
          <PlaceHolderBar width='12rem' height='1.2rem' />
        </div>
      </S.Info>
      <S.Amount>
        <PlaceHolderBar width='14rem' height='2rem' />
      </S.Amount>
    </S.DepositRecordItemPlaceHolder>
  );
}

const S: {
  DepositRecordItemPlaceHolder: any;
  Info : any;
  Amount: any;
} = {
  DepositRecordItemPlaceHolder: styled.div`
    display: flex;
    padding: 2rem 0;
    justify-content: space-between;
    align-items: center;
    
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;
    
    >div:last-child{
      padding: .05rem 0;
    }
    
    >div:first-child{
      padding: .1rem 0;
      margin-bottom: .4rem;
    }
  `,
  Amount: styled.div`
  `
};

export default DepositRecordItemPlaceHolder;
