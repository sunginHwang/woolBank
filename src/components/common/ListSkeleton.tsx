import React from 'react';
import styled from 'styled-components';

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
    <S.ListSkeleton>
      <S.Title>
        <p>{title}</p>
      </S.Title>
      <Tabs tabs={tabs} activeTab={tabs[0]} />
      <S.Wrapper>
        <S.Content>
          {[...Array(itemCount)].map((_, key) => (
            <div key={key}>{item}</div>
          ))}
        </S.Content>
      </S.Wrapper>
    </S.ListSkeleton>
  );
}

export default React.memo(ListSkeleton);

const S: {
  ListSkeleton: any;
  Title: any;
  Wrapper: any;
  Content: any;
} = {
  ListSkeleton: styled.div`
    margin-top: -8.8rem;
  `,
  Content: styled.div`
    margin: 0 2rem;
  `,
  Wrapper: styled.div`
    margin-top: 3.8rem;
    height: 100%;
  `,
  Title: styled.div`
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
