import React from 'react';
import BottomModal from '@components/common/modal/BottomModal';

export interface RegularTypeSelectModalProps {
  visible: boolean;
  onCloseModal: () => void;
}

function RegularTypeSelectModal({ visible, onCloseModal }: RegularTypeSelectModalProps) {
  return (
    <BottomModal title='지출 타입' visible={visible} oncloseModal={onCloseModal}>
      <p>1</p>
    </BottomModal>
  );
}

export default RegularTypeSelectModal;
