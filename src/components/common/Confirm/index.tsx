import React from 'react';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

import ModalDeem from '@components/common/modal/ModalDeem';

import palette from '@style/palette';
import '@style/css/customCalendar.css';

export interface IProps {
  open?: boolean;
  message: string;
  loading?: boolean;
  confirmMsg?: string;
  cancelMsg?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * 커스텀 Confirm 모달
 * @component
 */

function Confirm(props: IProps) {
  const {
    open = false,
    message,
    loading = false,
    confirmMsg = '확인',
    cancelMsg = '취소',
    onConfirm = () => {},
    onCancel = () => {}
  } = props;

  const LoadingEl = (
    <S.Loading>
      <ClipLoader size={20} color={palette.mainColor} />
    </S.Loading>
  );

  return (
    <ModalDeem data-cy='confirmModal' visible={open}>
      <S.ModalWrapper>
        <S.ConfirmModal>
          <S.Content>
            <p>{message}</p>
          </S.Content>
          <S.Footer>
            {loading && LoadingEl}
            {!loading && (
              <>
                <S.Button data-cy='icoCancel' onClick={onCancel}>
                  {cancelMsg}
                </S.Button>
                <S.Button data-cy='icoConfirm' onClick={onConfirm}>
                  {confirmMsg}
                </S.Button>
              </>
            )}
          </S.Footer>
        </S.ConfirmModal>
      </S.ModalWrapper>
    </ModalDeem>
  );
}

const S = {
  ConfirmModal: styled.div`
    width: 80%;
    max-width: 68rem;
    border-radius: 0.8rem;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: ${({ theme }) => theme.zIndex.modalDeem + 1};
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

    p {
      font-size: 1.4rem;
      padding: 0 2rem;
      color: ${({ theme }) => theme.colors.blackL1};
    }
  `,
  Footer: styled.div`
    display: flex;
    justify-content: space-between;
    height: 5.5rem;
    border-top: 0.1rem solid ${({ theme }) => theme.colors.greyL2};
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
    color: ${({ theme }) => theme.colors.blackL1};

    :last-child {
      color: ${({ theme }) => theme.colors.mainColor};
    }
  `
};

export default Confirm;
