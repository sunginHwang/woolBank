import React from 'react';
import styled from 'styled-components';

import { IChartData } from '@models/IChartData';
import { addComma } from '@support/util/String';
import { PIE_CHART_COLOR_LIST } from '@support/constants';
import { IAccountBookStatistic } from '@models/accountBook/statistic/IAccountBookStatistic';

interface IProps {
  accountBookStatistics: IAccountBookStatistic[];
}

/**
 * 가계부 통계 - 통계 리스트
 * @component
 */

function StatisticList({ accountBookStatistics }: IProps) {
  return (
    <S.StatisticList>
      {accountBookStatistics.map(({ categoryName, percentage, amount }, index) => {
        return (
          <S.Item key={categoryName}>
            <S.CategoryName color={PIE_CHART_COLOR_LIST[index] || PIE_CHART_COLOR_LIST[0]}>
              {categoryName}({percentage}%)
            </S.CategoryName>
            <S.Amount>{addComma(amount)}원</S.Amount>
          </S.Item>
        );
      })}
    </S.StatisticList>
  );
}

export default StatisticList;

const S = {
  StatisticList: styled.div`
    margin: 2rem 0 10rem 0;
  `,
  Item: styled.div`
    display: flex;
    justify-content: space-between;

    & + & {
      margin-top: 2rem;
    }
  `,
  CategoryName: styled.span<{ color: string }>`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.blackL1};
    position: relative;
    padding-left: 4rem;

    &:before {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 0.8rem;
      background-color: ${({ color }) => color};
      content: '';
      left: 0;
      position: absolute;
    }
  `,
  Amount: styled.span`
    color: ${({ theme }) => theme.colors.greyL1};
  `
};
