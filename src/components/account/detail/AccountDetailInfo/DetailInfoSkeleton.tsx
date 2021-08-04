import React from 'react';
import styled from 'styled-components';

import DepositList from '@components/account/detail/DepositList';
import PlaceHolderBar from '@components/atoms/PlaceHolderBar';
import Progress from '@components/atoms/Progress';
import palette from '@style/palette';

/**
 * 예적금 상세 - 상세정보 로딩 스켈레톤
 * @component
 */

function DetailInfoSkeleton() {
  return (
    <>
      <S.AccountInfoSkeleton>
        <S.Title>
          <PlaceHolderBar width='17rem' height='2.2rem' />
        </S.Title>
        <S.CurrentAmount>
          <PlaceHolderBar width='23rem' height='4.4rem' />
        </S.CurrentAmount>
        <Progress percent={0} label={0} color={palette.greyL2} labelSuffix='%' startMessage='개설일: 0000-00-00' endMessage='만기일: 0000-00-00' />
        <S.Amount>
          <span>만기예상액 : </span>
          <PlaceHolderBar width='18rem' height='2.4rem' />
        </S.Amount>
      </S.AccountInfoSkeleton>
      <DepositList.Skeleton />
    </>
  )
}

export default DetailInfoSkeleton;

const S = {
  AccountInfoSkeleton: styled.div`
    padding: 4rem 2rem;
    display: flex;
    background-color: ${({ theme }) => theme.colors.white};
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.colors.blackL1};
  `,
  Title: styled.div`
    padding: .3rem 0;
    margin-bottom: 1rem;
  `,
  CurrentAmount: styled.div`
    margin-bottom: 3rem;
    padding: 0.85rem 0;
  `,
  Amount: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
    padding: 0.35rem 0;
  `
};
