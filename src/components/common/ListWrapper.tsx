import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface ListWrapperProps {
  children: ReactNode;
};

function ListWrapper({ children }: ListWrapperProps) {
  return <S.ListWrapper>{children}</S.ListWrapper>;
}

const S: {
  ListWrapper: any;
} = {
  ListWrapper: styled.div`
    margin-top: 5rem;
    height: 100%;
  `
};

export default ListWrapper;
