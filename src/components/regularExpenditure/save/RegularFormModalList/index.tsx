import React, { useCallback } from 'react';

import NumberInputModal from '@components/common/modal/NumbetInputModal';
import DateSelectModal from '@components/common/modal/DateSelectModal';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import { IBottomMenu } from '@models/component/IBottomMenu';

interface RegularFormModalListProps {
  // 열리는 모달 이름
  openModalName: string;
  // 지출 금액
  amount: number;
  // 정기 지출 일자
  regularDate: number;
  // 자동 이체 종류
  expenditureType: string;
  // 자동 이체 종류 메뉴 리스트
  expenditureTypeMenus: IBottomMenu[];
  // 모달 닫기
  onCloseModal: () => void;
  // 모달 선택 완료
  onCompleteModal: (type: string, value: string | number) => void;
}

/**
 * 정기 지출 입력 모달 박스 리스트
 * @component
 */

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
