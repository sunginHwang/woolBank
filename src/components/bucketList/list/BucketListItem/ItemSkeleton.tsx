import React from 'react';
import styled from 'styled-components';

import CardItem from '@components/common/CardItem';
import EmptyCircle from '@components/common/EmptyCircle';
import PlaceHolderBar from '@components/atoms/PlaceHolderBar';

/**
 * 버킷리스 - 리스트 아이템 스켈레톤 영역
 * @component
 */

function ItemSkeleton() {
  return (
    <CardItem>
      <S.BucketListItem data-cy='bucketListSkeleton'>
        <div>
          <EmptyCircle size={40} />
          <S.Content>
            <PlaceHolderBar width='8rem' height='1.6rem' />
            <PlaceHolderBar width='13rem' height='1.2rem' />
          </S.Content>
        </div>
      </S.BucketListItem>
    </CardItem>
  );
}

export default React.memo(ItemSkeleton);

const S = {
  BucketListItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1.4rem;
  `
};
