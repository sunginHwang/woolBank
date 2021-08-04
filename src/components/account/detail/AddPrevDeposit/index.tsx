import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import PhaseTemplate from '@components/common/PhaseTemplate';
import Button from '@components/atoms/Button';
import MiniAmountInput from '@components/common/MiniAmountInput';
import DateInput from '@components/common/DateInput';
import { addComma } from '@support/util/String';
import { useAlert } from '@support/hooks/useAlert';

interface IProps {
  isActive: boolean;
  isLoading: boolean;
  remainDepositAmount: number;
  onBackClick: () => void;
  addDeposit: (props: {amount: number, depositDate: Date}) => void;
}

/**
 * 예적금 상세 - 이전 예적금 내역 입력
 * @component
 */

function AddPrevDeposit(props: IProps) {
  const { isActive, isLoading, remainDepositAmount, onBackClick, addDeposit } = props;
  const [depositDate, setDepositDate] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);
  const [onAlert] = useAlert();

  useEffect(() => {
    if (!isActive) {
      setDepositDate('');
      setDepositAmount(0);
    }
  }, [isActive]);

  const onDepositClick = () => {
    if (isLoading) {
      return;
    }

    if (depositAmount > remainDepositAmount) {
      onAlert(`최대 입금 가능 금액은 ${addComma(remainDepositAmount)} 입니다.`);
      return;
    }

    addDeposit({ amount: depositAmount, depositDate: new Date(depositDate) });
  }

  return (
    <PhaseTemplate active={isActive} title='이전날짜 입금하기' onBackClick={onBackClick}>
      <S.AddPrevDeposit>
        <S.Form>
          <DateInput
            label='입금 날짜'
            date={depositDate === '' ? depositDate : format(new Date(depositDate), 'yyyy-MM-dd')}
            onDateChange={setDepositDate}
          />
          <MiniAmountInput
            label='입금액'
            amount={depositAmount}
            onChangeAmount={setDepositAmount}
          />
        </S.Form>
        <S.Info>이전에 입금하신 날짜와 금액을 입력해주세요.</S.Info>
        <Button message='입금하기' color='red' size='wideFull' loading={isLoading} onClick={onDepositClick} />
      </S.AddPrevDeposit>
    </PhaseTemplate>
  );
}

export default AddPrevDeposit;

const S = {
  AddPrevDeposit: styled.div`
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
    margin-bottom: 5rem;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.greyL1};
  `
};
