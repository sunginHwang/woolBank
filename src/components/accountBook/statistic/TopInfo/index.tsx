import React, { useMemo, useState } from 'react';
import DropdownTitle from '@components/common/DropdownTitle';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import getFiveYearMonthList, { getMonthMenu } from '@/services/accountBook/getFiveYearMonthList';
import { useToggle } from '@support/hooks/useToggle';
import { IBottomMenu } from '@models/component/IBottomMenu';
import Label from '@components/common/Label';
import LineSeparator from '@components/common/LineSeparator';
import styled from 'styled-components';
import { getYear } from 'date-fns';

type PickerType = 'month' | 'week' | 'year';

const pickerOptionTabs: IBottomMenu<PickerType>[] = [
  {
    type: 'month',
    value: '월별'
  },
  {
    type: 'year',
    value: '연도별'
  },
  {
    type: 'week',
    value: '주별'
  }
];

/**
 * 가계부 통계 - 팝 영역
 * @component
 */

function TopInfo() {
  const [picker, setPicker] = useState(pickerOptionTabs[0]);
  const [isOpenPicker, onPicker, offPicker] = useToggle(false);

  const [isOpen, onOpen, offOpen] = useToggle(false);

  const fiveYearMonthList = useMemo(() => getFiveYearMonthList(), []);
  const tenYearList = useMemo(() => get10YearList(), []);
  const now = new Date();

  const onMonthClick = (menuType: string) => {
    console.log(menuType);
  };

  const onPickerClick = (menuType: string) => {
    const activeMenu = Object.entries(pickerOptionTabs).find(([, item]) => {
      return item.type === menuType;
    });

    if (!activeMenu) {
      return;
    }
    setPicker(activeMenu[1]);
    offPicker();
  };

  const activeMonthMenu = getMonthMenu(now);

  return (
    <>
      <DropdownTitle onClick={onPicker} title={`${picker.value} 통계`} />
      <S.DateLabel onClick={onOpen}>
        <Label text='2019-02-03' />
      </S.DateLabel>
      <LineSeparator />
      <BottomMenuModal
        title='통계 범위 선택'
        menus={pickerOptionTabs}
        activeMenu={picker}
        visible={isOpenPicker}
        oncloseModal={offPicker}
        onEditClick={onPickerClick}
      />
      <BottomMenuModal
        title='월 선택하기'
        menus={fiveYearMonthList}
        activeMenu={activeMonthMenu}
        visible={isOpen && picker.type === 'month'}
        oncloseModal={offOpen}
        onEditClick={onMonthClick}
      />
      <BottomMenuModal
        title='년도 선택하기'
        menus={tenYearList}
        activeMenu={activeMonthMenu}
        visible={isOpen && picker.type === 'year'}
        oncloseModal={offOpen}
        onEditClick={onMonthClick}
      />
    </>
  );
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

const S: {
  DateLabel: any;
} = {
  DateLabel: styled.div`
    margin: 2rem 0;
  `
};

export default TopInfo;
