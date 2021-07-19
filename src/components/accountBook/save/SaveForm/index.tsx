import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { format } from 'date-fns';
import styled from 'styled-components';

import Form from '@components/atoms/Form';
import BaseInput from '@components/common/BaseInput';
import ToggleTab from '@components/common/ToggleTab';
import BaseButton from '@components/common/BaseButton';
import IcoTrashCan from '@components/icon/IcoTrashCan';
import { useConfirm } from '@components/common/Confirm/ConfirmService';
import SelectModalList from '@components/accountBook/save/SaveForm/SelectModalList';
import { IAssetType } from '@models/IAssetType';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { IAccountBookSaveForm } from '@models/accountBook/IAccountBookSaveForm';
import { addComma } from '@support/util/String';
import useInputs from '@support/hooks/UseInputs';
import { useToast } from '@support/hooks/useToast';
import useOpenModal from '@support/hooks/useOpenModal';
import useUpdateEffect from '@support/hooks/useUpdateEffect';
import { addAccountBook } from '@support/api/accountBookApi';
import getCategoryMsg from '@support/util/accountBook/getCategoryMsg';
import options from './options';

const { incomeTab, expenditureTab, tabs, initForm } = options;

interface IProps {
  isInsertMode: boolean;
  onFormSubmit: (formData: IAccountBookSaveForm) => void;
  onRemove?: () => void;
  saveForm?: IAccountBookSaveForm;
}

/**
 * 가계부 지출 / 수입 작성 or 수정 폼
 * @component
 */

function SaveForm({ isInsertMode, onRemove, onFormSubmit, saveForm = initForm }: IProps) {
  const onToast = useToast();
  const { openConfirm } = useConfirm();
  const { openModalName, setModalWithType, setModal, onCloseModal } = useOpenModal();
  const { inputs: formData, onChange, setInput, onClear, setInputs } = useInputs<IAccountBookSaveForm>(saveForm);
  const addAccountBookMutation = useMutation(addAccountBook);

  // 폼입력시 금액 설정 input 나오도록
  useEffect(() => {
    if (isInsertMode) {
      setModal('amount');
    }
  }, []);

  useUpdateEffect(() => {
    setInputs(saveForm);
  }, [saveForm]);

  const onSubmitClick= () => {
    if (formData.title.length > 20) {
      const typeMsg = getCategoryMsg(type);
      onToast(`${typeMsg}명은 20글자 까지 작성 가능합니다.`);
      return;
    }

    onFormSubmit(formData);
  };

  const onRemoveClick = async () => {
    const isConfirm = await openConfirm({ message: '정말 삭제 하시겠습니까?' });

    if (isConfirm) {
      onRemove?.();
    }
  };

  const setCategory = (accountBookCategory: IAccountBookCategory) => {
    setInput<IAccountBookCategory>('category', accountBookCategory);
    onCloseModal();
  };

  const setAmount = (amount: number) => {
    setInput<number>('amount', amount);
    onCloseModal();
  };

  const setType = (tab: IAssetType) => {
    setInput<string>('type', tab.type);
    // 타입 변경시 카테고리 초기화 필요
    setInput<IAccountBookCategory>('category', { ...initForm.category });
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
        <ToggleTab tabs={tabs} activeTab={type === 'income' ? incomeTab : expenditureTab} onChangeTab={setType} />
        <BaseInput
          disable
          dataType='amount'
          isShowCloseBtn={isInsertMode}
          label={`* ${typeMsg}금액`}
          placeHolder={`${typeMsg}금액을 입력해 주세요.`}
          value={amount === 0 ? '' : `${addComma(amount)}원`}
          onClick={setModalWithType}
          onClear={onClear}
        />
        <BaseInput
          name='title'
          isShowCloseBtn={isInsertMode}
          label={`* ${typeMsg}처`}
          placeHolder={`${typeMsg}처를 선택해 주세요.`}
          max={20}
          value={title}
          onChange={onChange}
          onClear={onClear}
        />
        <BaseInput
          disable
          isShowCloseBtn={isInsertMode}
          dataType='registerDateTime'
          label={`* ${typeMsg}일시`}
          placeHolder={`${typeMsg}일시를 선택해 주세요.`}
          value={format(formData.registerDateTime, 'yyyy-MM-dd HH:mm')}
          onClick={setModalWithType}
          onClear={onClear}
        />
        <BaseInput
          disable
          isShowCloseBtn={isInsertMode}
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
          isShowCloseBtn={isInsertMode}
          value={memo}
          onChange={onChange}
          onClear={onClear}
        />
        <S.ButtonArea>
          <S.CloseButton onClick={onRemoveClick}>
            <IcoTrashCan />
          </S.CloseButton>
          <BaseButton
            message={isInsertMode ? '작성하기' : '수정하기'}
            size='full'
            color='red'
            loading={addAccountBookMutation.isLoading}
            onClick={onSubmitClick}
            active={isActiveSendButton}
          />
        </S.ButtonArea>
      </Form>
      <SelectModalList
        openModalName={openModalName}
        formData={formData}
        onCloseModal={onCloseModal}
        onChangeAmount={setAmount}
        onChangeCategory={setCategory}
        onChangeDateTime={setRegisterDateTime}
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

const S = {
  ButtonArea: styled.div`
    margin-top: 5rem;
    padding-bottom: 5rem;
    display: flex;
  `,
  CloseButton: styled.button`
    width: 7rem;
    border-radius: .8rem;
    margin-right: 2rem;
    border: .1rem solid ${({ theme }) => theme.colors.greyL6};
  `
};
