import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CardItem from '@components/common/CardItem';
import { getRemainDatePercentage, parseDate } from '@support/util/date';
import { addComma } from '@support/util/String';
import { IAccount } from '@models/account/IAccount';
import ItemSkeleton from './ItemSkeleton';

interface IProps {
  account: IAccount;
  useSideMargin?: boolean;
}

/**
 * 예적금 리스트아이템
 * @component
 */

function AccountListItem(props: IProps) {
  const {
    account: { id, title, startDate, savingType, endDate, amount, currentAmount },
    useSideMargin = false
  } = props;

  const remainPercent = getRemainDatePercentage(startDate, endDate);

  return (
    <Link to={`/accounts/${id}`}>
      <div data-cy='accountItem'>
        <CardItem useSideMargin={useSideMargin}>
          <S.Top>
            <p>{title}</p>
            <div>
              <span>{savingType.name}</span>
            </div>
          </S.Top>
          <S.Content>
            <p>
              {addComma(currentAmount || 0)} <span>원</span>
            </p>
          </S.Content>
          <S.Bottom>
            <p>만기일 : {parseDate(endDate)}</p>
            <span>만기금액 : {addComma(amount)}원</span>
          </S.Bottom>
          <S.Progress percent={remainPercent}>
            <div />
          </S.Progress>
        </CardItem>
      </div>
    </Link>
  );
}

AccountListItem.Skeleton = ItemSkeleton;

export default AccountListItem;

const S = {
  Top: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.8rem;
    margin-bottom: 0.3rem;

    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: ${({ theme }) => theme.colors.blackL2};
      font-size: 1.6rem;
    }

    span {
      font-size: 1.4rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.greyL5};
    }

    > div {
      display: flex;
      min-width: 7.5rem;
      align-items: center;
      justify-content: flex-end;
    }
  `,
  Content: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.8rem;

    p {
      font-size: 2.4rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.mainColor};
    }

    span {
      font-size: 1.4rem;
      font-weight: normal;
    }
  `,
  Bottom: styled.div`
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.greyL7};
    font-weight: bold;
    opacity: 0.7;
  `,
  Progress: styled.div<{
    percent: number;
  }>`
    margin-top: 1.6rem;
    height: 0.1rem;
    border-radius: 0.3rem;
    background-color: ${({ theme }) => theme.colors.greyL2};

    div {
      width: ${({ percent }) => percent}%;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.mainColor};
    }
  `
};