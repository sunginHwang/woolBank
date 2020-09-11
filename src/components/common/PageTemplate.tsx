import React from 'react';
import styled from 'styled-components';
import HeaderWithBack from './HeaderWithBack';
import Header from '../layout/Header';
import colors from '../../style/colors';

type InputPhaseWrapperProps = {
  title?: string;
  isMain?: boolean;
  useSidePadding?: boolean;
  bgColor?: string;
  useHeader?: boolean;
  rightHeader?: React.ReactNode;
  children?: React.ReactNode;
  onBackClick?: () => void;

};

function PageTemplate({
  title = '',
  isMain = false,
  bgColor = colors.colors.whiteL1,
  useSidePadding = true,
  useHeader = true,
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
          {useHeader && <HeaderWithBack title={title} onBackClick={onHeaderBackClick} right={rightHeader} />}
          <S.Content useHeader={useHeader} bgColor={bgColor} useSidePadding={useSidePadding}>
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
    height: ${(props: any) => props.useHeader ? 'calc(100% - 5.5rem)' : '100%'};
    background-color: ${(props: any) => props.bgColor};
    padding:
      ${(props: any) => (props.useHeader ? '5.5rem' : '0')} // 헤더 사용 유무에 따른 상단 패딩 조정 
      ${(props: any) => (props.useSidePadding ? '2rem 0 2rem' : '0 0 0')};
  `
};
