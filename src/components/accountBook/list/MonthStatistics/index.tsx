import React, { useMemo } from 'react';
import styled from 'styled-components';
import { format, addMonths, isSameYear, isSameMonth } from 'date-fns';

import LineSeparator from '@components/common/LineSeparator';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import DropdownTitle from '@components/common/DropdownTitle';
import { addComma } from '@support/util/String';
import { useToggle } from '@support/hooks/useToggle';
import { IBottomMenu } from '@models/component/IBottomMenu';
import options from './options';

const { month5Years } = options;
const now = new Date();

interface IProps {
  selectedDate: Date;
  changeSelectedDate: (date: string) => void;
  totalIncomeAmount: number;
  totalExpenditureAmount: number;
}

/**
 * 이달의 가계부 통계 영역
 * @component
 */

function MonthStatistics(props: IProps) {
  const { selectedDate, changeSelectedDate, totalIncomeAmount, totalExpenditureAmount } = props;

  const [isOpenMonthPicker, openMonthPicker, closeMonthPicker] = useToggle(false);

  const FiveYearMonthList: IBottomMenu[] = useMemo(() => {
    return [...Array(month5Years)].map((_, index) => getMonthMenu(addMonths(now, -index)));
  }, []);

  const onMonthClick = (month: string) => {
    changeSelectedDate(month);
    closeMonthPicker();
  };

  const titleMsg = useMemo(() => getTitleMsg(selectedDate), [selectedDate]);
  const monthLabelPrefix = useMemo(() => getMonthLabelPrefix(selectedDate), [selectedDate]);
  const activeMonthMenu = getMonthMenu(selectedDate);

  return (
    <>
      <div>
        <DropdownTitle title={titleMsg} onClick={openMonthPicker} />
        <S.TotalSection>
          <label>{monthLabelPrefix}</label>
          <S.Expenditure>지출 : {addComma(totalExpenditureAmount)}원</S.Expenditure>
          <p>
            <span>수입 : </span>
            {addComma(totalIncomeAmount)}원
          </p>
        </S.TotalSection>
        <LineSeparator />
      </div>
      <BottomMenuModal
        title='월 선택하기'
        menus={FiveYearMonthList}
        activeMenuType={activeMonthMenu.type}
        visible={isOpenMonthPicker}
        oncloseModal={closeMonthPicker}
        onEditClick={onMonthClick}
      />
    </>
  );
}

function getMonthMenu(month: Date) {
  return {
    type: format(month, 'yyyy-MM'),
    value: format(month, 'yyyy년 M월')
  };
}

function getTitleMsg(selectedDate: Date) {
  const subFix = '소비 내역';

  return isSameYear(now, selectedDate)
    ? `${format(selectedDate, 'M월')} ${subFix}`
    : `${format(selectedDate, 'yyyy년 M월')} ${subFix}`;
}

function getMonthLabelPrefix(selectedDate: Date) {
  const isCurrentYearOfMonth = isSameMonth(now, selectedDate) && isSameYear(now, selectedDate);
  const subFix = '지출 / 수입 내역';
  return isCurrentYearOfMonth ? `오늘까지 ${subFix}` : `${format(selectedDate, 'M월')} ${subFix}`;
}

const S: {
  TotalSection: any;
  Expenditure: any;
} = {
  TotalSection: styled.section`
    margin-top: 2rem;

    > label {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.greyD2};
      margin-bottom: 1.5rem;
    }

    p {
      margin-top: 0.5rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.greyD3};

      > span {
        color: ${({ theme }) => theme.colors.greyD3};
      }
    }
  `,
  Expenditure: styled.p`
    color: ${({ theme }) => theme.colors.redL1} !important;
  `
};

export default MonthStatistics;
