import React from 'react';
import PageTemplate from '@components/layout/PageTemplate';
import BucketListContainer from '@containers/bucketList/list/bucketListContainer';

function BucketList() {
  return (
    <PageTemplate useHeader={false} topPadding={8.8} useSidePadding={false}>
      <BucketListContainer />
    </PageTemplate>
  );
}

export default BucketList;
