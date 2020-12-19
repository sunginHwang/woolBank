import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface ListWrapperProps {
  children: ReactNode;
}

function ListWrapper({ children }: ListWrapperProps) {
  return <S.ListWrapper>{children}</S.ListWrapper>;
}

const S: {
  ListWrapper: any;
} = {
  ListWrapper: styled.div`
    height: calc(100vh - 8.8rem);
  `
};

export default ListWrapper;
