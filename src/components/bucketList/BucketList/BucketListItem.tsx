import React from 'react';
import styled from 'styled-components';
import CardItem from '../../common/CardItem';
import colors from '../../../style/colors';
import { IBucketList } from '../../../models/IBucketList';
import { remainDays } from '../../../support/util/date';
import IcoCircleCheck from '../../icon/IcoCircleCheck';
import EmptyCircle from '../../common/EmptyCircle';
import { Link } from 'react-router-dom';
import { onImageFallback } from '../../../support/util/image';

type BucketListItemProps = {
  bucketList: IBucketList;
};

function BucketListItem({
  bucketList
}: BucketListItemProps) {
  const remainDate = remainDays(new Date(), bucketList.completeDate);
  const remainTodoCount = bucketList.todoCount - bucketList.completeTodoCount;
  const remainTodoCountMsg = remainTodoCount === 0 ? '모든 할일을 마치셨습니다.' : `${remainTodoCount}개의 할 일이 남았어요.`;

  return (
    <Link to={`/bucket-list/${bucketList.id}`}>
      <CardItem>
        <S.BucketListItem>
          <div>
            {
              bucketList.thumbImageUrl
                ? <img src={bucketList.thumbImageUrl} alt='버킷리스트 썸네일 이미지' onError={onImageFallback} />
                : <EmptyCircle size={50} />
            }
            <S.Content>
              <p>{bucketList.title}</p>
              <span>{remainTodoCountMsg}</span>
            </S.Content>
          </div>
          <div>
            {
              remainDate === 0
                ? <IcoCircleCheck fill={colors.colors.mainColor} width={24} height={24} />
                : <S.RemainDate>D-{remainDate}</S.RemainDate>
            }
          </div>
        </S.BucketListItem>
      </CardItem>
    </Link>
  );
}

const S: {
  BucketListItem: any;
  Content: any;
  RemainDate: any;
} = {
  BucketListItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      border: .1rem solid ${(props) => props.theme.colors.greyL2};
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1.4rem;
    p {
      font-size: 1.6rem;
      font-weight: bold;
      line-height: 1.9;
      
      color: ${(props) => props.theme.colors.blackL2};
    }
    span {
      font-size: 1.2rem;
      color: ${(props) => props.theme.colors.greyL7};
    }
  `,
  RemainDate: styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    color: ${(props) => props.theme.colors.mainColor};
  `
};

export default React.memo(BucketListItem);
