import React from 'react';
import { useParams } from 'react-router';

import BucketListDetailContainer from '@containers/bucketList/detail/BucketListDetailContainer';
import BucketListTodoContainer from '@containers/bucketList/detail/BucketListTodoContainer';
import PageTemplate from '@components/layout/PageTemplate';
import { useToggle } from '@support/hooks/useToggle';

function BucketListDetail() {
  const { bucketListId } = useParams();
  const [showCompleteButton, onShowCompleteButton, offShowCompleteButton] = useToggle(true);

  const setShowCompleteButton = (toggle: boolean) => {
    toggle ? onShowCompleteButton() : offShowCompleteButton();
  };

  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <BucketListDetailContainer bucketListId={Number(bucketListId)} showCompleteButton={showCompleteButton} />
      <BucketListTodoContainer bucketListId={Number(bucketListId)} onToggleShowCompleteButton={setShowCompleteButton} />
    </PageTemplate>
  );
}

export default BucketListDetail;
