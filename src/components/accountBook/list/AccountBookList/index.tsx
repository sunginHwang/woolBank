import React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';
import { format } from 'date-fns';

import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import DayGroup from '@components/accountBook/list/DayGroup';
import EmptyData from '@components/common/EmptyData';
import Item from './Item';

/**
 * 가계부 리스트
 * @component
 */

interface IProps {
  accountBookList: IAccountBookListItem[];
}

function AccountBookList(props: IProps) {
  const { accountBookList } = props;

  const accountBookListGroupDays =
    _.chain(accountBookList)
    .groupBy(a => format(a.registerDateTime, 'd'))
    .value();

  if (accountBookList.length === 0) {
    return <S.AccountBookList><EmptyData msg='작성한 소비 내역이 없습니다.' /></S.AccountBookList>;
  }

  return (
    <S.AccountBookList>
      {
        Object.entries(accountBookListGroupDays).map(key => {
          const days = key[0];
          const accountBookList = key[1];
          const totalAmount = getTotalAmount(accountBookList);
          return (
            <DayGroup key={days} days={days} totalAmount={totalAmount}>
              { accountBookList.map(item => <Item key={item.id} accountBookListItem={item} />) }
            </DayGroup>
          );
        })
      }
    </S.AccountBookList>
  );
}


/**
 * 가계부 리스트의 총합금액 구하기 (소비, 지출 포함)
 */
function getTotalAmount(accountBookList: IAccountBookListItem[]) {
  return accountBookList.reduce((prev, item) => {
    const addPrice = item.type === 'income' ? item.amount : -item.amount;
    return prev + addPrice;
  }, 0);
}


const S: {
  AccountBookList: any;
} = {
  AccountBookList: styled.div`
    margin-top: 3rem;
  `,
}

export default AccountBookList;
