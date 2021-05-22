import React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';
import { format } from 'date-fns';

import { addComma } from '@support/util/String';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { DummyAccountBookList } from './dummy';
import DayGroup from '@components/accountBook/list/DayGroup';

/**
 * 가계부 리스트
 * @component
 */


function AccountBookList() {
  const accountBookListGroupDays =
    _.chain(DummyAccountBookList)
    .groupBy(a => format(a.registerDateTime, 'd'))
    .value();

  return (
    <div>
      {
        Object.entries(accountBookListGroupDays).map(key => {
          const days = key[0];
          const accountBookList = key[1];
          return (
            <div key={days}>
              <DayGroup days={days} totalAmount={1030303} />
              { accountBookList.map(item => <Item key={item.id} accountBookListItem={item} />) }
            </div>
          );
        })
      }
    </div>
  );
}

interface ItemProps {
  accountBookListItem: IAccountBookListItem;
};

function Item({ accountBookListItem }: ItemProps) {
  const { categoryName, title, amount, registerDateTime, isRegularExpenditure} = accountBookListItem;

  const registerTime = format(registerDateTime, 'hh:mm');

  return (
    <S.Item>
      <div>
        <S.Category>{categoryName}</S.Category>
        <S.Info>
          <span>{title}</span>{isRegularExpenditure && <em>정기지출</em>}
        </S.Info>
      </div>
      <S.Price>{addComma(amount)}원</S.Price>
    </S.Item>
  );
}

const S: {
  Item: any;
  Price: any;
  Category: any;
  Info: any;
} = {
  Item: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    > div:first-child {
      display: flex;
      justify-content: flex-start;
    }
  `,
  Price: styled.p`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.pinkL2};
  `,
  Category: styled.p`
    width: 6rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.greyD2};
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 1.2rem;
  `
}

export default AccountBookList;
