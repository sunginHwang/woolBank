import React from 'react';
import styled from 'styled-components';

import { getRemainDay } from '@support/util/date';
import { IRegularExpenditure } from '@models/accountBook/IRegularExpenditure';

export interface OneWeekAgoItemProps {
  // 정기 지출 정보
  regularExpenditure: IRegularExpenditure;
}

/**
 * 정기 지출 리스트 -> 이주일 이내 지출 리스트 아이템
 * @component
 */

function OneWeekAgoItem({ regularExpenditure }: OneWeekAgoItemProps) {
  const { title, regularExpenditureDay } = regularExpenditure;
  const { remainDayKo } = getRemainDay(regularExpenditureDay, { completeMsg: '지출일' });

  return (
    <S.OneWeekAgoItem>
      <S.Content>
        <p>{title}</p>
        <span>{remainDayKo}</span>
      </S.Content>
    </S.OneWeekAgoItem>
  );
}

const S: {
  OneWeekAgoItem: any;
  Content: any;
} = {
  OneWeekAgoItem: styled.li`
    margin-right: 1.5rem;
    display: inline-block;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1.3rem;
    padding: 0.5rem 1.2rem;
    max-width: 7.2rem;

    background-color: ${({ theme }) => theme.colors.greyL2};

    p {
      font-size: 1.2rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 7rem;
      color: ${({ theme }) => theme.colors.greyD3};
    }

    span {
      color: ${({ theme }) => theme.colors.mainColor};
      font-size: 1rem;
      text-align: right;
    }
  `
};

export default React.memo(OneWeekAgoItem);
