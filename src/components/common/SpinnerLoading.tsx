import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

import ModalDeem from '@components/common/modal/ModalDeem';

import palette from '@style/palette';

export interface SpinnerLoadingProps {
  loading: boolean;
  message?: string;
}

function SpinnerLoading({ loading, message }: SpinnerLoadingProps) {
  return (
    <ModalDeem visible={loading}>
      <S.SpinnerLoading>
        <ClipLoader color={palette.mainColor} size={40} />
        {message && <S.Message>{message}</S.Message>}
      </S.SpinnerLoading>
    </ModalDeem>
  );
}

const S: {
  SpinnerLoading: any;
  Message: any;
} = {
  SpinnerLoading: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Message: styled.p`
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;
  `
};

export default SpinnerLoading;
