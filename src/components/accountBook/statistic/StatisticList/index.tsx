import { IChartData } from '@models/IChartData';
import styled from 'styled-components';
import React from 'react';
import { addComma } from '@support/util/String';

interface IProps {
  statisticList: IChartData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function StatisticList({ statisticList }: IProps) {
  const totalAmount = statisticList.reduce((acc, item) => acc + item.value, 0);

  return (
    <S.StatisticList>
      {statisticList.map((item, index) => {
        const percentText = `${((item.value / totalAmount) * 100).toFixed(0)}%`;
        return (
          <S.Item key={item.name}>
            <S.CategoryName color={COLORS[index] || '#0088FE'}>
              {item.name}({percentText})
            </S.CategoryName>
            <S.Amount>{addComma(item.value)}원</S.Amount>
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
