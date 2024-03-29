import React from 'react';

import BucketListAddContainer from '@components/bucketList/add/bucketListAddContainer';

import { useQuery } from '@support/hooks/UseQuery';

function BucketListSave() {
  const { bucketListId } = useQuery(['bucketListId']);

  return <BucketListAddContainer bucketListId={Number(bucketListId)} />;
}

export default BucketListSave;
