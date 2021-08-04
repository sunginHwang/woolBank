import React from 'react';
import styled from 'styled-components';

import IcoCalendarMonthOutline from '@components/icon/IcoCalendarMonthOutline';
import PlaceHolderBar from '@components/common/PlaceHolderBar';
import palette from '@style/palette';
import { parseDate } from '@support/util/date';
import ContentSkeleton from './ContentSkeleton';

interface IProps {
  isLoading: boolean;
  description: string;
  completeDate: string | Date;
}

/**
 * 버킷리스트 상세 -  컨텐츠 정보
 * @component
 */

function ContentInfo(props: IProps) {
  const { isLoading, description, completeDate } = props;

  return (
    <S.BucketListContentInfo>
      {isLoading && <ContentSkeleton />}
      {!isLoading && (
        <S.ContentItem>
          <S.Message data-cy='description'>{description}</S.Message>
        </S.ContentItem>
      )}
      <S.ContentItem>
        <i>
          <IcoCalendarMonthOutline width={24} height={24} fill={palette.blackL1} />
        </i>
        <div>
          <S.Title>목표 달성일</S.Title>
          {isLoading ? <PlaceHolderBar width='10rem' height='1.4rem' /> : <span>{parseDate(completeDate)}</span>}
        </div>
      </S.ContentItem>
    </S.BucketListContentInfo>
  );
}

export default ContentInfo;

const S = {
  BucketListContentInfo: styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    padding: 2rem 2rem 0 2rem;
  `,
  ContentItem: styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 1rem;
    border-bottom: .1rem solid ${({ theme }) => theme.colors.greyL2};
    padding: 2rem 0;
    white-space: pre-wrap;
    
    > i {
     margin-right: 1rem;
     line-height: 0;
    }
     
    span {
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: ${({ theme }) => theme.colors.greyD2};
    }
    
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  `,
  Message: styled.p`
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.blackL1};
  `,
  Title: styled.p`
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.blackL1};
    font-weight: bold;
  `
}
