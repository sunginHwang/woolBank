import React from 'react';
import styled from 'styled-components';

import AccountListItemSkeleton from '@components/account/list/AccountListItemSkeleton';
import PageTemplate from '@components/layout/PageTemplate';
import TotalSavedAmount from '@components/main/TotalSavedAmount';

function MainPageSkeleton() {
  return (
    <PageTemplate isMain>
      <TotalSavedAmount useSkeleton />
      <S.EmptyArea />
      {[...Array(3)].map((_, key) => (
        <AccountListItemSkeleton key={key} />
      ))}
    </PageTemplate>
  );
}

const S: {
  EmptyArea: any;
} = {
  EmptyArea: styled.div`
    padding-top: 15rem;
  `
};

export default MainPageSkeleton;
