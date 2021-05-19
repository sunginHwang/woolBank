import React from 'react';
import { useHistory } from 'react-router';

import BottomButton from '@components/common/BottomButton';
import SaveForm from '@components/accountBook/regularExpenditure/SaveRegularExpenditureForm/SaveForm';

import useInputs from '@support/hooks/UseInputs';
import { useToast } from '@support/hooks/useToast';
import useRequest from '@support/hooks/useRequest';
import useOpenModal from '@support/hooks/useOpenModal';
import { saveRegularExpenditure } from '@support/api/regularExpenditureApi';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { IRegularExpenditureForm } from '@models/regularExpenditre/IRegularExpenditureForm';

import options from './options';

const { initForm } = options;

/**
 * 자동 이체 생성 폼
 * @component
 */

function SaveRegularExpenditureForm() {
  const onToast = useToast();
  const history = useHistory();
  const { openModalName, onCloseModal, setModalWithType } = useOpenModal('');
  const {
    inputs: formData,
    setInput,
    onChange: onInputChange,
    onClear,
  } = useInputs<IRegularExpenditureForm>(initForm);
  const [ onSaveRequest, saveLoading ] = useRequest(saveRegularExpenditure);

  // 모달 완료 이벤트
  const onCompleteModal = (type: string, value: string | number | IAccountBookCategory) => {
    onChangeSaveForm(type, value);
    onCloseModal();
  };

  // 저장 폼 변경 이벤트
  const onChangeSaveForm = (type: string, value: string | number | boolean | IAccountBookCategory) => {
    setInput(type, value);
  };

  const onSaveClick = () => {
    onSaveRequest({
      params: formData,
      onSuccess: () => {
        onToast('성공적으로 등록되었습니다. :)');
        history.push('/regular-expenditure');
      },
      onError: () => {
        onToast('다시 시도해 주세요.');
      }
    });
  };

  const { title, amount, regularDate, isAutoExpenditure, category } = formData;

  // 저장 버튼 활성화 유효성 검사
  const isValidSaveForm = title.length > 0 && amount > 0 && regularDate > 0 && category.id > 0;

  const onModalEvent = { openModalName, onCloseModal, onCompleteModal, onInputClick: setModalWithType };
  const onInputEvent = { onInputChange, onClear };
  return (
    <>
      <SaveForm>
        <SaveForm.Title
          title={title}
          { ...onInputEvent }
        />
        <SaveForm.RegularDate
          regularDate={regularDate}
          { ...onInputEvent }
          { ...onModalEvent }
        />
        <SaveForm.Amount
          amount={amount}
          { ...onInputEvent }
          { ...onModalEvent }
        />
        <SaveForm.Category
          category={category}
          { ...onInputEvent }
          { ...onModalEvent }
        />
        <SaveForm.AutoExpenditure
          isAutoExpenditure={isAutoExpenditure}
          onChangeSaveForm={onChangeSaveForm}
        />
      </SaveForm>
      <BottomButton isShow message='만들기' active={isValidSaveForm} loading={saveLoading} onClick={onSaveClick} />
    </>
  );
}

export default SaveRegularExpenditureForm;
