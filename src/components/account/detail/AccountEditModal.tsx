import React from 'react';
import styled from 'styled-components';
import ModalDeem from '../../common/modal/ModalDeem';

type AccountEditModalProps = {
  visible: boolean;
  oncloseModal: () => void;
  onEditClick: (edit: 'migration' | 'end' | 'remove') => void;
};

function AccountEditModal({ visible, oncloseModal, onEditClick }: AccountEditModalProps) {
  return (
    <ModalDeem visible={visible} onDeemClick={oncloseModal}>
      <S.AccountEditModal visible={visible}>
        <S.Title>
          <p>작성하실 예/적금 종류를 선택해주세요.</p>
        </S.Title>
        <p onClick={() => onEditClick('migration')}>이전 입금내역 추가</p>
        <p onClick={() => onEditClick('end')}>만기</p>
        <p onClick={() => onEditClick('remove')}>삭제</p>
      </S.AccountEditModal>
    </ModalDeem>
  );
}

const S: {
  AccountEditModal: any;
  Title: any;
} = {
  AccountEditModal: styled.div`
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

    > p {
      margin-left: 1rem;
      padding: 1.4rem;
      font-size: 1.8rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.blackL1};
      text-align: left;
    }

    > p:last-child {
      margin-bottom: 2.5rem;
    }
  `,
  Title: styled.div`
    padding: 2rem;
    display: flex;
    justify-content: center;
    p {
      font-size: 1.6rem;
      font-weight: 600;

      color: ${(props) => props.theme.colors.blackL1};
    }
  `
};

export default AccountEditModal;
