import React, { ChangeEvent, useCallback, useReducer } from 'react';
import { useHistory } from 'react-router';

import RegularFormModalList from '@components/regularExpenditure/save/RegularFormModalList';
import ExpenditureTabs from '@components/regularExpenditure/save/ExpenditureTabs';
import RegularInputForm from '@components/regularExpenditure/save/RegularInputForm';
import BottomButton from '@components/common/BottomButton';

import useFetch from '@support/hooks/useFetch';
import { useToast } from '@support/hooks/useToast';
import { API_URL, saveRegularExpenditure } from '@support/api/regularExpenditureApi';
import useRequest from '@support/hooks/useRequest';
import RegularExpenditureList from '../../../../recoils/regularExpenditure/RegularExpenditureList';

import { IBottomMenu } from '@models/component/IBottomMenu';
import reducer from './reducer';
import useRecoilTrigger from '@support/hooks/useRecoilTrigger';

/**
 * 자동 이체 생성 컨테이너
 * @component
 */

function SaveRegularExpenditureContainer() {
  const onToast = useToast();
  const history = useHistory();
  const onRefresh = useRecoilTrigger(RegularExpenditureList.atoms.regularExpenditureApiListTriggerState);
  const [onSaveRequest, saveLoading] = useRequest(saveRegularExpenditure);
  const [expenditureTypeList] = useFetch<IBottomMenu[]>(API_URL.GET_EXPENDITURE_TYPE_LIST, {
    initData: []
  });

  const [state, dispatch] = useReducer(reducer, {
    openModalName: '',
    form: {
      title: '',
      regularDate: 0,
      amount: 0,
      isAutoExpenditure: false,
      expenditureType: ''
    }
  });

  // 모달 열기
  const onOpenModal = (e: ChangeEvent<HTMLDivElement>) => {
    dispatch({ type: 'OPEN_MODAL', payload: e.currentTarget.dataset.type || '' });
  };

  // 모달 닫기
  const onCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  // 모달 완료 이벤트
  const onCompleteModal = (type: string, value: string | number) => {
    onChangeSaveForm(type, value);
    onCloseModal();
  };

  const onSaveClick = () => {
    onSaveRequest({
      params: state.form,
      onSuccess: () => {
        onToast('성공적으로 등록되었습니다. :)');
        onRefresh();
        history.push('/regular-expenditure');
      },
      onError: () => {
        onToast('다시 시도해 주세요.');
      }
    });
  };
  // 저장 폼 변경 이벤트
  const onChangeSaveForm = useCallback(
    (type: string, value: string | number | boolean) => {
      dispatch({ type: 'SET_SAVE_FORM', payload: { type, value } });
    },
    [dispatch]
  );

  // 저장 폼 인풋 초기화
  const onClearSaveForm = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const payload = e.currentTarget.dataset.type || '';
      dispatch({ type: 'RESET_SAVE_FORM', payload });
    },
    [dispatch]
  );

  // 인풋 이벤트 변경
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChangeSaveForm(name, value);
  };

  const {
    openModalName,
    form: { title, amount, regularDate, isAutoExpenditure, expenditureType }
  } = state;

  const selectExpenditureType = expenditureTypeList.find((m) => m.type === expenditureType);
  // 저장 버튼 활성화 유효성 검사
  const isValidSaveForm = title.length > 0 && amount > 0 && regularDate > 0 && expenditureType.length > 0;

  return (
    <>
      <RegularInputForm
        title={title}
        expenditureType={selectExpenditureType ? selectExpenditureType.value : ''}
        regularDate={regularDate}
        amount={amount}
        onInputChange={onInputChange}
        onClearForm={onClearSaveForm}
        onOpenModal={onOpenModal}
      />
      <ExpenditureTabs isAutoExpenditure={isAutoExpenditure} onChangeSaveForm={onChangeSaveForm} />
      <RegularFormModalList
        amount={amount}
        openModalName={openModalName}
        regularDate={regularDate}
        expenditureType={expenditureType}
        expenditureTypeMenus={expenditureTypeList || []}
        onCloseModal={onCloseModal}
        onCompleteModal={onCompleteModal}
      />
      <BottomButton isShow message='만들기' active={isValidSaveForm} loading={saveLoading} onClick={onSaveClick} />
    </>
  );
}

export default SaveRegularExpenditureContainer;
