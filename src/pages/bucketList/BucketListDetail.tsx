import React from 'react';
import { useParams } from 'react-router';

import BucketListDetailContainer from '@containers/bucketList/detail/BucketListDetailContainer';
import BucketListTodoContainer from '@containers/bucketList/detail/BucketListTodoContainer';
import PageTemplate from '@components/layout/PageTemplate';

function BucketListDetail() {
  const { bucketListId } = useParams();
  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <BucketListDetailContainer bucketListId={Number(bucketListId)} />
      <BucketListTodoContainer bucketListId={Number(bucketListId)} />
    </PageTemplate>
  );
}

export default BucketListDetail;
