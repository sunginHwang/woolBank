import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { format } from 'date-fns';

import Form from '@components/atoms/Form';
import BaseInput from '@components/common/BaseInput';
import ToggleTab from '@components/common/ToggleTab';
import BottomButton from '@components/common/BottomButton';
import SelectModalList from '@components/accountBook/save/SaveForm/SelectModalList';
import { IAssetType } from '@models/IAssetType';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import useOpenModal from '@support/hooks/useOpenModal';
import useInputs from '@support/hooks/UseInputs';
import { addComma } from '@support/util/String';
import getCategoryMsg from '@support/util/accountBook/getCategoryMsg';
import { addAccountBook } from '@support/api/accountBookApi';
import { useToast } from '@support/hooks/useToast';
import accountBookState from '@/recoils/accountBook';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import { QUERY_KEY } from '@/services/accountBook/useAccountBookList';
import options from './options';

const { incomeTab, expenditureTab, tabs, initForm } = options;


 /**
 * 가계부 지출 / 수입 작성 폼
 * @component
 */

function SaveForm() {
  const { openModalName, setModalWithType, setModal, onCloseModal }  = useOpenModal();
  const history = useHistory();
  const onToast = useToast();
  const {
    inputs: formData,
    onChange,
    setInput,
    onClear
  } = useInputs<IAccountBookSaveForm>(initForm);
  const addAccountBookMutation = useMutation(addAccountBook);
  const accountBookListDate = useRecoilValue(accountBookState.atoms.listDateState)
  const queryClient = useQueryClient();

  // 폼입력시 금액 설정 input 나오도록
  useEffect(() => {
    setModal('amount');
  }, []);

  const onSubmitAccountBook = () => {
    if(formData.title.length > 20) {
      const typeMsg = getCategoryMsg(type);
      onToast(`${typeMsg}명은 20글자 까지 작성 가능합니다.`);
      return;
    }

    addAccountBookMutation
      .mutate(formData, {
        onSuccess: (accountBook: IAccountBookListItem) => {
          const registerDateMonth = format(accountBook.registerDateTime, 'yyyy-MM');
          if (registerDateMonth === accountBookListDate) {
            queryClient.setQueryData<IAccountBookListItem[]>(QUERY_KEY, (prev = []) => [...prev, accountBook]);
          }
          history.goBack();
        },
        onError: () => onToast('다시 시도해 주세요.'),
      });
  };

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

   const setRegisterDateTime = (date: Date) => {
     setInput<Date>('registerDateTime', date);
   };

   const isActiveSendButton = isValidForm(formData);
   const { title, type, amount, category, memo } = formData;

   const typeMsg = getCategoryMsg(type);

   return (
    <>
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
          dataType='registerDateTime'
          label={`* ${typeMsg}일시`}
          placeHolder={`${typeMsg}일시를 선택해 주세요.`}
          value={format(formData.registerDateTime, 'yyyy-MM-dd HH:mm')}
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
      </Form>
      <SelectModalList
        openModalName={openModalName}
        formData={formData}
        onCloseModal={onCloseModal}
        onChangeAmount={setAmount}
        onChangeCategory={setCategory}
        onChangeDateTime={setRegisterDateTime}
      />
      <BottomButton
        isShow
        loading={addAccountBookMutation.isLoading}
        message='추가하기'
        active={isActiveSendButton}
        onClick={onSubmitAccountBook}
      />
    </>
  );
}

function isValidForm(form: IAccountBookSaveForm) {
  const { title, type, amount, category } = form;

  // 메모뺴고는 전부 작성되어있어야 한다.
  return title.length > 0 && type.length > 0 && amount > 0 && category.id > 0;
}

export default SaveForm;
