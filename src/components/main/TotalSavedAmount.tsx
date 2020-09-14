import React from 'react';
import styled from 'styled-components';
import { addComma } from '../../support/util/String';

export interface TotalSavedAmountProps {
  totalPrice: number;
}

function TotalSavedAmount({ totalPrice }: TotalSavedAmountProps) {
  return (
    <>
      <S.Amount>
        <p>오늘까지의</p>
        <p>총 저축 금액은</p>
        <p><strong>{addComma(totalPrice)} 원</strong> 입니다.</p>
      </S.Amount>
    </>
  );
}

const S: {
  Amount: any;
} = {
  Amount: styled.div`
    padding: 2rem 0 2rem 0;    
    >p{
      color: ${props => props.theme.colors.blackL2};
      font-size: 2.4rem;
      line-height: 1.8;
      font-weight: bold;
      
      > strong {
        color: ${props => props.theme.colors.mainColor};
      }
    }
  `

};

export default TotalSavedAmount;
