import React from 'react';
import { useParams } from 'react-router';

import BucketListDetailContainer from '@containers/bucketList/detail/BucketListDetailContainer';
import TodoInfo from '@components/bucketList/detail/TodoInfo';
import PageTemplate from '@components/layout/PageTemplate';
import { useToggle } from '@support/hooks/useToggle';

function BucketDetailPage() {
  const { bucketId } = useParams();
  const [showCompleteButton, onShowCompleteButton, offShowCompleteButton] = useToggle(true);

  const setShowCompleteButton = (toggle: boolean) => {
    toggle ? onShowCompleteButton() : offShowCompleteButton();
  };

  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <BucketListDetailContainer bucketListId={Number(bucketId)} showCompleteButton={showCompleteButton} />
      <TodoInfo bucketId={Number(bucketId)} onToggleShowCompleteButton={setShowCompleteButton} />
    </PageTemplate>
  );
}

export default BucketDetailPage;
