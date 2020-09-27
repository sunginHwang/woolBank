import React from 'react';
import styled from 'styled-components';

import HeaderWithBack from '@components/common/HeaderWithBack';
import MainHeader from '@components/layout/MainHeader';

import palette from '@style/palette';

export interface PageTemplateProps {
  title?: string;
  isMain?: boolean;
  useSidePadding?: boolean;
  bgColor?: string;
  useHeader?: boolean;
  rightHeader?: React.ReactNode;
  useBackButton?: boolean;
  children?: React.ReactNode;
  onBackClick?: () => void;
}

function PageTemplate({
  title = '',
  isMain = false,
  bgColor = palette.white,
  useSidePadding = true,
  useHeader = true,
  useBackButton = true,
  onBackClick,
  rightHeader = null,
  children
}: PageTemplateProps) {
  const onHeaderBackClick = () => {
    onBackClick && onBackClick();
  };

  return (
    <S.PageTemplate>
      {isMain ? (
        <>
          <MainHeader />
          <S.Content useHeader useSidePadding>
            {children}
          </S.Content>
        </>
      ) : (
        <>
          {useHeader && (
            <HeaderWithBack
              title={title}
              useBackButton={useBackButton}
              onBackClick={onHeaderBackClick}
              right={rightHeader}
            />
          )}
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
  Content: styled.div<{
    useHeader: boolean;
    useSidePadding: boolean;
    bgColor: string;
  }>`
    height: ${({ useHeader }) => (useHeader ? 'calc(100% - 5.5rem)' : '100%')};
    background-color: ${({ bgColor }) => bgColor};
    padding: ${({ useHeader }) => (useHeader ? '5.5rem' : '0')} // 헤더 사용 유무에 따른 상단 패딩 조정
      ${({ useSidePadding }) => (useSidePadding ? '2rem 10rem 2rem' : '0 10rem 0')};
  `
};
