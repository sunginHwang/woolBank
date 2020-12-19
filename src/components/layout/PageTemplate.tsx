import React from 'react';
import styled from 'styled-components';

import PageHeader from '@components/common/PageHeader';
import MainHeader from '@components/layout/MainHeader';

import palette from '@style/palette';

const defaultTopPadding = 6.5;

export interface PageTemplateProps {
  title?: string;
  isMain?: boolean;
  useSidePadding?: boolean;
  bgColor?: string;
  useHeader?: boolean;
  topPadding?: number;
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
  topPadding = 0,
  onBackClick,
  rightHeader = null,
  children
}: PageTemplateProps) {
  const onHeaderBackClick = () => {
    onBackClick && onBackClick();
  };
  const headerPadding = useHeader ? defaultTopPadding : 0;
  const topAreaPadding = topPadding > headerPadding ? topPadding : headerPadding;

  return (
    <>
      {isMain ? (
        <S.PageTemplate topPadding={defaultTopPadding} >
          <MainHeader />
          <S.Content useSidePadding >
            {children}
          </S.Content>
        </S.PageTemplate>
      ) : (
        <S.PageTemplate topPadding={topAreaPadding}>
          {useHeader && (
            <PageHeader
              title={title}
              useBackButton={useBackButton}
              onBackClick={onHeaderBackClick}
              right={rightHeader}
            />
          )}
          <S.Content useSidePadding={useSidePadding} bgColor={bgColor} >
            {children}
          </S.Content>
        </S.PageTemplate>
      )}
    </>
  );
}

export default PageTemplate;

const S: {
  PageTemplate: any;
  Content: any;
} = {
  PageTemplate: styled.main<{
    topPadding: number;
    useSidePadding: boolean;
  }>`
    width: 100%;
    padding-top: ${({ topPadding }) => `${topPadding}rem`} // 헤더 사용 유무에 따른 상단 패딩 조정
  `,
  Content: styled.div<{
    bgColor: string;
    useSidePadding: boolean;
  }>`
    background-color: ${({ bgColor }) => bgColor};
    padding: 0 ${({ useSidePadding }) => (useSidePadding ? '2rem' : '0')};
  `
};
