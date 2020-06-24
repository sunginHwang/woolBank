import React, { useCallback } from 'react';
import styled from 'styled-components';

type ModalDeemProps = {
  visible: boolean;
  children?: React.ReactNode;
  onDeemClick?: () => void;
};

function ModalDeem({ visible, children, onDeemClick }: ModalDeemProps) {
  const onModalDeemClick = useCallback(
    (e: MouseEvent) => {
      if (onDeemClick) {
        onDeemClick();
      }
      e.preventDefault();
    },
    [onDeemClick]
  );
  return (
    <S.ModalDeem visible={visible} onClick={onModalDeemClick}>
      {children}
    </S.ModalDeem>
  );
}

const S: {
  ModalDeem: any;
} = {
  ModalDeem: styled.div`
    position: fixed;
    visibility: ${(props: any) => (props.visible ? 'visible' : 'hidden')};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: ${(props) => props.theme.zIndex.modalDeem};
    background-color: ${(props) => props.theme.colors.deem};
  `
};

export default ModalDeem;
