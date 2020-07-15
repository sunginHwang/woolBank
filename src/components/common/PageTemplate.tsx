import React from 'react';
import styled from 'styled-components';
import HeaderWithBack from './HeaderWithBack';
import NavigationBar from '../layout/NavigationBar';
import Header from '../layout/Header';

type InputPhaseWrapperProps = {
  title?: string;
  isMain?: boolean;
  useNav?: boolean;
  rightHeader?: React.ReactNode;
  onBackClick?: () => void;
  children: React.ReactNode;
};

function PageTemplate({
  title = '',
  isMain = false,
  useNav = true,
  onBackClick,
  rightHeader = null,
  children
}: InputPhaseWrapperProps) {
  const onHeaderBackClick = () => {
    onBackClick && onBackClick();
  };

  return (
    <S.PageTemplate>
      {isMain ? (
        <>
          <Header />
          <div>{children}</div>
        </>
      ) : (
        <>
          <HeaderWithBack
            title={title}
            onBackClick={onHeaderBackClick}
            right={rightHeader}
          />
          <S.Content>{children}</S.Content>
        </>
      )}
      {useNav && <NavigationBar />}
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
    background-color: ${(props) => props.theme.colors.white};
    padding-top: 5.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  `
};
