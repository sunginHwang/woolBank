import React from 'react';
import styled from 'styled-components';

export interface EmptyListProps {
  message: string;
}

function EmptyList({ message }: EmptyListProps) {
  return <S.EmptyList>{message}</S.EmptyList>;
}

const S: { EmptyList: any } = {
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
