import React from 'react';

import DateTimePickerModal from '@components/common/modal/DateTimePickerModal';
import CategorySelectBox from '@components/accountBook/save/CategorySelectBox';
import NumberInputModal from '@components/common/modal/NumbetInputModal';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';


interface IProps {
  openModalName: string;
  formData: IAccountBookSaveForm;
  onCloseModal: () => void;
  onChangeAmount: (amount: number) => void;
  onChangeCategory: (category: IAccountBookCategory) => void;
  onChangeDateTime: (date: Date) => void;
}
/**
 * 가계부 지출 / 수입 작성 폼 선택 모달 리스트
 * @component
 */

function SelectModalList(props: IProps) {
  const { openModalName, onCloseModal, onChangeDateTime, onChangeAmount, onChangeCategory, formData } = props;

  return (
    <>
      <DateTimePickerModal
        visible={openModalName === 'dateTime'}
        oncloseModal={onCloseModal}
        onChangeDateTime={onChangeDateTime}
        date={formData.registerDateTime}
      />
      <CategorySelectBox
        open={openModalName === 'category'}
        type={formData.type}
        onClose={onCloseModal}
        selectCategoryId={formData.category.id}
        onCategorySelect={onChangeCategory}
      />
      <NumberInputModal
        title='금액 입력'
        visible={openModalName === 'amount'}
        currentAmount={formData.amount}
        oncloseModal={onCloseModal}
        onComplete={onChangeAmount}
      />
    </>
  )
}

export default SelectModalList;
