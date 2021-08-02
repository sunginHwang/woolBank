import React from 'react';
import { useQuery } from 'react-query';

import TabSlideViewer from '@components/common/TabSlideViewer';
import BucketListItem from '@components/bucketList/list/BucketListItem';
import { IBucketList } from '@models/IBucketList';
import { fetchBucketList } from '@support/api/bucketListApi';

import options from './options';

const { tabs, emptyMsg, title } = options;

/**
 * 버킷리스트 - 진행, 완료 리스트 슬라이딩 뷰어
 * @component
 */

function BucketListSlideViewer() {
  const { data: bucketList = [], isFetching } = useQuery<IBucketList[]>('bucketList', fetchBucketList);

  if (isFetching || bucketList.length === 0) {
    return <TabSlideViewer.Skeleton title={title} item={<BucketListItem.Skeleton />} />;
  }

  const renderProgressBucketList = renderList('progress', bucketList);
  const renderCompleteBucketList = renderList('complete', bucketList);

  return (
    <>
      <TabSlideViewer tabs={tabs} slideViewList={[renderProgressBucketList, renderCompleteBucketList]} title={title} />
    </>
  );
}

function renderList(status: 'complete' | 'progress', list: IBucketList[]) {
  const listWithFilter = list.filter(item => status === 'complete' ? item.isComplete : !item.isComplete);

  if (listWithFilter.length === 0) {
    return <TabSlideViewer.EmptyList message={emptyMsg[status]} />;
  }

  return listWithFilter.map((item) => <BucketListItem key={item.id} bucketList={item} useSideMargin />);
}

export default React.memo(BucketListSlideViewer);
