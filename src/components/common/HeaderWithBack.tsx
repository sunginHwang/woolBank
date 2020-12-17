import React, { useCallback } from 'react';
import styled from 'styled-components';

import IcoChevronLeft from '@components/icon/IcoChevronLeft';

import theme from '@style/theme';

export interface HeaderWithBackProps {
  title: string;
  iconColor?: string;
  useBackButton?: boolean;
  onBackClick?: () => void;
  right?: React.ReactNode | string;
  useSkeleton?: boolean;
}

function HeaderWithBack({
  title,
  iconColor = theme.colors.mainColor,
  useSkeleton = false,
  useBackButton = true,
  onBackClick,
  right
}: HeaderWithBackProps) {
  const onBackButtonClick = useCallback(() => {
    useBackButton && onBackClick && onBackClick();
  }, [useBackButton, onBackClick]);

  return (
    <S.HeaderWithBack useSkeleton={useSkeleton}>
      <div>
        <div onClick={onBackButtonClick}>
          {useBackButton && <IcoChevronLeft width={26} height={26} fill={iconColor} />}
        </div>
        <p data-cy='title'>{title}</p>
        <S.rightHeader>{right}</S.rightHeader>
      </div>
    </S.HeaderWithBack>
  );
}

const S: any = {
  HeaderWithBack: styled.div`
    height: 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: ${(props) => props.theme.zIndex.header};
    background-color: ${(props: any) => (props.useSkeleton ? 'transparent' : props.theme.colors.white)};
    border-bottom: ${(props: any) => (props.useSkeleton ? 'none' : '0.1rem solid #dcdce9')};

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
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        color: ${(props) => props.theme.colors.blackL1};
      }
    }
  `,
  rightHeader: styled.div`
    padding-top: 0.4rem;
    color: ${(props) => props.theme.colors.greyD2};
  `
};

export default HeaderWithBack;
