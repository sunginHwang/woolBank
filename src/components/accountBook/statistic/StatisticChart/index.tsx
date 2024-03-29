import React from 'react';
import styled from 'styled-components';

import { ResponsivePie } from '@nivo/pie';
import {
  IAccountBookStatistic,
  IAccountBookStatisticListItem
} from '@models/accountBook/statistic/IAccountBookStatistic';
import { PIE_CHART_COLOR_LIST } from '@support/constants';
import EmptyData from '@components/common/EmptyData';
import List from './List';

export interface IAccountBookChartData {
  id: string;
  label: string;
  value: number;
  percentage: string;
  color: string;
  list: IAccountBookStatisticListItem[];
}

interface IProps {
  accountBookStatistics: IAccountBookStatistic[];
}

/**
 * 가계부 통계 - 차트 (파이)
 * @component
 */

function StatisticChart({ accountBookStatistics }: IProps) {
  const accountBookChartList: IAccountBookChartData[] = accountBookStatistics.map(
    ({ categoryName, amount, percentage, list }, index) => {
      return {
        id: categoryName,
        label: categoryName,
        value: amount,
        list,
        percentage: `${percentage}%`,
        color: PIE_CHART_COLOR_LIST[index] || PIE_CHART_COLOR_LIST[0]
      };
    }
  );

  if (accountBookChartList.length === 0) {
    return <EmptyData msg='통계 내역이 존재하지 않습니다.' />;
  }

  return (
    <>
      <S.StatisticChart>
        <ResponsivePie
          data={accountBookChartList}
          colors={{ datum: 'data.color' }}
          margin={{ top: 60, right: 40, bottom: 60, left: 40 }}
          innerRadius={0.4}
          padAngle={3}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          arcLinkLabel={getLabel}
          arcLabel={getInnerLabel}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
          arcLinkLabelsThickness={1}
          arcLinkLabelsStraightLength={6}
          arcLinkLabelsDiagonalLength={10}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        />
      </S.StatisticChart>
      <List accountBookChartList={accountBookChartList} />
    </>
  );
}

function getLabel(e: any) {
  const idLabel: string = e.id;
  return idLabel.length > 7 ? `${idLabel.substring(0, 7)}..` : idLabel;
}

function getInnerLabel(e: any) {
  return e.data.percentage;
}

export default StatisticChart;

const S = {
  StatisticChart: styled.div`
    height: 30rem;
    margin: 0 -2rem;
  `
};
