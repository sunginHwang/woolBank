import React from 'react';
import styled from 'styled-components';
import theme from '../../../style/colors';
import IcoCalendarMonthOutline from '../../icon/IcoCalendarMonthOutline';
type BucketListContentInfoProps = {
}

function BucketListContentInfo({ }: BucketListContentInfoProps) {
  return (
    <S.BucketListContentInfo>
      <S.ContentItem>
        <S.Message>Como exemplos de conjunções coordenativas adversativas temos: porém, mas, contudo, todavia, entretanto.</S.Message>
      </S.ContentItem>
      <S.ContentItem>
        <i>
          <IcoCalendarMonthOutline width={24} height={24} fill={theme.colors.blackL1} />
        </i>
        <div>
          <S.Title>목표 달성일</S.Title>
          <span>2020-03-12 까지</span>
        </div>
      </S.ContentItem>
    </S.BucketListContentInfo>
  );
}

export default BucketListContentInfo;

const S :any = {
  BucketListContentInfo: styled.div`
    background-color: white;
  `,
  ContentItem: styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 1rem;
    border-bottom: .1rem solid ${props => props.theme.colors.greyL2};
    padding: 2rem 0;
    > i {
     margin-right: 1rem;
     line-height: 0;
    }
    
    
    span {
      font-size: 1.4rem;
      line-height: 1.8rem;
      color: ${props => props.theme.colors.greyD2};
    }
    
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      margin-bottom: 2rem;
    }
  `,
  Message: styled.p`
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: ${props => props.theme.colors.blackL1};
  `,
  Title: styled.p`
    font-size: 1.6rem;
    line-height: 2rem;
    color: ${props => props.theme.colors.blackL1};
    font-weight: bold;
  `
}
