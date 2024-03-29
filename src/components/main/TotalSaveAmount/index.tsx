import React from 'react';
import styled from 'styled-components';
import { addComma } from '@support/util/String';
import LoadingSkeleton from './LoadingSkeleton';

interface IProps {
  totalPrice?: number;
  isLoading?: boolean;
}

/**
 * 메인페이지 - 총 저축금액
 * @component
 */

function TotalSaveAmount(props: IProps) {
  const { totalPrice, isLoading = false } = props;

  if (isLoading) {
    return (
      <S.Amount>
        <LoadingSkeleton />
      </S.Amount>
    );
  }

  return (
    <S.Amount>
      <>
        <p>오늘까지의</p>
        <p>총 저축 금액은</p>
        <p>
          <strong>{addComma(totalPrice || 0)} 원</strong> 입니다.
        </p>
      </>
    </S.Amount>
  );
}

export default TotalSaveAmount;

const S = {
  Amount: styled.div`
    padding: 2rem 0 2rem 0;
    > p {
      color: ${({ theme }) => theme.colors.blackL2};
      font-size: 2.8rem;
      line-height: 1.6;
      font-weight: bold;

      > strong {
        color: ${({ theme }) => theme.colors.redL3};
      }
    }

    &:before {
      position: absolute;
      right: 0;
      top: 7rem;
      content: '';
      display: block;
      height: 36rem;
      background: ${({ theme }) => theme.colors.pinkL2};
      width: 18rem;
      border-bottom-left-radius: 36rem;
      border-top-left-radius: 36rem;
      z-index: -1;
    }
  `
};
