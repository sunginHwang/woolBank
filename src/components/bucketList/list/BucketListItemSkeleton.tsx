import React from 'react';
import styled from 'styled-components';

import CardItem from '@components/common/CardItem';
import EmptyCircle from '@components/common/EmptyCircle';
import PlaceHolderBar from '@components/common/PlaceHolderBar';

function BucketListItemSkeleton() {
  return (
    <CardItem>
      <S.BucketListItem>
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

const S: {
  BucketListItem: any;
  Content: any;
} = {
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

export default React.memo(BucketListItemSkeleton);
