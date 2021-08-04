import React from 'react';
import { useParams } from 'react-router';

import BucketDetailInfo from '@components/bucketList/detail/BucketDetailInfo';
import TodoInfo from '@components/bucketList/detail/TodoInfo';
import PageTemplate from '@components/layout/PageTemplate';
import { useToggle } from '@support/hooks/useToggle';

function BucketDetailPage() {
  const { bucketId } = useParams<{ bucketId: string }>();
  const [showCompleteButton, onShowCompleteButton, offShowCompleteButton] = useToggle(true);

  const setShowCompleteButton = (toggle: boolean) => {
    toggle ? onShowCompleteButton() : offShowCompleteButton();
  };

  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <BucketDetailInfo bucketId={Number(bucketId)} showCompleteButton={showCompleteButton} />
      <TodoInfo bucketId={Number(bucketId)} onToggleShowCompleteButton={setShowCompleteButton} />
    </PageTemplate>
  );
}

export default BucketDetailPage;
