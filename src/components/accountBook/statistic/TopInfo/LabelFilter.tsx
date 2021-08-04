import React, { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { format, getYear } from 'date-fns';

import Label from '@components/atoms/Label';
import DateModal from '@components/common/modal/DateModal';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import { useToggle } from '@support/hooks/useToggle';
import getDateRange from '@/services/accountBook/getDateRange';
import getFiveYearMonthList from '@/services/accountBook/getFiveYearMonthList';
import { DateRangeType } from '@models/date/DateRangeType';
import { IBottomMenu } from '@models/component/IBottomMenu';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';

interface IProps {
  children: ReactNode;
}

/**
 * 가계부 레이블 필터
 * @component
 */

function LabelFilter({ children }: IProps) {
  return <S.DateLabel>{children}</S.DateLabel>;
}

interface IDateIProps {
  startDate: Date;
  endDate: Date;
  dateRangeType: DateRangeType;
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
}

/**
 * 가계부 레이블 필터 - 날짜 영역
 * @component
 */

function DateRange(props: IDateIProps) {
  const { startDate, endDate, dateRangeType, onDateRangeChange } = props;

  const [isOpen, onOpen, offOpen] = useToggle(false);

  const fiveYearMonthList = useMemo(() => getFiveYearMonthList(), []);
  const tenYearList = useMemo(() => get10YearList(), []);

  const onDateModalClick = (date: string) => {
    const [startDate, endDate] = getDateRange(dateRangeType, new Date(date));
    onDateRangeChange(startDate, endDate);
    offOpen();
  };

  const labelText = getLabelText(dateRangeType, startDate, endDate);
  return (
    <>
      <Label text={labelText} onClick={onOpen} />
      <BottomMenuModal
        title='월 선택하기'
        menus={fiveYearMonthList}
        activeMenuType={format(startDate, 'yyyy-MM')}
        visible={isOpen && dateRangeType === 'month'}
        oncloseModal={offOpen}
        onEditClick={onDateModalClick}
      />
      <BottomMenuModal
        title='년도 선택하기'
        menus={tenYearList}
        activeMenuType={format(startDate, 'yyyy')}
        visible={isOpen && dateRangeType === 'year'}
        oncloseModal={offOpen}
        onEditClick={onDateModalClick}
      />
      <DateModal
        visible={isOpen && dateRangeType === 'week'}
        oncloseModal={offOpen}
        onChangeDate={onDateModalClick}
        date={startDate}
      />
    </>
  );
}

function getLabelText(dateRangeType: DateRangeType, startDate: Date, endDate: Date) {
  return {
    week: `${format(startDate, 'yyyy-MM-dd')} ~ ${format(endDate, 'yyyy-MM-dd')}`,
    month: format(startDate, 'yyyy년 MM월'),
    year: format(startDate, 'yyyy년')
  }[dateRangeType];
}

function get10YearList(): IBottomMenu[] {
  const now = new Date();
  const nowYear = getYear(now);

  return [...Array(10)].map((_, key) => {
    const year = nowYear - key;
    return {
      type: String(year),
      value: `${year}년`
    };
  });
}

const categoryTypeMenus: IBottomMenu<AccountBookCategoryType>[] = [
  {
    type: 'income',
    value: '수입'
  },
  {
    type: 'expenditure',
    value: '지출'
  }
];

interface ITypeProps {
  activeType: AccountBookCategoryType;
  onTypeChange: (type: AccountBookCategoryType) => void;
}

/**
 * 가계부 레이블 필터 - 지출,소비 필터
 * @component
 */

function Type({ activeType, onTypeChange }: ITypeProps) {
  const [isOpenModal, onModal, offModal] = useToggle(false);

  const onTypeClick = (type: string) => {
    onTypeChange(type as AccountBookCategoryType);
    offModal();
  };

  const activeMenu = Object.entries(categoryTypeMenus).find(([, item]) => {
    return item.type === activeType;
  });

  return (
    <>
      <Label text={activeMenu?.[1].value || ''} onClick={onModal} />
      <BottomMenuModal
        title='통계 종류를 선택해 주세요.'
        menus={categoryTypeMenus}
        activeMenuType={activeType}
        visible={isOpenModal}
        oncloseModal={offModal}
        onEditClick={onTypeClick}
      />
    </>
  );
}

LabelFilter.DateRange = DateRange;
LabelFilter.Type = Type;

export default LabelFilter;

const S: {
  DateLabel: any;
} = {
  DateLabel: styled.div`
    margin: 2rem 0;
  `
};
