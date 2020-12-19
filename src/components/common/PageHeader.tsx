import React, { useCallback } from 'react';
import styled from 'styled-components';

import IcoChevronLeft from '@components/icon/IcoChevronLeft';
import theme from '@style/theme';

export interface PageHeaderProps {
  title: string;
  iconColor?: string;
  useBackButton?: boolean;
  onBackClick?: () => void;
  right?: React.ReactNode | string;
  useSkeleton?: boolean;
}

function PageHeader({
  title,
  iconColor = theme.colors.mainColor,
  useSkeleton = false,
  useBackButton = true,
  onBackClick,
  right
}: PageHeaderProps) {
  const onBackButtonClick = useCallback(() => {
    useBackButton && onBackClick && onBackClick();
  }, [useBackButton, onBackClick]);

  return (
    <S.HeaderWithBack useSkeleton={useSkeleton} useBigTitle={!useBackButton}>
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
    height: 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndex.header};
    background-color: ${({ useSkeleton, theme }) => (useSkeleton ? 'transparent' : theme.colors.white)};
    border-bottom: ${({ useSkeleton }) => (useSkeleton ? 'none' : '0.1rem solid #dcdce9')};

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
