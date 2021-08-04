import React from 'react';
import PlaceHolderBar from '@components/common/PlaceHolderBar';

/**
 * 버킷리스트 상세 - 할일 로딩 리스트
 * @component
 */

function SkeletonList() {
  return (
    <>
      {[...Array(4)].map((_, index) => <PlaceHolderBar key={index} width='100%' height='5.4rem' />)}
    </>
  )
}

export default React.memo(SkeletonList);
