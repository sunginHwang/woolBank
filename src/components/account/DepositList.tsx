import React from 'react';
import styled from 'styled-components';
import DepositListItem from './DepositListItem';
import DepositRecordItemPlaceHolder from './detail/DepositRecordItemPlaceHolder';
import { IDeposit } from '../../models/IDeposit';

type DepositRecordProps = {
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
          tenLoadingHolders.map((_, key) => <DepositRecordItemPlaceHolder key={key} />)
        }
      </S.DepositRecord>
    );
  }

  const isEmptyDeposit = !depositList;

  return (
    <S.DepositRecord>
      <p>입금 내역</p>
      {
        isEmptyDeposit
          ? <div>입금 기록이 없습니다.</div>
          : depositList && depositList.map((deposit, index) => {
            return <DepositListItem key={index} deposit={deposit} />;
          })
      }
    </S.DepositRecord>
  );
}

const S: {
  DepositRecord: any;
} = {
  DepositRecord: styled.div`
    margin-top: .5rem;
    padding: 2rem 2rem 10rem 2rem;
    background-color: ${(props) => props.theme.colors.white};
    >p {
      font-size: 2.2rem;
      color: ${props => props.theme.colors.blackL1};
      font-weight: bold;
    }
  `
};

export default DepositList;