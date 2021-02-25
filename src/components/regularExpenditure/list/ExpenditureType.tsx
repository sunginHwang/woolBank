import React from 'react';
import styled from 'styled-components';
import { addComma } from '@support/util/String';
import ExpenditureTypeItem from '@components/regularExpenditure/list/ExpenditureTypeItem';

export interface RegularAmountInfoProps {
  // 지출 타입
  expenditureType: string;
}

/**
 * 정기 지출 리스트 -> 정기 지출 타입별 리스트
 * @component
 */

function ExpenditureType({ expenditureType }: RegularAmountInfoProps) {
  const totalExpenditureTypeAmount = 1030485;

  return (
    <S.ExpenditureType>
      <S.TypeInfo>
        <S.TypeText>{expenditureType}</S.TypeText>
        <S.TotalAmount>
          <b>{addComma(totalExpenditureTypeAmount)}</b> 원
        </S.TotalAmount>
      </S.TypeInfo>
      <ul>
        <ExpenditureTypeItem />
        <ExpenditureTypeItem />
        <ExpenditureTypeItem />
      </ul>
    </S.ExpenditureType>
  );
}

const S: {
  ExpenditureType: any;
  TypeInfo: any;
  TypeText: any;
  TotalAmount: any;
} = {
  ExpenditureType: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    
    &:last-child {
      padding-bottom: 20rem;
    }
  `,
  TypeInfo: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
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
  `
};

export default ExpenditureType;
