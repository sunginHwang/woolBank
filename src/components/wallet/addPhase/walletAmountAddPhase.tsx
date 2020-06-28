import React from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import HeaderWithBack from '../../common/HeaderWithBack';
import NumberInput from '../../common/NumberInput';

type WalletAmountAddPhaseProps = {
  isActivePhase: boolean;
  amount: number;
  goPrevPhase: () => void;
  goNextPhase: () => void;
  onChangeWalletForm: (type: string, value: number) => void;
};

function WalletAmountAddPhase({ amount, isActivePhase, onChangeWalletForm, goPrevPhase, goNextPhase }: WalletAmountAddPhaseProps) {
  const onChangeAmount = (num: number) => onChangeWalletForm('amount', num);
  const isActiveComplete = amount > 0;
  return (
    <PhaseTemplate active={isActivePhase}>
      <HeaderWithBack title='예/적금액 작성'
                      onBackClick={goPrevPhase}/>
      <NumberInput currentAmount={amount}
                   isActiveComplete={isActiveComplete}
                   onCompleteClick={goNextPhase}
                   onChangeAmount={onChangeAmount}/>
    </PhaseTemplate>
  );
}

const S: {
  WalletAmountAddPhase: any
} = {
  WalletAmountAddPhase: styled.div``
};

export default WalletAmountAddPhase;