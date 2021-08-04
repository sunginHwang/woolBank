import React from 'react';
import styled from 'styled-components';

import PlaceHolderBar from '@components/atoms/PlaceHolderBar';
import DepositListWrapper from './DepositListWrapper';

/**
 * 예적금 상세 - 입금 리스트 로딩 스켈레톤
 * @component
 */

function ListSkeleton() {
  const tenLoadingHolders = [...Array(10)];

  return (
    <DepositListWrapper>
      {
        tenLoadingHolders.map((_, key) => (
          <S.DepositRecordItemSkeleton key={key}>
            <S.Info>
              <div>
                <PlaceHolderBar width='8rem' height='1.4rem' />
              </div>
              <div>
                <PlaceHolderBar width='12rem' height='1.2rem' />
              </div>
            </S.Info>
            <div>
              <PlaceHolderBar width='14rem' height='2rem' />
            </div>
          </S.DepositRecordItemSkeleton>
        ))
      }
    </DepositListWrapper>
  )
}

export default ListSkeleton;

const S = {
  DepositRecordItemSkeleton: styled.div`
    display: flex;
    padding: 2rem 0;
    justify-content: space-between;
    align-items: center;
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;

    > div:last-child {
      padding: 0.05rem 0;
    }

    > div:first-child {
      padding: 0.1rem 0;
      margin-bottom: 0.4rem;
    }
  `
};
