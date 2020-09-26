import React from 'react';
import styled from 'styled-components';

import ModalDeem from '@components/common/modal/ModalDeem';

export interface AlertModalProps {
  isShow: boolean;
  message: string;
  onClick: () => void;
}

function AlertModal({
  isShow,
  message,
  onClick
}: AlertModalProps) {
  return (
    <ModalDeem visible={isShow}>
      <S.ModalWrapper>
        <S.ConfirmModal>
          <S.Content>
            <p>{message}</p>
          </S.Content>
          <S.Footer>
            <S.Button onClick={onClick}>확인</S.Button>
          </S.Footer>
        </S.ConfirmModal>
      </S.ModalWrapper>
    </ModalDeem>
  );
}

const S: {
  ConfirmModal: any;
  ModalWrapper: any;
  Content: any;
  Footer: any;
  Button: any;
} = {
  ConfirmModal: styled.div`
    width: 80%;
    max-width: 68rem;
    border-radius: .8rem;
    text-align: center;
    background-color: ${(props) => props.theme.colors.white};
    z-index: ${(props) => props.theme.zIndex.modalDeem + 1};
    box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.35);
  `,
  ModalWrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Content: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 0;
    
    p{
      font-size: 1.4rem;
      padding: 0 2rem;
      color: ${props => props.theme.colors.blackL1};
    }
  `,
  Footer: styled.div`
    display: flex;
    height: 5rem;
    padding: 0 2rem 2rem 2rem;
    justify-content: center;
    align-items: center;
  `,
  Button: styled.button`
    width: 100%;
    font-size: 1.6rem;
    height: 100%;
    border-radius: .8rem;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.mainColor};
  `
};

export default AlertModal;
