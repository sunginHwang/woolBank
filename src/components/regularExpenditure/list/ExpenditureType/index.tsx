import React from 'react';
import styled from 'styled-components';
import { addComma } from '@support/util/String';
import ExpenditureTypeItem from '@components/regularExpenditure/list/ExpenditureTypeItem';
import { RegularExpenditureType } from '@support/api/regularExpenditureApi';

export interface RegularAmountInfoProps {
  // 정기지출 타입
  expenditureType: RegularExpenditureType;
  // 삭제 버튼 클릭 이벤트
  onClickRemoveItem: (id: number) => void;
}

/**
 * 정기 지출 리스트 -> 정기 지출 타입별 리스트
 * @component
 */

function ExpenditureType({ expenditureType, onClickRemoveItem }: RegularAmountInfoProps) {
  const { list, name } = expenditureType;
  const totalAmount = list.reduce((acc, item) => item.amount + acc, 0);

  return (
    <S.ExpenditureType>
      <S.TypeInfo>
        <S.TypeText>{name}</S.TypeText>
        <S.TotalAmount>
          <b>{addComma(totalAmount)}</b> 원
        </S.TotalAmount>
      </S.TypeInfo>
      <ul>
        {list.map((item) => {
          return <ExpenditureTypeItem key={item.id} regularExpenditure={item} onClickRemoveItem={onClickRemoveItem} />;
        })}
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
