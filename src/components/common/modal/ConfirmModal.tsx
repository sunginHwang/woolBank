import React from 'react';
import styled from 'styled-components';
import ModalDeem from './ModalDeem';
import '../../../style/css/customCalendar.css';

type WalletDateModalProps = {
  visible: boolean;
  message: string;
  confirmMsg?: string;
  cancelMsg?: string;
  onConfirmClick: () => void;
  onCancelClick: () => void;
};

function ConfirmModal({
  visible,
  message,
  confirmMsg = '확인',
  cancelMsg = '취소',
  onCancelClick,
  onConfirmClick
}: WalletDateModalProps) {
  return (
    <ModalDeem visible={visible}>
      <S.ModalWrapper>
        <S.ConfirmModal>
          <S.Content>
            <p>{message}</p>
          </S.Content>
          <S.Footer>
            <S.Button onClick={onConfirmClick}>{cancelMsg}</S.Button>
            <S.Button onClick={onCancelClick}>{confirmMsg}</S.Button>
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
    justify-content: space-between;
    border-top: .1rem solid ${props => props.theme.colors.greyL2};
  `,
  Button: styled.button`
    width: 49%;
    height: 5.5rem;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.blackL1};
    
    :last-child {
      color: ${props => props.theme.colors.navyD1};
    }
  `
};

export default ConfirmModal;
