import React from 'react';
import styled from 'styled-components';
import OneWeekAgoItem from '@components/regularExpenditure/list/OneWeekAgoItem';
import { IRegularExpenditure } from '@models/IRegularExpenditure';

export interface IOneWeekRemainListProps {
  // 일주일 안남은 정기지출 리스트
  regularExpenditureList: IRegularExpenditure[];
}

/**
 * 정기 지출 리스트 -> 이주일 이내 지출 리스트
 * @component
 */

function OneWeekAgoList({ regularExpenditureList }: IOneWeekRemainListProps) {
  const isEmptyList = regularExpenditureList.length === 0;

  return (
    <S.ExpenditureType>
      <S.TypeInfo>
        <S.TypeText>일주일 이내 이체 예정 지출 목록</S.TypeText>
      </S.TypeInfo>
      {isEmptyList && <S.Empty>당분간 지출할 내역이 없어요. :)</S.Empty>}
      {!isEmptyList && (
        <S.OneWeekAgoList>
          {regularExpenditureList.map((item) => (
            <OneWeekAgoItem key={item.id} regularExpenditure={item} />
          ))}
        </S.OneWeekAgoList>
      )}
    </S.ExpenditureType>
  );
}

const S: {
  ExpenditureType: any;
  TypeInfo: any;
  TypeText: any;
  TotalAmount: any;
  Empty: any;
  OneWeekAgoList: any;
} = {
  OneWeekAgoList: styled.ul`
    white-space: nowrap;
    overflow: auto;
  `,
  Empty: styled.p`
    padding: 1.1rem 1.2rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.greyD3};
  `,
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
