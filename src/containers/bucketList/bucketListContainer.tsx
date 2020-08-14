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
  console.log('BucketListContainer render');
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const bucketList: IBucketList[] = [
    {
      title: '버킷리스트 1번 목표',
      todoCount: 4,
      completeTodoCount: 2,
      completeDate: '2020-12-31',
      image: {
        thumbImageUrl: 'https://www.swedishnomad.com/wp-content/images/2019/12/Bucket-List.webp',
        fullImageUrl: 'https://www.swedishnomad.com/wp-content/images/2019/12/Bucket-List.webp'
      }
    },
    {
      title: '버킷리스트 2번 목표',
      todoCount: 3,
      completeTodoCount: 3,
      completeDate: '2020-02-27'
    }
  ];

  return (
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
  );
}

export default React.memo(BucketListContainer);

const S: {
  Wrapper: any;
  List: any;
} = {
  Wrapper: styled.div``,
  List: styled.div`
    margin-top: 2rem;
  `
};
