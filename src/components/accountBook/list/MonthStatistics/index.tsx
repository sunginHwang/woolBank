import React, { useMemo } from 'react';
import styled from 'styled-components';
import { format, addMonths, isSameYear, isSameMonth } from 'date-fns';
import { addComma } from '@support/util/String';
import LineSeparator from '@components/common/LineSeparator';
import IcoChevronDown from '@components/icon/IcoChevronDown';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import { useToggle } from '@support/hooks/useToggle';
import options from './options';
import { IBottomMenu } from '@models/component/IBottomMenu';

const { month5Years } = options;
const now = new Date();

interface IProps {
  selectedDate: Date;
  changeSelectedDate: (date: Date) => void;
}

/**
 * 이달의 가계부 통계 영역
 * @component
 */

function MonthStatistics(props: IProps) {
  const { selectedDate, changeSelectedDate } = props;

  const [isOpenMonthPicker, openMonthPicker, closeMonthPicker] = useToggle(false);

  const FiveYearMonthList: IBottomMenu[] = useMemo(() => {
    return [...Array(month5Years)].map((_, index) => getMonthMenu(addMonths(now, -index)));
  }, []);

  const onMonthClick = (month: string) => {
    changeSelectedDate(new Date(month));
    closeMonthPicker();
  };

  const titleMsg = useMemo(() => getTitleMsg(selectedDate), [selectedDate]);
  const monthLabelPrefix = useMemo(() => getMonthLabelPrefix(selectedDate), [selectedDate]);
  const activeMonthMenu = getMonthMenu(selectedDate);

  return (
    <>
      <div>
        <S.Title onClick={openMonthPicker}>
          <p>{titleMsg}</p>
          <IcoChevronDown width={30} height={30} />
        </S.Title>
        <S.TotalSection>
          <label>{monthLabelPrefix}</label>
          <S.Expenditure>지출 : {addComma(1213131)}원</S.Expenditure>
          <p>
            <span>수입 : </span>
            {addComma(1213131)}원
          </p>
        </S.TotalSection>
        <LineSeparator />
      </div>
      <BottomMenuModal
        title='월 선택하기'
        menus={FiveYearMonthList}
        activeMenu={activeMonthMenu}
        visible={isOpenMonthPicker}
        oncloseModal={closeMonthPicker}
        onEditClick={onMonthClick}
      />
    </>
  );
}

function getMonthMenu(month: Date) {
  return {
    type: month.toString(),
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
  Title: any;
  TotalSection: any;
  Expenditure: any;
} = {
  Title: styled.h2`
    display: flex;
    align-items: center;

    > p {
      font-size: 2rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.blackL1};
      margin-right: 0.5rem;
    }
  `,
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
