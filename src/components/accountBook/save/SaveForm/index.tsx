import React from 'react';

import Form from '@components/atoms/Form';
import BaseInput from '@components/common/BaseInput';
import ToggleTab from '@components/common/ToggleTab';
import BottomButton from '@components/common/BottomButton';
import NumberInputModal from '@components/common/modal/NumbetInputModal';
import CategorySelectBox from '@components/accountBook/save/CategorySelectBox';

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
  type: 'expenditure',
  memo: '',
}

 /**
 * 가계부 지출 / 수입 작성 폼
 * @component
 */

function SaveForm() {
  const { openModalName, setModalWithType, onCloseModal }  = useOpenModal();
  const {
    inputs: formData,
    onChange,
    setInput,
    onClear
  } = useInputs<IAccountBookSaveForm>(initForm);

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
  };

   const isActiveSendButton = isValidForm(formData);
   const { title, type, amount, category, memo } = formData;

   return (
    <Form>
      <ToggleTab
        tabs={tabs}
        activeTab={type === 'income' ? incomeTab : expenditureTab}
        onChangeTab={setType}
      />
      <BaseInput
        name='title'
        label='제목'
        placeHolder='제목을 입력해주세요.'
        max={20}
        value={title}
        onChange={onChange}
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
      <BaseInput
        disable
        dataType='category'
        label='카테고리'
        placeHolder='카테고리를 선택해 주세요.'
        value={category.name}
        onClick={setModalWithType}
        onClear={onClear}
      />
      <BaseInput
        disable
        dataType='amount'
        label='금액'
        placeHolder='지출 금액을 작성해 주세요.'
        value={amount === 0 ? '' : `${addComma(amount)}원`}
        onClick={setModalWithType}
        onClear={onClear}
      />
      <>
        <CategorySelectBox
          open={openModalName === 'category'}
          type='expenditure'
          onClose={onCloseModal}
          selectCategoryId={category.id}
          onCategorySelect={setCategory}
        />
        <NumberInputModal
          visible={openModalName === 'amount'}
          currentAmount={amount}
          oncloseModal={onCloseModal}
          onComplete={setAmount}
        />
      </>
      <BottomButton
        isShow
        message='가계부 내역 추가'
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
