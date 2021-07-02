import React from 'react';
import DropdownTitle from '@components/common/DropdownTitle';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import { IBottomMenu } from '@models/component/IBottomMenu';
import { DateRangeType } from '@models/date/DateRangeType';
import { useToggle } from '@support/hooks/useToggle';

const pickerOptionTabs: IBottomMenu<DateRangeType>[] = [
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

interface IProps {
  activeDateRange: DateRangeType;
  onDateRangeChange: (dateRange: DateRangeType) => void;
}

/**
 * 가계부 통계 상단 - 통계 범위 설정
 * @component
 */

function DateRange({ activeDateRange, onDateRangeChange }: IProps) {
  const [isOpenPicker, onPicker, offPicker] = useToggle(false);

  const onPickerClick = (menuType: string) => {
    const activeMenu = getActivePicker(menuType as DateRangeType);

    if (!activeMenu) {
      return;
    }
    offPicker();
    onDateRangeChange(activeMenu.type);
  };

  const activePicker = getActivePicker(activeDateRange);
  return (
    <>
      <DropdownTitle onClick={onPicker} title={`${activePicker?.value} 통계`} />
      <BottomMenuModal
        title='통계 범위 선택'
        menus={pickerOptionTabs}
        activeMenuType={activePicker?.type}
        visible={isOpenPicker}
        oncloseModal={offPicker}
        onEditClick={onPickerClick}
      />
    </>
  );
}


function getActivePicker(activeType: DateRangeType) {
  const activeMenu = Object.entries(pickerOptionTabs).find(([, item]) => {
    return item.type === activeType;
  });

  if (!activeMenu) {
    return null;
  }

  return activeMenu[1];
}

export default DateRange;
