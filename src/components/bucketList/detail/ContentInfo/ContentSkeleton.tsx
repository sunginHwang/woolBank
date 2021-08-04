import React from 'react';
import PlaceHolderBar from '@components/common/PlaceHolderBar';

/**
 * 버킷리스트 상세 - 컨텐츠 정보 로딩 스켈레톤
 * @component
 */

function ContentSkeleton() {
  return (
    <>
      <PlaceHolderBar width='80%' height='1.4rem' />
      <PlaceHolderBar width='60%' height='1.4rem' />
      <PlaceHolderBar width='50%' height='1.4rem' />
    </>
  );
}

export default ContentSkeleton;
