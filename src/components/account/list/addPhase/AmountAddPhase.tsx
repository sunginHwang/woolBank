import React from 'react';
import PhaseTemplate from '@components/common/PhaseTemplate';
import NumberInput from '@components/common/NumberInput';
import { IPhase } from '@models/phase/IPhase';

interface AmountAddPhaseProps extends IPhase{
  isActivePhase: boolean;
  amount: number;
  goPrevPhase: () => void;
  goNextPhase: () => void;
  onChangeAccount: (type: string, value: number) => void;
};

function AmountAddPhase({
  amount,
  isActivePhase,
  onChangeAccount,
  goPrevPhase,
  goNextPhase
}: AmountAddPhaseProps) {
  const isActiveComplete = amount > 0;

  /**
   * 금액 변경
   **/
  const onChangeAmount = (num: number) => {
    onChangeAccount('amount', num)
  };

  /**
   * 예적금 입력 완료
   **/
  const onCompleteClick = () => {
    isActiveComplete && goNextPhase();
  };

  return (
    <PhaseTemplate
      active={isActivePhase}
      title='금액을 입력해 주세요'
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <NumberInput
        currentAmount={amount}
        label='만기 금액 설정'
        isActiveComplete={isActiveComplete}
        onCompleteClick={onCompleteClick}
        onChangeAmount={onChangeAmount}
      />
    </PhaseTemplate>
  );
}

export default AmountAddPhase;
