import React, { ChangeEvent, useCallback, useReducer } from 'react';

import RegularFormModalList from '@components/regularExpenditure/save/RegularFormModalList';
import ExpenditureTabs from '@components/regularExpenditure/save/ExpenditureTabs';
import RegularInputForm from '@components/regularExpenditure/save/RegularInputForm';

import { IBottomMenu } from '@models/component/IBottomMenu';
import reducer, { initialState } from './reducer';
import BottomButton from '@components/common/BottomButton';

const menus: IBottomMenu[] = [{ type: 'telephone', value: '통신/인터넷' }];

/**
 * 자동 이체 생성 컨테이너
 * @component
 */

function SaveRegularExpenditureContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    form: { title, amount, regularDate, useAutoExpenditure, expenditureType }
  } = state;

  const selectExpenditureType = menus.find((m) => m.type === expenditureType);

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
      <ExpenditureTabs useAutoExpenditure={useAutoExpenditure} onChangeSaveForm={onChangeSaveForm} />
      <RegularFormModalList
        amount={amount}
        openModalName={openModalName}
        regularDate={regularDate}
        expenditureType={expenditureType}
        expenditureTypeMenus={menus}
        onCloseModal={onCloseModal}
        onCompleteModal={onCompleteModal}
      />
      <BottomButton isShow message='만들기' active={false} />
    </>
  );
}

export default SaveRegularExpenditureContainer;
