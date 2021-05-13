import React, { useEffect } from 'react';
import { format } from 'date-fns';
import Form from '@components/atoms/Form';
import BaseInput from '@components/common/BaseInput';
import ToggleTab from '@components/common/ToggleTab';
import BottomButton from '@components/common/BottomButton';
import NumberInputModal from '@components/common/modal/NumbetInputModal';
import CategorySelectBox from '@components/accountBook/save/CategorySelectBox';
import DateTimePickerModal from '@components/common/modal/DateTimePickerModal';

import { IAssetType } from '@models/IAssetType';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import useOpenModal from '@support/hooks/useOpenModal';
import useInputs from '@support/hooks/UseInputs';
import { addComma } from '@support/util/String';

import options from './options';

const { incomeTab, expenditureTab, tabs } = options;

interface IAccountBookSaveForm {
  title: string;
  amount: number;
  memo: string;
  dateTime: Date;
  category: IAccountBookCategory;
  type: AccountBookCategoryType;
}

const initForm: IAccountBookSaveForm = {
  title: '',
  amount: 0,
  category: {
    id: -1,
    name: '',
    type: 'income',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  dateTime: new Date(),
  type: 'expenditure',
  memo: '',
}

 /**
 * 가계부 지출 / 수입 작성 폼
 * @component
 */

function SaveForm() {
  const { openModalName, setModalWithType, setModal, onCloseModal }  = useOpenModal();

  const {
    inputs: formData,
    onChange,
    setInput,
    onClear
  } = useInputs<IAccountBookSaveForm>(initForm);

  // 폼입력시 금액 설정 input 나오도록
  useEffect(() => {
    setModal('amount');
  }, []);

  const setCategory = (accountBookCategory: IAccountBookCategory) => {
    setInput<IAccountBookCategory>('category', accountBookCategory);
    onCloseModal();
  }

   const setAmount = (amount: number) => {
     setInput<number>('amount', amount);
     onCloseModal();
   }

  const setType = (tab: IAssetType) => {
    setInput<string>('type', tab.type);
    // 타입 변경시 카테고리 초기화 필요
    setInput<IAccountBookCategory>('category', {...initForm.category});
  };

   const setDateTime = (date: Date) => {
     setInput<Date>('dateTime', date);
   };

   const isActiveSendButton = isValidForm(formData);
   const { title, type, amount, category, memo } = formData;

   const typeMsg = type === 'income' ? '수입' : '지출'

   return (
    <Form>
      <ToggleTab
        tabs={tabs}
        activeTab={type === 'income' ? incomeTab : expenditureTab}
        onChangeTab={setType}
      />
      <BaseInput
        disable
        dataType='amount'
        label={`* ${typeMsg}금액`}
        placeHolder={`${typeMsg}금액을 입력해 주세요.`}
        value={amount === 0 ? '' : `${addComma(amount)}원`}
        onClick={setModalWithType}
        onClear={onClear}
      />
      <BaseInput
        name='title'
        label={`* ${typeMsg}처`}
        placeHolder={`${typeMsg}처를 선택해 주세요.`}
        max={20}
        value={title}
        onChange={onChange}
        onClear={onClear}
      />
      <BaseInput
        disable
        dataType='dateTime'
        label={`* ${typeMsg}일시`}
        placeHolder={`${typeMsg}일시를 선택해 주세요.`}
        value={format(formData.dateTime, 'yyyy-MM-dd HH:mm')}
        onClick={setModalWithType}
        onClear={onClear}
      />
      <BaseInput
        disable
        dataType='category'
        label={`* ${typeMsg}카테고리`}
        placeHolder={`${typeMsg} 카테고리를 선택해 주세요.`}
        value={category.name}
        onClick={setModalWithType}
        onClear={onClear}
      />
      <BaseInput
        name='memo'
        label='메모'
        placeHolder='메모를 입력해주세요.'
        max={20}
        value={memo}
        onChange={onChange}
        onClear={onClear}
      />
      <>
        <DateTimePickerModal
          visible={openModalName === 'dateTime'}
          oncloseModal={onCloseModal}
          onChangeDateTime={setDateTime}
          date={new Date()}
        />
        <CategorySelectBox
          open={openModalName === 'category'}
          type={type}
          onClose={onCloseModal}
          selectCategoryId={category.id}
          onCategorySelect={setCategory}
        />
        <NumberInputModal
          title={`* ${typeMsg}금액`}
          visible={openModalName === 'amount'}
          currentAmount={amount}
          oncloseModal={onCloseModal}
          onComplete={setAmount}
        />
      </>
      <BottomButton
        isShow
        message='추가하기'
        active={isActiveSendButton}
      />
    </Form>
  );
}

function isValidForm(form: IAccountBookSaveForm) {
  const { title, type, amount, category } = form;

  // 메모뺴고는 전부 작성되어있어야 한다.
  return title.length > 0 && type.length > 0 && amount > 0 && category.id > 0;
}

export default SaveForm;
