import React from 'react';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

import ModalDeem from '@components/common/modal/ModalDeem';

import '@style/css/customCalendar.css';
import colors from '@style/colors';

export interface WalletDateModalProps {
  visible: boolean;
  message: string;
  loading?: boolean;
  confirmMsg?: string;
  cancelMsg?: string;
  onConfirmClick: () => void;
  onCancelClick: () => void;
};

function ConfirmModal({
  visible,
  message,
  loading = true,
  confirmMsg = '확인',
  cancelMsg = '취소',
  onCancelClick,
  onConfirmClick
}: WalletDateModalProps) {
  const LoadingEl = <S.Loading><ClipLoader size={20} color={colors.colors.mainColor} /></S.Loading>;

  return (
    <ModalDeem visible={visible}>
      <S.ModalWrapper>
        <S.ConfirmModal>
          <S.Content>
            <p>{message}</p>
          </S.Content>
          <S.Footer>
            {
              loading ? LoadingEl
                : (
                  <>
                    <S.Button onClick={onCancelClick}>{cancelMsg}</S.Button>
                    <S.Button onClick={onConfirmClick}>{confirmMsg}</S.Button>
                  </>
                )
            }
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
  Loading: any;
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
    height: 5.5rem;
    border-top: .1rem solid ${props => props.theme.colors.greyL2};
  `,
  Loading: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  `,
  Button: styled.button`
    width: 49%;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.blackL1};
    
    :last-child {
      color: ${props => props.theme.colors.mainColor};
    }
  `
};

export default ConfirmModal;
