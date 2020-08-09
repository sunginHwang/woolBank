import React from 'react';
import styled from 'styled-components';
import CardItem from '../../common/CardItem';
import colors from '../../../style/colors';
import { IBucketList } from '../../../models/IBucketList';
import { remainDays } from '../../../support/util/date';
import IcoCircleCheck from '../../icon/IcoCircleCheck';
import EmptyCircle from '../../common/EmptyCircle';
type BucketListItemProps = {
  bucketList: IBucketList;
}

function BucketListItem({
  bucketList
}: BucketListItemProps) {
  const remainDate = remainDays(new Date(), bucketList.completeDate);
  const remainTodoCount = bucketList.todoCount - bucketList.completeTodoCount;
  const remainTodoCountMsg = remainTodoCount === 0 ? '모든 할일을 마치셨습니다.' : `${remainTodoCount}개의 할 일이 남았어요.`;
  return (
    <CardItem>
      <S.BucketListItem>
        <div>
          {
            bucketList.image
              ? <img src={bucketList.image.thumbImageUrl} alt='버킷리스트 썸네일 이미지' />
              : <EmptyCircle size={40} />
          }
          <S.Content>
            <p>{bucketList.title}</p>
            <span>{remainTodoCountMsg}</span>
          </S.Content>
        </div>
        <div>
          {
            remainDate === 0
              ? <IcoCircleCheck fill={colors.colors.navyD1} width={24} height={24} />
              : <S.RemainDate>D-{remainDate}</S.RemainDate>
          }
        </div>
      </S.BucketListItem>
    </CardItem>
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
    
    >div{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    
    img {
      width: 4rem; 
      height: 4rem;
      border-radius: 50%;
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1.4rem;
     p{
        margin-top: .4rem;
        font-size: 1.6rem;
        font-weight: 500;
        color: ${props => props.theme.colors.blackL1};
    }
    span{
      font-size: 1.2rem;
      color: ${props => props.theme.colors.greyL1};
    }
  `,
  RemainDate: styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: ${props => props.theme.colors.navyD1};
  `
};

export default React.memo(BucketListItem);
