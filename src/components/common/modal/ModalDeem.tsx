import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

export interface ModalDeemProps {
  visible: boolean;
  children?: React.ReactNode;
  onDeemClick?: () => void;
};

function ModalDeem({ visible, children, onDeemClick }: ModalDeemProps) {
  const modalDeemRef = useRef(null);

  const onModalDeemClick = useCallback((e: MouseEvent) => {
    if (e && e.target && modalDeemRef.current === e.target) {
      onDeemClick && onDeemClick();
    }
  }, [onDeemClick]);

  return (
    <S.ModalDeem
      ref={modalDeemRef}
      visible={visible}
      onClick={onModalDeemClick}
    >
      {children}
    </S.ModalDeem>
  );
}

const S: {
  ModalDeem: any;
} = {
  ModalDeem: styled.div<{
    visible: boolean;
  }>`
    position: fixed;
    visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: ${({ theme }) => theme.zIndex.modalDeem};
    background-color: ${({ theme }) => theme.colors.deem};
  `
};

export default ModalDeem;
