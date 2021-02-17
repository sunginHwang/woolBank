import React from 'react';
import styled from 'styled-components';
import OneWeekAgoItem from '@components/regularExpenditure/list/OneWeekAgoItem';

export interface OneWeekRemainListProps {}

// eslint-disable-next-line no-empty-pattern
function OneWeekAgoList({}: OneWeekRemainListProps) {
  return (
    <S.ExpenditureType>
      <S.TypeInfo>
        <S.TypeText>일주일 이내 이체 예정 지출 목록</S.TypeText>
      </S.TypeInfo>
      <ul>
        <OneWeekAgoItem />
        <OneWeekAgoItem />
        <OneWeekAgoItem />
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
    margin-top: 2rem;
  `,
  TypeInfo: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  `,
  TypeText: styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blackL1};
  `,
  TotalAmount: styled.span`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.blackL1};

    b {
      font-size: 1.4rem;
    }
  `
};

export default OneWeekAgoList;
