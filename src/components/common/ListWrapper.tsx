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
    height: 100%;
  `
};

export default ListWrapper;
