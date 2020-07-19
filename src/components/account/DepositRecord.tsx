import React from 'react';
import styled from 'styled-components';
import { IDepositRecord } from '../../models/IDepositRecord';
import DepositRecordItem from './DepositRecordItem';
import DepositRecordItemPlaceHolder from './detail/DepositRecordItemPlaceHolder';

type DepositRecordProps = {
  depositRecords?: IDepositRecord[];
  isLoading?: boolean;
};

function DepositRecord({ depositRecords, isLoading = false }: DepositRecordProps) {
  // loading 상태
  if (isLoading) {
    const tenLoadingHolders = [...Array(10)];
    return (
      <S.DepositRecord>
        {
          tenLoadingHolders.map(index => <DepositRecordItemPlaceHolder key={index} />)
        }
      </S.DepositRecord>
    );
  }

  const isEmptyDeposit = !depositRecords;

  return (
    <S.DepositRecord>
      <p>입금 내역</p>
      {isEmptyDeposit
        ? <div>입금 기록이 없습니다.</div>
        : depositRecords && depositRecords.map((depositRecord, index) => {
          return <DepositRecordItem key={index} depositRecord={depositRecord} />;
        })}
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

export default DepositRecord;
