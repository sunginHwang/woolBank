import React from 'react';
import styled from 'styled-components';
import theme from '../../../style/colors';
import IcoCalendarMonthOutline from '../../icon/IcoCalendarMonthOutline';
import PlaceHolderBar from '../../common/PlaceHolderBar';
import { parseDate } from '../../../support/util/date';
type BucketListContentInfoProps = {
  isLoading: boolean;
  description: string;
  completeDate: string | Date;
}

function BucketListContentInfo({
  isLoading,
  description,
  completeDate
}: BucketListContentInfoProps) {
  return (
    <S.BucketListContentInfo>
      {isLoading && (
        <>
          <PlaceHolderBar width='80%' height='1.4rem' />
          <PlaceHolderBar width='60%' height='1.4rem' />
          <PlaceHolderBar width='50%' height='1.4rem' />
        </>
      )}
      {!isLoading && (
        <S.ContentItem>
          <S.Message>{description}</S.Message>
        </S.ContentItem>
      )}
      <S.ContentItem>
        <i>
          <IcoCalendarMonthOutline width={24} height={24} fill={theme.colors.blackL1} />
        </i>
        <div>
          <S.Title>목표 달성일</S.Title>
          {isLoading ? <PlaceHolderBar width='10rem' height='1.4rem' /> : <span>{parseDate(completeDate)}</span>}
        </div>
      </S.ContentItem>
    </S.BucketListContentInfo>
  );
}

export default BucketListContentInfo;

const S :any = {
  BucketListContentInfo: styled.div`
    background-color: ${props => props.theme.colors.white};
    padding: 2rem 2rem 0 2rem;
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
      margin-bottom: 0;
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
