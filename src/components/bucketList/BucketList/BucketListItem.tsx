import React from 'react';
import styled from 'styled-components';
import CardItem from '../../common/CardItem';
import IcoPresent from '../../icon/IcoPresent';
import colors from '../../../style/colors';
import { IBucketList } from '../../../models/IBucketList';
import IcoDowHorizontal from '../../icon/IcoDotHorizontal';

type BucketListItemProps = {
  bucketList: IBucketList;
}

function BucketListItem({
                          bucketList
                        }: BucketListItemProps) {
  return (
    <CardItem>
      <S.BucketListItem>
        <div>
          <IcoPresent width={24} height={24} fill={colors.colors.navyD1}/>
          <S.Content>
            <p>{bucketList.title}</p>
            <span>{bucketList.percent}% 달성</span>
          </S.Content>
        </div>
        <IcoDowHorizontal fill={colors.colors.navyD1}/>
      </S.BucketListItem>
    </CardItem>
  );
}

const S: {
  BucketListItem: any;
  Content: any;
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
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1.4rem;
     p{
        margin-top: .4rem;
        font-size: 1.6rem;
    }
    span{
      font-size: 1.2rem;
      color: ${props => props.theme.colors.greyL1};
    }
  `
};

export default React.memo(BucketListItem);
