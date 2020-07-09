import React from 'react';
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

function WalletAmountAddPhase({
  amount,
  isActivePhase,
  onChangeWalletForm,
  goPrevPhase,
  goNextPhase
}: WalletAmountAddPhaseProps) {
  const isActiveComplete = amount > 0;

  const onChangeAmount = (num: number) => onChangeWalletForm('amount', num);

  const onCompleteClick = () => isActiveComplete && goNextPhase();

  return (
    <PhaseTemplate active={isActivePhase}>
      <HeaderWithBack title='예/적금액 작성' onBackClick={goPrevPhase} />
      <NumberInput
        currentAmount={amount}
        isActiveComplete={isActiveComplete}
        onCompleteClick={onCompleteClick}
        onChangeAmount={onChangeAmount}
      />
    </PhaseTemplate>
  );
}

export default WalletAmountAddPhase;
