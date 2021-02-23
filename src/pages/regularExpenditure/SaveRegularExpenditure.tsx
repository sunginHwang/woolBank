import React, { ChangeEvent, useCallback, useReducer } from 'react';

import RegularFormModalList from '@components/regularExpenditure/save/RegularFormModalList';
import BaseInput from '@components/common/BaseInput';
import PageTemplate from '@components/layout/PageTemplate';

import { addComma } from '@support/util/String';
import { IBottomMenu } from '@models/component/IBottomMenu';
import ExpenditureTabs from '@components/regularExpenditure/save/ExpenditureTabs';

const menus: IBottomMenu[] = [{ type: 'telephone', value: '통신/인터넷' }];

interface ISaveRegularExpenditure {
  openModalName: string;
  form: {
    title: string;
    regularDate: number;
    amount: number;
    useAutoExpenditure: boolean;
    expenditureType: string;
  };
}

type Action =
  | { type: 'SET_SAVE_FORM'; payload: { type: string; value: string | number | boolean } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_MODAL'; payload: string }
  | { type: 'RESET_SAVE_FORM'; payload: string };

function reducer(state: ISaveRegularExpenditure, action: Action): ISaveRegularExpenditure {
  switch (action.type) {
    case 'SET_SAVE_FORM': {
      const form = Object.assign(state.form, { [action.payload.type]: action.payload.value });
      return { ...state, form };
    }
    case 'RESET_SAVE_FORM': {
      const isNumberInit = action.payload === 'regularDate' || action.payload === 'amount';
      const resetValue = isNumberInit ? 0 : '';
      const form = Object.assign(state.form, { [action.payload]: resetValue });
      return { ...state, form };
    }
    case 'CLOSE_MODAL': {
      return { ...state, openModalName: '' };
    }
    case 'OPEN_MODAL': {
      return { ...state, openModalName: action.payload };
    }
    default:
      throw new Error('Unhandled action');
  }
}

function SaveRegularExpenditure() {
  const [state, dispatch] = useReducer(reducer, {
    openModalName: '',
    form: {
      title: '',
      regularDate: 0,
      amount: 0,
      useAutoExpenditure: false,
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

  // 모달리스트 props들
  const modalProps = {
    openModalName,
    amount,
    regularDate,
    expenditureType,
    expenditureTypeMenus: menus,
    onCloseModal,
    onCompleteModal
  };

  return (
    <PageTemplate title='정기지출 등록'>
      <BaseInput
        dataType='title'
        name='title'
        label='제목'
        placeHolder='제목을 입력해주세요.'
        value={title}
        onClear={onClearSaveForm}
        onChange={onInputChange}
      />
      <BaseInput
        disable
        label='지출 타입'
        dataType='expenditureType'
        placeHolder='어떤 종류의 지출인지 선택해주세요.'
        value={selectExpenditureType ? selectExpenditureType.value : ''}
        onClear={onClearSaveForm}
        onClick={onOpenModal}
      />
      <BaseInput
        disable
        dataType='regularDate'
        label='지출일'
        placeHolder='지출일을 선택해주세요.'
        value={regularDate === 0 ? '' : `${regularDate}일`}
        onClear={onClearSaveForm}
        onClick={onOpenModal}
      />
      <BaseInput
        disable
        dataType='amount'
        label='지출액'
        placeHolder='지출 금액을 입력해주세요.'
        value={amount === 0 ? '' : `${addComma(amount)}원`}
        onClear={onClearSaveForm}
        onClick={onOpenModal}
      />
      <ExpenditureTabs useAutoExpenditure={useAutoExpenditure} onChangeSaveForm={onChangeSaveForm} />
      <RegularFormModalList {...modalProps} />
    </PageTemplate>
  );
}

export default SaveRegularExpenditure;
