import React from 'react';
import styled from 'styled-components';
import HeaderWithBack from './HeaderWithBack';
import NavigationBar from '../layout/NavigationBar';

type InputPhaseWrapperProps = {
  title: string;
  rightHeader?: React.ReactNode;
  onBackClick: () => void;
  children: React.ReactNode;
};

function PageTemplate({
  title,
  onBackClick,
  rightHeader,
  children
}: InputPhaseWrapperProps) {
  return (
    <S.PageTemplate>
      <HeaderWithBack
        title={title}
        onBackClick={onBackClick}
        right={rightHeader}
      />
      <S.Content>{children}</S.Content>
      <NavigationBar />
    </S.PageTemplate>
  );
}

export default PageTemplate;

const S: {
  PageTemplate: any;
  Content: any;
} = {
  PageTemplate: styled.div`
    width: 100%;
    height: 100%;
  `,
  Content: styled.div`
    padding-top: 5.5rem;
  `
};
