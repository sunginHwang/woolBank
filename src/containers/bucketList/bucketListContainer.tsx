import React, { useState } from 'react';
import styled from 'styled-components';
import { IBucketList } from '../../models/IBucketList';
import BucketListItem from '../../components/bucketList/BucketList/BucketListItem';
import ToggleTab from '../../components/common/ToggleTab';
import { IAssetType } from '../../models/IAssetType';

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

function BucketListContainer() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const bucketList: IBucketList[] = [
    {
      title: '버킷리스트 1번 목표',
      percent: 82
    },
    {
      title: '버킷리스트 2번 목표',
      percent: 24
    }
  ];

  return (
    <>
      <S.Wrapper>
        <ToggleTab
          tabs={tabs}
          useOutline={false}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
        <S.List>
          {bucketList.map((bucket, index) => (
            <BucketListItem key={index} bucketList={bucket} />
          ))}
        </S.List>
      </S.Wrapper>
    </>
  );
}

export default BucketListContainer;

const S: {
  Wrapper: any;
  List: any;
} = {
  Wrapper: styled.div``,
  List: styled.div`
    margin-top: 2rem;
  `
};
