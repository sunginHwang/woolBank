import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

import ModalDeem from '@components/common/modal/ModalDeem';

import colors from '@style/colors';

export interface SpinnerLoadingProps {
  loading: boolean;
  message?: string;
};

function SpinnerLoading({ loading, message }: SpinnerLoadingProps) {
  return (
    <ModalDeem visible={loading}>
      <S.SpinnerLoading>
        <ClipLoader color={colors.colors.mainColor} size={40} />
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
    color: ${props => props.theme.colors.white};
    opacity: .7;
  `
};

export default SpinnerLoading;
