import React from 'react';
import styled from 'styled-components';
import { IDepositRecord } from '../../models/IDepositRecord';
import DepositRecordItem from './DepositRecordItem';

type DepositRecordProps = {
  depositRecords?: IDepositRecord[];
};

function DepositRecord({ depositRecords }: DepositRecordProps) {

  if (!depositRecords) {
    return (
      <S.DepositRecord>
        <div>입금 기록이 없습니다.</div>
      </S.DepositRecord>
    );
  }

  return (
    <S.DepositRecord>
      <p>입금 내역</p>
      {depositRecords.map((depositRecord, index) => {
        return <DepositRecordItem key={index} depositRecord={depositRecord} />;
      })}
    </S.DepositRecord>
  );
}

const S: {
  DepositRecord: any;
} = {
  DepositRecord: styled.div`
    padding: 5rem 0;
    
    >p {
      font-size: 2.2rem;
      color: ${props => props.theme.colors.blackL1};
      font-weight: bold;
    }
  `
};

export default DepositRecord;
