import React from 'react';
import PageTemplate from '@components/layout/PageTemplate';
import BucketListSlideViewer from '@components/bucketList/list/BucketListSlideViewer';
import AddButton from '@components/common/AddButton';
import { useHistory } from 'react-router';

/**
 * 버킷리스트 페이지
 * @component
 */

function BucketListPage() {
  const history = useHistory();

  /**
   * 버킷리스트 등록 페이지 이동
   **/
  const goSaveBucketListPage = () => {
    history.push('/bucket-list/save');
  };

  return (
    <PageTemplate useHeader={false} topPadding={8.8} useSidePadding={false}>
      <BucketListSlideViewer />
      <AddButton icon='+' onClick={goSaveBucketListPage} />
    </PageTemplate>
  );
}

export default BucketListPage;
