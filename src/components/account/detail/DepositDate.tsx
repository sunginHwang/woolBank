import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

import PhaseTemplate from '@components/common/PhaseTemplate';
import BaseInput from '@components/common/BaseInput';
import DateModal from '@components/common/modal/DateModal';

import { DATE_FORMAT, parseDate } from '@support/util/date';
import { useToggle } from '@support/hooks/useToggle';
import palette from '@style/palette';

export interface DepositDateProps {
  isActive: boolean;
  isLoading: boolean;
  onBackClick: () => void;
  onDepositClick: (amount: number, depositDate: Date) => void;
};

function DepositDate({ isActive, isLoading, onBackClick, onDepositClick }: DepositDateProps) {
  const [depositDate, setDepositDate] = useState<string | Date>('');
  const [depositAmount, setDepositAmount] = useState(0);
  const [showDateModal, onOpenDateModal, onCloseDateModal] = useToggle(false);

  useEffect(() => {
    if (!isActive) {
      setDepositDate('');
      setDepositAmount(0);
    }
  }, [isActive]);

  /**
   * 입력 초기화
   **/
  const onClearInput = (e: React.MouseEvent<HTMLLIElement>) => {
    const type = e.currentTarget.dataset.type || '';
    type === 'amount' && setDepositAmount(0);
    type === 'date' && setDepositDate('');
  };

  /**
   * 예적금 금액 변경
   **/
  const onDepositAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(Number(e.target.value));
  }, []);

  /**
   * 예적금 날짜 선택
   **/
  const onDepositDateChange = useCallback((date: string) => {
    setDepositDate(date);
    onCloseDateModal();
  }, [onCloseDateModal]);

  /**
   * 예금입력버튼 선택
   **/
  const onDepositButtonClick = useCallback(() => {
    if (!isLoading) {
      onDepositClick(depositAmount, new Date(depositDate));
    }
  }, [onDepositClick, isLoading, depositDate, depositAmount]);

  return (
    <PhaseTemplate active={isActive} title='이전날짜 입금하기' onBackClick={onBackClick}>
      <S.DepositRecord>
        <S.Form>
          <BaseInput
            disable
            label='입금 날짜'
            dataType='date'
            value={parseDate(depositDate, DATE_FORMAT.YYYY_MM_DD)}
            onClick={onOpenDateModal}
            onClear={onClearInput}
          />
          <BaseInput
            label='입금액'
            type='number'
            dataType='amount'
            value={depositAmount === 0 ? '' : depositAmount}
            onChange={onDepositAmountChange}
            onClear={onClearInput}
          />
        </S.Form>
        <S.Info>이전에 입금하신 날짜와 금액을 입력해주세요.</S.Info>
        <S.CompleteButton onClick={onDepositButtonClick}>
          {isLoading ? <ClipLoader color={palette.white} size={20} /> : '입금하기'}
        </S.CompleteButton>
      </S.DepositRecord>
      <>
        <DateModal
          visible={showDateModal}
          oncloseModal={onCloseDateModal}
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
      color: ${({ theme }) => theme.colors.blackL1};
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
    color: ${({ theme }) => theme.colors.greyL1};
  `,
  CompleteButton: styled.button`
    margin-top: auto;
    margin-bottom: 2rem;
    height: 5.5rem;
    min-height: 5.5rem;
    width: 100%;
    border-radius: 0.8rem;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.mainColor};
  `
};

export default DepositDate;
