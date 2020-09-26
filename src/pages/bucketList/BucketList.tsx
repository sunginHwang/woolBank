import React from 'react';
import PageTemplate from '@components/layout/PageTemplate';
import BucketListContainer from '@containers/bucketList/list/bucketListContainer';

function BucketList() {
  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <BucketListContainer />
    </PageTemplate>
  );
}

export default BucketList;
