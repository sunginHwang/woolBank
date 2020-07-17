import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import BaseInput from '../../common/BaseInput';
import DateModal from '../../common/modal/DateModal';
import { DATE_FORMAT, parseDate } from '../../../support/util/date';
import { useToggle } from '../../../support/hooks/useToggle';

type DepositDateProps = {
  isActive: boolean;
  onBackClick: () => void;
};

function DepositDate({ isActive, onBackClick }: DepositDateProps) {
  const [depositDate, setDepositDate] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);
  const [showDateModal, onDateModal, offDateModal] = useToggle(false);

  const initDepositAmount = () => {
    setDepositAmount(0)
  };

  const initDepositDate = () => {
    setDepositDate('')
  };

  const onDepositAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(Number(e.target.value));
  }, []);

  const onDepositDateChange = useCallback((date: string) => {
    setDepositDate(date);
    onDateModal();
  }, []);

  return (
    <PhaseTemplate
      active={isActive}
      title='이전날짜 입금하기'
      onBackClick={onBackClick}
    >
      <S.DepositRecord>
        <S.Form>
          <BaseInput
            label='입금 날짜'
            value={parseDate(depositDate, DATE_FORMAT.YYYY_MM_DD)}
            disable
            onClick={onDateModal}
            onClear={initDepositDate}
          />
          <BaseInput
            label='입금액'
            value={depositAmount === 0 ? '' : depositAmount}
            type='number'
            onChange={onDepositAmountChange}
            onClear={initDepositAmount}
          />
        </S.Form>
        <S.Info>이전에 입금하신 날짜와 금액을 입력해주세요.</S.Info>
        <S.CompleteButton>입금</S.CompleteButton>
      </S.DepositRecord>
      <>
        <DateModal
          visible={showDateModal}
          oncloseModal={offDateModal}
          onChangeDate={onDepositDateChange}
          date={depositDate === '' ? new Date() : new Date(depositDate)}
        />
      </>
    </PhaseTemplate>
  );
}

const S: {
  DepositRecord: any;
  Form: any;
  Info: any;
  CompleteButton: any;
} = {
  DepositRecord: styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    > p {
      font-size: 2.2rem;
      color: ${(props) => props.theme.colors.blackL1};
      font-weight: bold;
    }
  `,
  Form: styled.div`
    margin-top: 2rem;

    div + div {
      margin-top: 2rem;
    }
  `,
  Info: styled.span`
    margin-top: 3rem;
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.greyL1};
  `,
  CompleteButton: styled.button`
    margin-top: auto;
    margin-bottom: 2rem;
    height: 5.5rem;
    min-height: 5.5rem;
    width: 100%;
    border-radius: 0.8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
  `
};

export default DepositDate;
