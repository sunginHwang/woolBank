import React from 'react';
import styled from 'styled-components';

import PlaceHolderBar from '@components/common/PlaceHolderBar';

/**
 * 가계부 리스트 스켈레톤
 * @component
 */

function AccountBookListSkeleton() {
  return (
    <S.AccountBookListSkeleton>
      {[...Array(5)].map((_, index) => <SkeletonItem key={index} />)}
    </S.AccountBookListSkeleton>
  );
}

function SkeletonItem() {
  const heightSize = '2.1rem';

  return (
    <S.Item>
      <S.DayGroup>
        <PlaceHolderBar width='3rem' height={heightSize} />
        <PlaceHolderBar width='8rem' height={heightSize} />
      </S.DayGroup>
      <S.List>
        <PlaceHolderBar width='100%' height={heightSize} />
        <PlaceHolderBar width='100%' height={heightSize} />
        <PlaceHolderBar width='100%' height={heightSize} />
      </S.List>
    </S.Item>
  );
}

const S: {
  AccountBookListSkeleton: any;
  DayGroup: any;
  List: any;
  Item: any;
} = {
  AccountBookListSkeleton: styled.div`
    margin-top: 3rem;
  `,
  DayGroup: styled.div`
    padding-bottom: 1rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.greyL2};
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 1rem 0;
  `,
  List: styled.div`
    > div {
      margin-bottom: 1rem;
    }
  `,
  Item: styled.div`
    & + & {
      margin-top: 2.4rem;
    }
  `,
};

export default AccountBookListSkeleton;
