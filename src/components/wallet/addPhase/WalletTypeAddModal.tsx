import React from 'react';
import styled from 'styled-components';
import ModalDeem from '../../common/modal/ModalDeem';

type WalletTypeAddModalProps = {
  visible: boolean;
  oncloseModal: any;
};

function WalletTypeAddModal({
  visible,
  oncloseModal
}: WalletTypeAddModalProps) {
  return (
    <ModalDeem visible={visible} onDeemClick={oncloseModal}>
      <S.WalletTypeAddModal visible={visible}>
        <p onClick={() => console.log('요소 클릭')}>12</p>
      </S.WalletTypeAddModal>
    </ModalDeem>
  );
}

const S: {
  WalletTypeAddModal: any;
} = {
  WalletTypeAddModal: styled.div`
    position: fixed;
    bottom: ${(props: any) => (props.visible ? '0' : '-30rem')};
    width: 100%;
    transition: all 0.3s ease;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    text-align: center;
    background-color: ${(props) => props.theme.colors.white};
    z-index: ${(props) => props.theme.zIndex.modalDeem + 1};
    box-shadow: 0.1rem 0.3rem 1rem 0.2rem rgba(0, 0, 0, 0.2);

    p {
      height: 15rem;
    }
  `
};

export default WalletTypeAddModal;
