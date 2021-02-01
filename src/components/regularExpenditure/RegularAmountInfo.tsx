
import React from 'react';
import styled from 'styled-components';
import { addComma } from '@support/util/String';

export interface RegularAmountInfoProps {
  amount: number;
}

function RegularAmountInfo({ amount }: RegularAmountInfoProps) {
  return (
    <S.RegularAmountInfo>
      <S.AmountText>이달의 예상 지출 금액</S.AmountText>
      <S.Amount><b>{addComma(amount)}</b> 원</S.Amount>
    </S.RegularAmountInfo>
  );
}

const S: {
  RegularAmountInfo: any;
  AmountText: any;
  Amount: any;
} = {
  RegularAmountInfo: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0 2rem 0;
    padding: 1.5rem;
    border-radius: 1.8rem;
    background-color: ${({ theme }) => theme.colors.greyL2};
  `,
  AmountText: styled.span`
    font-size: 1.6rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.greyD1};
  `,
  Amount: styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.redL1};
    
    b {
      font-size: 1.6rem;
    }
  `
};

export default RegularAmountInfo;
