import React from 'react';
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';

import { IAssetType } from '@models/IAssetType';
import { fetchBucketList } from '@support/api/bucketListApi';

import AddButton from '@components/common/AddButton';
import TabSlideViewer from '@components/common/TabSlideViewer';
import ListSkeleton from '@components/common/ListSkeleton';
import BucketListItemSkeleton from '@components/bucketList/list/BucketListItemSkeleton';
import EmptyList from '@components/common/EmptyList';
import BucketListItem from '@components/bucketList/list/BucketListItem';
import { IBucketList } from '@models/IBucketList';

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

const title = '버킷리스트';

function BucketListContainer() {
  const { data: bucketList = [], isFetching } = useQuery<IBucketList[]>('bucketList', fetchBucketList);
  const history = useHistory();

  /**
   * 버킷리스트 등록 페이지 이동
   **/
  const goSaveBucketListPage = () => {
    history.push('/bucket-list/save');
  };

  if (isFetching || bucketList.length === 0) {
    return <ListSkeleton title={title} item={<BucketListItemSkeleton />} />;
  }

  // 진행중 상태 버킷리스트
  const renderProgressBucketList = renderList(
    '진행중인 버킷리스트가 없습니다. :(',
    bucketList.filter((bucket) => !bucket.isComplete)
  );
  // 완료 상태 버킷리스트
  const renderEndBucketList = renderList('완료중인 버킷리스트가 없습니다. :(',
    bucketList.filter((bucket) => bucket.isComplete)
  );

  return (
    <>
      <TabSlideViewer tabs={tabs} slideViewList={[renderProgressBucketList, renderEndBucketList]} title={title} />
      <AddButton icon='+' onClick={goSaveBucketListPage} />
    </>
  );
}

function renderList(message: string, list: IBucketList[]) {
  if (list.length === 0) {
    return <EmptyList message={message} />;
  }

  return list.map((item) => <BucketListItem key={item.id} bucketList={item} useSideMargin />);
}

export default React.memo(BucketListContainer);
