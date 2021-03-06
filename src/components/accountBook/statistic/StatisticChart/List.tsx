import React from 'react';
import styled from 'styled-components';

import { addComma } from '@support/util/String';
import { IAccountBookChartData } from './index';

interface IProps {
  accountBookChartList: IAccountBookChartData[];
}

/**
 * 가계부 통계 - 통계 리스트
 * @component
 */

function StatisticList({ accountBookChartList }: IProps) {
  return (
    <S.StatisticList>
      {accountBookChartList.map(({ label, percentage, value, color }, index) => {
        return (
          <S.Item key={label}>
            <S.CategoryName color={color}>
              {label}({percentage})
            </S.CategoryName>
            <S.Amount>{addComma(value)}원</S.Amount>
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
