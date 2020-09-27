import React from 'react';
import styled from 'styled-components';

import DepositListItem from '@components/account/DepositListItem';
import DepositRecordItemSkeleton from '@components/account/detail/DepositRecordItemSkeleton';

import { IDeposit } from '@models/IDeposit';

export interface DepositRecordProps {
  depositList?: IDeposit[];
  isLoading?: boolean;
};

function DepositList({ depositList, isLoading = false }: DepositRecordProps) {
  // loading 상태
  if (isLoading) {
    const tenLoadingHolders = [...Array(10)];
    return (
      <S.DepositRecord>
        {
          tenLoadingHolders.map((_, key) => <DepositRecordItemSkeleton key={key} />)
        }
      </S.DepositRecord>
    );
  }

  const isEmptyDeposit = !depositList || depositList.length === 0;

  return (
    <S.DepositRecord>
      <p>입금 내역</p>
      {
        isEmptyDeposit
          ? <S.EmptyDeposit>입금 기록이 존재하지 않습니다. :(</S.EmptyDeposit>
          : depositList && depositList.map((deposit, index) => {
            return <DepositListItem key={index} deposit={deposit} />;
          })
      }
    </S.DepositRecord>
  );
}

const S: {
  DepositRecord: any;
  EmptyDeposit: any;
} = {
  DepositRecord: styled.div`
    margin-top: .5rem;
    padding: 2rem 2rem 10rem 2rem;
    background-color: ${({ theme }) => theme.colors.white};
    >p {
      font-size: 2.2rem;
      color: ${({ theme }) => theme.colors.blackL1};
      font-weight: bold;
    }
  `,
  EmptyDeposit: styled.div`
    display: flex;
    margin-top: 5rem;
    justify-content: center;
    
    color: ${({ theme }) => theme.colors.blackL1}
  `
};

export default DepositList;
