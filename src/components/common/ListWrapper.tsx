import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ListWrapperProps = {
  children: ReactNode;
};

function ListWrapper({ children }: ListWrapperProps) {
  return <S.ListWrapper>{children}</S.ListWrapper>;
}

const S: {
  ListWrapper: any;
} = {
  ListWrapper: styled.div`
    width: calc(100% - 4rem);
    padding: 2rem 2rem 15rem 2rem;
  `
};

export default ListWrapper;
