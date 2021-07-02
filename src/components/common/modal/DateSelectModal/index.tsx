import React from 'react';

import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import { IBottomMenu } from '@models/component/IBottomMenu';

export interface DateSelectModalProps {
  title: string;
  selectDate: number;
  visible: boolean;
  oncloseModal: () => void;
  onSelectDate: (date: number) => void;
}

const dateMenus: IBottomMenu[] = [...Array(30)].map((_, key) => {
  return { type: String(key + 1), value: `${key + 1}일` };
});

function DateSelectModal({ title, visible, selectDate, oncloseModal, onSelectDate }: DateSelectModalProps) {
  const selectMenu =
    selectDate === 0 ? { type: '', value: '' } : { type: String(selectDate), value: `${selectDate}일` };

  const onSelectDateClick = (date: string) => {
    onSelectDate(Number(date));
  };

  return (
    <BottomMenuModal
      title={title}
      activeMenuType={selectMenu.type}
      menus={dateMenus}
      visible={visible}
      oncloseModal={oncloseModal}
      onEditClick={onSelectDateClick}
    />
  );
}

export default DateSelectModal;
