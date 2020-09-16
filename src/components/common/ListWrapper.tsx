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
    margin: 2rem 0 15rem 0;
  `
};

export default ListWrapper;
