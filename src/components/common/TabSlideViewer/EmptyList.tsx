import React from 'react';
import styled from 'styled-components';

interface IProps {
  message: string;
}

function EmptyList({ message }: IProps) {
  return <S.EmptyList>{message}</S.EmptyList>;
}

const S = {
  EmptyList: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.greyD2};
    font-size: 1.8rem;
    height: 30%;
  `
};

export default EmptyList;
