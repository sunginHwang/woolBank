import React from 'react';
import styled from 'styled-components';

import BottomModal from '@components/common/modal/BottomModal';
import AmountInput from '@components/common/AmountInput';

export interface NumberInputModalProps {
  visible: boolean;
  oncloseModal: () => void;
}

function NumberInputModal({ visible, oncloseModal }: NumberInputModalProps) {

  const onNumberClick = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
    console.log(e.currentTarget.innerText);
  };

  return (
    <BottomModal title='고정 지출액' visible={visible} oncloseModal={oncloseModal}>
      <S.Amount>10,200 원</S.Amount>
      <AmountInput onNumberClick={onNumberClick} onInit={() => {}} onRemoveLastNumber={() => {}} />
    </BottomModal>
  );
}

const S: {
  Amount: any;
} = {
  Amount: styled.p`
    padding: 0 0 2rem 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.blackL1};
    text-align: left;
    font-size: 2.8rem;
  `
};

export default NumberInputModal;
