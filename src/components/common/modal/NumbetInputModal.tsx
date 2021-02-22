import React from 'react';
import styled from 'styled-components';

import BottomModal from '@components/common/modal/BottomModal';
import AmountInput from '@components/common/AmountInput';
import { useNumberAmount } from '@support/hooks/useNumberAmount';
import palette from '@style/palette';
import IcoCloseCircle from '@components/icon/IcoCloseCircle';

export interface NumberInputModalProps {
  visible: boolean;
  oncloseModal: () => void;
}

function NumberInputModal({ visible, oncloseModal }: NumberInputModalProps) {
  const { displayAmount, amount, onAddAmount, onBackAmount, onInitAmount } = useNumberAmount({ currentAmount: 0 });

  return (
    <BottomModal title='고정 지출액' visible={visible} oncloseModal={oncloseModal}>
      <S.AmountDisplay>
        <S.Amount>{displayAmount}</S.Amount>
        <i onClick={onInitAmount}><IcoCloseCircle width={20} height={20} fill={palette.greyL3} /></i>
      </S.AmountDisplay>
      <AmountInput
        useCompleteBtn
        isZeroAmount={amount === 0}
        onNumberClick={onAddAmount}
        onBackNumberClick={onBackAmount}
        onRightBottomClick={onInitAmount}
      />
    </BottomModal>
  );
}

const S: {
  AmountDisplay: any;
  Amount: any;
} = {
  AmountDisplay: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 5rem 2rem 5rem; 
  `,
  Amount: styled.p`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.blackL1};
    text-align: left;
    font-size: 2.8rem;
  `
};

export default NumberInputModal;
