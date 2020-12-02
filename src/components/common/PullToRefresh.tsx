import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ptr from '@support/util/ptr';

export interface PullToRefreshProps {
  // 헤더 사용 유무
  children: React.ReactNode;
}

function PullToRefresh({ children }: PullToRefreshProps) {
  const rootRef = useRef(null);
  const refreshNameRef = useRef(null);

  useEffect(() => {
    const ptrInstance = ptr({
      $target: rootRef.current,
      $header: refreshNameRef.current,
      onRefresh: a
    });

    ptrInstance.init();

    return () => {
      ptrInstance.destroy();
    };
  }, []);

  const a = (cb: any) => {
    console.log('entry');
    setTimeout(() => {
      console.log('end');
      cb();
    }, 1000);
  };

  return (
    <div ref={rootRef}>
      <S.PtrHeader ref={refreshNameRef} />
      <S.PtrList>{children}</S.PtrList>
    </div>
  );
}

export default PullToRefresh;

const S: {
  PtrHeader: any;
  PtrList: any;
} = {
  PtrHeader: styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: -10rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `,
  PtrList: styled.div`
    position: relative;
  `
};
