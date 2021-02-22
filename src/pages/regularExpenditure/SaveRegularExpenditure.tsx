import React from 'react';
import NumberInputModal from '@components/common/modal/NumbetInputModal';
import { useToggle } from '@support/hooks/useToggle';
import BaseButton from '@components/common/BaseButton';

function SaveRegularExpenditure() {
  const [showNumberInput, onNumberInput, offNumberInput] = useToggle(false);
  return (
    <div>
      <BaseButton message='모달 열기' color='red' size='full' onClick={onNumberInput} />
      <NumberInputModal visible={showNumberInput} oncloseModal={offNumberInput} />
    </div>
  );
}

export default SaveRegularExpenditure;
