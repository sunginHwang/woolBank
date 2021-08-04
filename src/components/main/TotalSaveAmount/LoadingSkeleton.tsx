import React from 'react';
import PlaceHolderBar from '@components/atoms/PlaceHolderBar';

/**
 * 메인페이지 - 저축금 정보 로딩창
 * @component
 */

function LoadingSkeleton() {
  return (
    <>
      <PlaceHolderBar width='17rem' height='4rem' />
      <PlaceHolderBar width='24rem' height='4rem' />
      <PlaceHolderBar width='13rem' height='4rem' />
    </>
  );
}

export default LoadingSkeleton;
