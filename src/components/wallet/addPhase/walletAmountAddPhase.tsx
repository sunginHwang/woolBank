import React from 'react';
import PhaseTemplate from '../../common/PhaseTemplate';
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
    <PhaseTemplate
      active={isActivePhase}
      title='만기금액 설정'
      usePadding={false}
      onBackClick={goPrevPhase}
    >
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
