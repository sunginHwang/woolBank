import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BucketListItem from '../../../components/bucketList/BucketList/BucketListItem';
import ToggleTab from '../../../components/common/ToggleTab';
import { IAssetType } from '../../../models/IAssetType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { checkNeedReFetch } from '../../../support/util/checkNeedReFetch';
import { getBucketListLastUpdatedAt } from '../../../support/api/bucketListApi';
import { getBucketList } from '../../../store/modules/BucketList';
import BucketListItemPlaceHolder from '../../../components/bucketList/BucketList/BucketListItemSkeleton';
import AddButton from '../../../components/common/AddButton';
import { useHistory } from 'react-router';

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

  const bucketList = useSelector((state: RootState) => state.BucketList.bucketList);
  const lastUpdatedDate = useSelector((state: RootState) => state.BucketList.lastUpdatedDate);
  const dispatch = useDispatch();
  const history = useHistory();

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

  useEffect(() => {
    onLoadBucketList();
  }, []);

  return (
    <S.Wrapper>
      <ToggleTab tabs={tabs} useOutline={false} activeTab={activeTab} onChangeTab={setActiveTab} />
      <S.List>
        {bucketList.loading
          ? [...Array(10)].map((_, key) => <BucketListItemPlaceHolder key={key} />)
          : bucketList.data.map((bucket, index) => <BucketListItem key={index} bucketList={bucket} />)}
      </S.List>
      <AddButton icon='+' onClick={goSaveBucketListPage} />
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
