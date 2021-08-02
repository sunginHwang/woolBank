import React from 'react';
import styled from 'styled-components';

import AccountListItemSkeleton from '@components/account/list/AccountListItem/ItemSkeleton';
import PageTemplate from '@components/layout/PageTemplate';
import TotalSaveAmount from '@components/main/TotalSaveAmount';

/**
 * 메인페이지 - 로딩 스켈레톤 영역
 * @component
 */

function MainPageSkeleton() {
  const render3Skeleton = [...Array(3)];
  return (
    <PageTemplate isMain>
      <TotalSaveAmount isLoading />
      <S.EmptyArea />
      {render3Skeleton.map((_, key) => (
        <AccountListItemSkeleton key={key} />
      ))}
    </PageTemplate>
  );
}

export default MainPageSkeleton;

const S = {
  EmptyArea: styled.div`
    padding-top: 15rem;
  `
};
