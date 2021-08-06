import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CardItem from '@components/common/CardItem';
import IcoCircleCheck from '@components/icon/IcoCircleCheck';
import EmptyCircle from '@components/common/EmptyCircle';
import { onImageFallback } from '@support/util/image';
import { remainDays } from '@support/util/date';
import palette from '@style/palette';
import { IBucketList } from '@models/bucketList/IBucketList';
import ItemSkeleton from './ItemSkeleton';

interface IProps {
  bucketList: IBucketList;
  useSideMargin?: boolean;
}

/**
 * 버킷리스트 아이템
 * @component
 */

function BucketListItem({ bucketList, useSideMargin = false }: IProps) {
  const remainDate = remainDays(new Date(), bucketList.completeDate);
  const remainTodoCount = bucketList.todoCount - bucketList.completeTodoCount;
  const remainTodoCountMsg =
    remainTodoCount === 0 ? '모든 할일을 마치셨습니다.' : `${remainTodoCount}개의 할 일이 남았어요.`;

  const isExpireDday = remainDate === 0;

  return (
    <Link to={`/bucket-list/${bucketList.id}`}>
      <CardItem useSideMargin={useSideMargin}>
        <S.BucketListItem data-cy='bucketItem'>
          <div>
            {
              bucketList.thumbImageUrl
                ? <img src={bucketList.thumbImageUrl} alt='버킷리스트 썸네일 이미지' onError={onImageFallback} />
                : <EmptyCircle size={52} />
            }
            <S.Content>
              <p>{bucketList.title}</p>
              <span>{remainTodoCountMsg}</span>
            </S.Content>
          </div>
          <div>
            {isExpireDday && <IcoCircleCheck fill={palette.mainColor} width={24} height={24} />}
            {!isExpireDday && <S.RemainDate>D-{remainDate}</S.RemainDate>}
          </div>
        </S.BucketListItem>
      </CardItem>
    </Link>
  );
}

BucketListItem.Skeleton = ItemSkeleton;

export default BucketListItem;

const S = {
  BucketListItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      
      &:first-child {
        justify-content: flex-start;
      }
      
      &:last-child {
        justify-content: flex-end;
        min-width: 6rem;
      }
    }

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      border: 0.1rem solid ${({ theme }) => theme.colors.greyL2};
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1.4rem;
    p {
      font-size: 1.6rem;
      font-weight: bold;
      line-height: 1.5;

      color: ${({ theme }) => theme.colors.blackL2};
    }
    span {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.greyL7};
    }
  `,
  RemainDate: styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.mainColor};
  `
};
