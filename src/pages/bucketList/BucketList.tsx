import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import BucketListContainer from '../../containers/bucketList/list/bucketListContainer';

function BucketList() {
  return (
    <PageTemplate useHeader={false}>
      <BucketListContainer />
    </PageTemplate>
  );
}

export default BucketList;
