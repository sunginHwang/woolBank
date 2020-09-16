import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import BucketListItem from '../../../components/bucketList/list/BucketListItem';
import { IAssetType } from '../../../models/IAssetType';
import { RootState } from '../../../store';
import { checkNeedReFetch } from '../../../support/util/checkNeedReFetch';
import { getBucketListLastUpdatedAt } from '../../../support/api/bucketListApi';
import { getBucketList } from '../../../store/modules/BucketList';
import AddButton from '../../../components/common/AddButton';
import TabSlideViewer from '../../../components/common/TabSlideViewer';
import ListSkeleton from '../../../components/common/ListSkeleton';
import BucketListItemSkeleton from '../../../components/bucketList/list/BucketListItemSkeleton';

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
  const bucketList = useSelector((state: RootState) => state.BucketList.bucketList);
  const lastUpdatedDate = useSelector((state: RootState) => state.BucketList.lastUpdatedDate);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    onLoadBucketList();
  }, []);

  const onLoadBucketList = async () => {
    // 캐싱 날짜 없으면 바로 조회
    const needFetch = await checkNeedReFetch(lastUpdatedDate, getBucketListLastUpdatedAt);
    needFetch && dispatch(getBucketList());
  };

  /**
   * 버킷리스트 등록 페이지 이동
   **/
  const goSaveBucketListPage = () => {
    history.push('/bucket-list/save');
  };

  // 진행중 상태 버킷리스트
  const renderProgressBucketList = bucketList.data.map((bucket, index) => (
    <BucketListItem key={index} bucketList={bucket} useSideMargin />
  ));

  // 완료 상태 버킷리스트
  const renderEndBucketList = bucketList.data.map((bucket, index) => (
    <BucketListItem key={index} bucketList={bucket} useSideMargin />
  ));

  if (!bucketList.data || bucketList.loading) {
    return <ListSkeleton item={<BucketListItemSkeleton />} />;
  }

  return (
    <>
      <TabSlideViewer tabs={tabs} slideViewList={[renderProgressBucketList, renderEndBucketList]} />
      <AddButton icon='+' onClick={goSaveBucketListPage} />
    </>
  );
}

export default React.memo(BucketListContainer);
