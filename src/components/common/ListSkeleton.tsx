import React from 'react';
import styled from 'styled-components';

import ListWrapper from '@components/common/ListWrapper';
import Tabs from '@components/common/Tabs';

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
  title: string;
  itemCount?: number;
}

function ListSkeleton({ item, title, itemCount = 10 }: ListSkeletonProps) {
  return (
    <>
      <S.ListTitle>
        <p>{title}</p>
      </S.ListTitle>
      <Tabs tabs={tabs} activeTab={tabs[0]} />
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
  ListTitle: any;
} = {
  ListSkeleton: styled.div`
    margin: 0 2rem;
  `,

  ListTitle: styled.div`
    height: 4.8rem;
    display: flex;
    justify-content: flex-start;
    margin-left: 2rem;
    align-items: center;
    
    p {
      font-size: 1.8rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.blackL1};
    }
  `
};
