import React from 'react';
import styled from 'styled-components';

import ModalDeem from '@components/common/modal/ModalDeem';
import IcoClose from '@components/atoms/icon/IcoClose';
import palette from '@style/palette';


export interface BottomModalProps {
  title: string;
  visible: boolean;
  showCloseBtn?: boolean;
  children: React.ReactNode;
  oncloseModal: () => void;
}

function BottomModal({ visible, title, showCloseBtn = true, children, oncloseModal }: BottomModalProps) {

  return (
    <ModalDeem visible={visible} onDeemClick={oncloseModal}>
      <S.BottomModal visible={visible}>
        <S.Header>
          <p>{title}</p>
          {showCloseBtn && <i onClick={oncloseModal}><IcoClose width={24} height={30} fill={palette.blackL1} /></i>}
        </S.Header>
        <S.Content>
          {children}
        </S.Content>
      </S.BottomModal>
    </ModalDeem>
  );
}

const S: {
  BottomModal: any;
  Content: any;
  Header: any;
} = {
  Header: styled.div`
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    p {
      font-weight: bold;

      color: ${({ theme }) => theme.colors.blackL1};
    }
  `,
  Content: styled.div`
    margin-bottom: 2.5rem;
    max-height: 27rem;
    overflow-y: scroll;
  `,
  BottomModal: styled.div<{
    visible: boolean;
  }>`
    position: fixed;
    bottom: ${({ visible }) => (visible ? '0' : '-30rem')};
    width: 100%;
    transition: all 0.3s ease;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: ${({ theme }) => theme.zIndex.modalDeem + 1};
    box-shadow: 0.1rem 0.3rem 1rem 0.2rem rgba(0, 0, 0, 0.2);

    > p {
      margin-left: 1rem;
      padding: 1.4rem;
      font-size: 1.6rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.blackL1};
      text-align: left;
    }

    > p:last-child {
      margin-bottom: 2.5rem;
      margin-bottom: calc(constant(safe-area-inset-bottom) + 2.5rem);
      margin-bottom: calc(env(safe-area-inset-bottom) + 2.5rem);
    }
  `,
};

export default BottomModal;
