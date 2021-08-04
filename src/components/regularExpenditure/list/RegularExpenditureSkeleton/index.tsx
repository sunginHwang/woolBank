import React from 'react';
import styled from 'styled-components';

import PlaceHolderBar from '@components/atoms/PlaceHolderBar';
import LineSeparator from '@components/common/LineSeparator';

/**
 * 정기 지출 리스트 -> 리스트 페이지 로딩 스켈레톤
 * @component
 */

function RegularExpenditureSkeleton() {
  return (
    <div>
      <S.Title>
        <PlaceHolderBar width='100%' height='5.4rem' />
      </S.Title>
      <S.OneWeek>
        <PlaceHolderBar width='20.4rem' height='2.2rem' />
        <PlaceHolderBar width='100%rem' height='4.3rem' />
      </S.OneWeek>
      <LineSeparator />
      <S.List>
        <S.ListTop>
          <PlaceHolderBar width='6rem' height='2.1rem' />
          <PlaceHolderBar width='7rem' height='2.1rem' />
        </S.ListTop>
        <S.ListContent>
          <PlaceHolderBar width='100%' height='6.5rem' />
          <PlaceHolderBar width='100%' height='6.5rem' />
          <PlaceHolderBar width='100%' height='6.5rem' />
        </S.ListContent>
      </S.List>
      <S.List>
        <S.ListTop>
          <PlaceHolderBar width='6rem' height='2.1rem' />
          <PlaceHolderBar width='7rem' height='2.1rem' />
        </S.ListTop>
        <S.ListContent>
          <PlaceHolderBar width='100%' height='6.5rem' />
          <PlaceHolderBar width='100%' height='6.5rem' />
          <PlaceHolderBar width='100%' height='6.5rem' />
          <PlaceHolderBar width='100%' height='6.5rem' />
          <PlaceHolderBar width='100%' height='6.5rem' />
        </S.ListContent>
      </S.List>
    </div>
  );
}

const S = {
  ListContent: styled.div`
    margin-top: 1rem;
  `,
  ListTop: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  `,
  List: styled.div`
    margin-top: 3rem;
  `,
  Title: styled.div`
    margin: 1rem 0 2rem 0;
  `,
  OneWeek: styled.div`
    div {
      &:first-child {
        margin-bottom: 1.5rem;
      }
    }
  `
};

export default RegularExpenditureSkeleton;
