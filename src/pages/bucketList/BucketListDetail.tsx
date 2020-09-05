import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import BucketListDetailContainer from '../../containers/bucketList/BucketListDetailContainer';
import { useParams } from 'react-router';
import BucketListTodoContainer from '../../containers/bucketList/BucketListTodoContainer';

function BucketListDetail() {
  let { bucketListId } = useParams();
  bucketListId = Number(bucketListId);
  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <BucketListDetailContainer bucketListId={bucketListId} />
      <BucketListTodoContainer bucketListId={bucketListId} />
    </PageTemplate>
  );
}

export default BucketListDetail;
