import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router';

import { addComma } from '@support/util/String';
import { useQuery } from '@/support/hooks/UseQuery';
import { IAccountBookStatisticListItem } from '@/models/accountBook/statistic/IAccountBookStatistic';
import CategoryBottomSheet from '@components/accountBook/statistic/CategoryBottomSheet';
import { IAccountBookChartData } from './index';

interface IActiveSheet {
  color: string;
  label: string;
  list: IAccountBookStatisticListItem[];
}

const initActiveSheet: IActiveSheet = {
  color: '',
  label: '',
  list: []
};

interface IProps {
  accountBookChartList: IAccountBookChartData[];
}

/**
 * 가계부 통계 - 통계 리스트
 * @component
 */

function StatisticList({ accountBookChartList }: IProps) {
  const history = useHistory();
  const location = useLocation();
  const { sheet } = useQuery(['sheet']);
  const [activeSheetList, setActiveSheetList] = useState<IActiveSheet>(initActiveSheet);

  const onCloseSheet = () => {
    history.goBack();
  };

  const isSheetOpen = sheet === 'open';

  return (
    <>
      <S.StatisticList>
        {accountBookChartList.map(({ label, percentage, value, color, list }) => {
          const onItemClick = () => {
            const { pathname, search } = location;
            history.push({ pathname, search: `${search}&sheet=open` });
            setActiveSheetList({ color, label, list });
          };
          return (
            <S.Item key={label} onClick={onItemClick}>
              <S.CategoryName color={color}>
                {label}({percentage})
              </S.CategoryName>
              <S.Amount>{addComma(value)}원</S.Amount>
            </S.Item>
          );
        })}
      </S.StatisticList>
      <CategoryBottomSheet
        isOpen={isSheetOpen}
        title={activeSheetList.label}
        titleColor={activeSheetList.color}
        list={activeSheetList.list}
        onClose={onCloseSheet}
      />
    </>
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
