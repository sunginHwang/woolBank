import React from 'react';
import styled from 'styled-components';

import ModalDeem from '@components/common/modal/ModalDeem';
import IcoSend from '@components/icon/IcoSend';

import palette from '@style/palette';

export interface TodoAddModalProps {
  title: string;
  visible: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSendClick: () => void;
  onClose: () => void;
}

function TodoAddModal({ title, visible, onClose, onChange, onSendClick }: TodoAddModalProps) {
  return (
    <ModalDeem visible={visible} onDeemClick={onClose}>
      <S.AddModal visible={visible}>
        <S.Send>
          <input type='text' placeholder='해야 할 일을 작성해 주세요.' value={title} onChange={onChange} />
          <button onClick={onSendClick}>
            <IcoSend fill={palette.mainColor} />
          </button>
        </S.Send>
      </S.AddModal>
    </ModalDeem>
  );
}

const S: {
  AddModal: any;
  Send: any;
} = {
  AddModal: styled.div<{
    visible: boolean;
  }>`
    position: fixed;
    bottom: ${({ visible }) => (visible ? '0' : '-30rem')};
    width: 100%;
    transition: all 0.5s ease;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: ${({ theme }) => theme.zIndex.modalDeem + 1};
    box-shadow: 0.1rem 0.3rem 1rem 0.2rem rgba(0, 0, 0, 0.2);
  `,
  Send: styled.div`
    height: 4rem;
    padding: 1.75rem;
    display: flex;

    input {
      flex: 1;
      background-color: #f2f3f5;
      border-radius: 2rem;
      padding: 0 2rem;
      border: 0.1rem solid ${({ theme }) => theme.colors.greyL2};
      font-size: 1.3rem;

      &::placeholder {
        color: #65676b;
      }
    }
    button {
      margin-left: 2rem;
    }
  `
};

export default TodoAddModal;
