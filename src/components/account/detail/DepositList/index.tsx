import React from 'react';
import styled from 'styled-components';

import Item from '@components/account/detail/DepositList/Item';
import { IDeposit } from '@models/IDeposit';

import ListSkeleton from './ListSkeleton';
import DepositListWrapper from './DepositListWrapper';

interface IProps {
  depositList?: IDeposit[];
}

/**
 * 예적금 상세 - 입금 리스트
 * @component
 */

function DepositList({ depositList }: IProps) {
  const isEmptyDeposit = !depositList || depositList.length === 0;

  return (
    <DepositListWrapper>
      <p>입금 내역</p>
      {
        isEmptyDeposit
          ? <S.EmptyDeposit>입금 기록이 존재하지 않습니다. :(</S.EmptyDeposit>
          : depositList && depositList.map((deposit, index) => {
            return <Item key={index} deposit={deposit} />;
          })
      }
    </DepositListWrapper>
  );
}

DepositList.Skeleton = ListSkeleton;

export default DepositList;

const S = {
  EmptyDeposit: styled.div`
    display: flex;
    margin-top: 5rem;
    justify-content: center;
    
    color: ${({ theme }) => theme.colors.blackL1}
  `
};
