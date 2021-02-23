import React, { useCallback } from 'react';
import NumberInputModal from '@components/common/modal/NumbetInputModal';
import DateSelectModal from '@components/common/modal/DateSelectModal';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import { IBottomMenu } from '@models/component/IBottomMenu';

interface RegularFormModalListProps {
  openModalName: string;
  amount: number;
  regularDate: number;
  expenditureType: string;
  expenditureTypeMenus: IBottomMenu[];
  onCloseModal: () => void;
  onCompleteModal: (type: string, value: string | number) => void;
}
function RegularFormModalList({
  openModalName,
  amount,
  regularDate,
  expenditureType,
  expenditureTypeMenus,
  onCompleteModal,
  onCloseModal
}: RegularFormModalListProps) {
  // 정기 지출액 변경 이벤트
  const onChangeAmount = useCallback(
    (amount: number) => {
      onCompleteModal('amount', amount);
    },
    [onCompleteModal]
  );

  // 정기 지출 일자 선택 이벤트
  const onSelectRegularDate = useCallback(
    (date: number) => {
      onCompleteModal('regularDate', date);
    },
    [onCompleteModal]
  );

  // 지출 타입 선택 이벤트
  const onSelectExpenditureType = useCallback(
    (type: string) => {
      onCompleteModal('expenditureType', type);
    },
    [onCompleteModal]
  );

  const selectExpenditureType = expenditureTypeMenus.find((m) => m.type === expenditureType);

  return (
    <>
      <NumberInputModal
        visible={openModalName === 'amount'}
        currentAmount={amount}
        oncloseModal={onCloseModal}
        onComplete={onChangeAmount}
      />
      <DateSelectModal
        title='정기지출일'
        visible={openModalName === 'regularDate'}
        selectDate={regularDate}
        oncloseModal={onCloseModal}
        onSelectDate={onSelectRegularDate}
      />
      <BottomMenuModal
        title='지출 타입'
        visible={openModalName === 'expenditureType'}
        activeMenu={selectExpenditureType}
        menus={expenditureTypeMenus}
        oncloseModal={onCloseModal}
        onEditClick={onSelectExpenditureType}
      />
    </>
  );
}

export default RegularFormModalList;
