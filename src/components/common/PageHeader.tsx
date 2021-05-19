import React, { useCallback } from 'react';
import styled from 'styled-components';

import IcoChevronLeft from '@components/icon/IcoChevronLeft';
import theme from '@style/theme';

export interface PageHeaderProps {
  // 헤더 타이틀
  title: string;
  // 아이콘 색상
  iconColor?: string;
  // 뒤로가기 버튼 사용 우무
  useBackButton?: boolean;
  // 뒤로가기 클릭 이벤트
  onBackClick?: () => void;
  // 우측 영역 dom 추가
  right?: React.ReactNode | string;
  // skeleton 모드 사용 유무
  useSkeleton?: boolean;
}

/**
 * 페이지 헤더 영역
 * @component
 */

function PageHeader({
  title,
  iconColor = theme.colors.mainColor,
  useSkeleton = false,
  useBackButton = true,
  onBackClick,
  right
}: PageHeaderProps) {

  // 뒤로 버튼 클릭 이벤트
  const onBackButtonClick = useCallback(() => {
    useBackButton && onBackClick && onBackClick();
  }, [useBackButton, onBackClick]);

  const useBigTitleMode = !useBackButton && title.length > 0 && !right;

  return (
    <S.HeaderWithBack useSkeleton={useSkeleton} useBigTitle={useBigTitleMode}>
      <div>
        {useBackButton && (
          <div onClick={onBackButtonClick}>
            <IcoChevronLeft width={26} height={26} fill={iconColor} />
          </div>
        )}
        <p data-cy='title'>{title}</p>
        <S.rightHeader>{right}</S.rightHeader>
      </div>
    </S.HeaderWithBack>
  );
}

const S: any = {
  HeaderWithBack: styled.div<{
    useSkeleton: boolean;
    useBigTitle: boolean;
  }>`
    height: 4.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndex.header};
    background-color: ${({ useSkeleton, theme }) => (useSkeleton ? 'transparent' : theme.colors.white)};
    border-bottom: ${({ useSkeleton, useBigTitle }) => (useSkeleton || useBigTitle ? 'none' : '0.1rem solid #dcdce9')};

    > div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      &:first-child {
        margin-left: 2rem;
      }
      &:last-child {
        margin-right: 2rem;
      }

      > div {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          justify-content: flex-start;
          text-align: left;
        }
        &:last-child {
          justify-content: flex-end;
          text-align: right;
        }
      }

      > p {
        flex: 2;
        text-align: ${({ useBigTitle }) => useBigTitle ? 'left' : 'center'};
        font-size: ${({ useBigTitle }) => useBigTitle ? 1.8 : 1.4}rem;
        font-weight: 800;
        color: ${({ theme }) => theme.colors.blackL1};
      }
    }
  `,
  rightHeader: styled.div`
    padding-top: 0.4rem;
    color: ${({ theme }) => theme.colors.greyD2};
  `
};

export default PageHeader;
