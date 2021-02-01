import React from 'react';
import styled from 'styled-components';
import { addComma } from '@support/util/String';

export interface RegularAmountInfoProps {
  expenditureType: string;
}

function ExpenditureTypeList({ expenditureType }: RegularAmountInfoProps) {
  const totalExpenditureTypeAmount = 1030485;

  return (
    <S.ExpenditureTypeList>
      <S.TypeInfo>
        <S.TypeText>{expenditureType}</S.TypeText>
        <S.TotalAmount>
          <b>{addComma(totalExpenditureTypeAmount)}</b> 원
        </S.TotalAmount>
      </S.TypeInfo>
      <S.DummyList>리스트</S.DummyList>
    </S.ExpenditureTypeList>
  );
}

const S: {
  ExpenditureTypeList: any;
  TypeInfo: any;
  TypeText: any;
  TotalAmount: any;
  DummyList: any;
} = {
  ExpenditureTypeList: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
  `,
  TypeInfo: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
  `,
  TypeText: styled.span`
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.greyL1};
  `,
  TotalAmount: styled.span`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.blackL1};

    b {
      font-size: 1.4rem;
    }
  `,
  DummyList: styled.div` 
    margin-top: .5rem;
    padding: 1.5rem;
    border-radius: 1.8rem;
    background-color: ${({ theme }) => theme.colors.greyL2};
  `
};

export default ExpenditureTypeList;
