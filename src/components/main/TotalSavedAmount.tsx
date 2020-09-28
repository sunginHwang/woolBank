import React from 'react';
import styled from 'styled-components';
import { addComma } from '@support/util/String';
import PlaceHolderBar from '@components/common/PlaceHolderBar';

export interface TotalSavedAmountProps {
  totalPrice?: number;
  useSkeleton?: boolean;
}

function TotalSavedAmount({ totalPrice = 0, useSkeleton = false }: TotalSavedAmountProps) {
  const renderSkeleton = (
    <>
      <p>
        <PlaceHolderBar width='17rem' height='4rem' />
      </p>
      <p>
        <PlaceHolderBar width='24rem' height='4rem' />
      </p>
      <p>
        <PlaceHolderBar width='13rem' height='4rem' />
      </p>
    </>
  );
  return (
    <>
      <S.Amount>
        {useSkeleton ? (
          renderSkeleton
        ) : (
          <>
            <p>오늘까지의</p>
            <p>총 저축 금액은</p>
            <p>
              <strong>{addComma(totalPrice)} 원</strong> 입니다.
            </p>
          </>
        )}
      </S.Amount>
    </>
  );
}

const S: {
  Amount: any;
} = {
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

export default TotalSavedAmount;
