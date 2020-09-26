import React from 'react';
import styled from 'styled-components';

import ListWrapper from '@components/common/ListWrapper';
import ToggleTab from '@components/common/ToggleTab';

import { IAssetType } from '@models/IAssetType';

const tabs: IAssetType[] = [
  {
    type: 'progress',
    name: '진행중'
  },
  {
    type: 'complete',
    name: '완료'
  }
];

export interface ListSkeletonProps {
  item: React.ReactNode;
  itemCount?: number;
}

function ListSkeleton({ item, itemCount = 10 }: ListSkeletonProps) {
  return (
    <>
      <ToggleTab tabs={tabs} useOutline={false} activeTab={tabs[0]} />
      <ListWrapper>
        <S.ListSkeleton>
          {[...Array(itemCount)].map((_, key) => (
            <div key={key}>{item}</div>
          ))}
        </S.ListSkeleton>
      </ListWrapper>
    </>
  );
}

export default React.memo(ListSkeleton);

const S: {
  ListSkeleton: any;
} = {
  ListSkeleton: styled.div`
    margin: 0 2rem;
  `
};
