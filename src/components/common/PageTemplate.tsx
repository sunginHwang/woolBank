import React from 'react';
import styled from 'styled-components';
import HeaderWithBack from './HeaderWithBack';
import Header from '../layout/Header';
import colors from '../../style/colors';

type InputPhaseWrapperProps = {
  title?: string;
  isMain?: boolean;
  useSidePadding?: boolean;
  rightHeader?: React.ReactNode;
  onBackClick?: () => void;
  children: React.ReactNode;
  bgColor?: string;
};

function PageTemplate({
  title = '',
  isMain = false,
  bgColor = colors.colors.whiteL1,
  useSidePadding = true,
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
          <S.Content bgColor={bgColor} useSidePadding={useSidePadding}>
            {children}
          </S.Content>
        </>
      )}
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
    height: calc(100% - 5.5rem);
    background-color: ${(props: any) => props.bgColor};
    padding: 5.5rem
      ${(props: any) => (props.useSidePadding ? '2rem 0 2rem' : '0 0 0')};
  `
};
