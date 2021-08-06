import React from 'react';
import PhaseTemplate from '@components/common/PhaseTemplate';
import AmountKeyPad from '@components/common/AmountKeyPad';
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
  /**
   * 금액 변경
   **/
  const onAmountChange = (num: number) => {
    onChangeAccount('amount', num);
    goNextPhase();
  };

  return (
    <PhaseTemplate
      active={isActivePhase}
      title='금액을 입력해 주세요'
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <AmountKeyPad
        value={amount}
        label='만기 금액 설정'
        onAmountChange={onAmountChange}
      />
    </PhaseTemplate>
  );
}

export default AmountAddPhase;
