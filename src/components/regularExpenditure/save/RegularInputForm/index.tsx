import React, { ChangeEvent } from 'react';

import BaseInput from '@components/common/BaseInput';
import Form from '@components/atoms/Form';
import { addComma } from '@support/util/String';

interface IProps {
  // 제목
  title: string;
  // 자동 이체 종류
  expenditureType: string;
  // 정기 지출 일자
  regularDate: number;
  // 지출 금액
  amount: number;
  // input 변경 이벤트
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // 저장 영역 초기화
  onClearForm: (e: React.MouseEvent<HTMLLIElement>) => void;
  // 폼 모달 열기
  onOpenModal: (e: ChangeEvent<HTMLDivElement>) => void;
}

/**
 * 정기 지출 입력 폼
 * @component
 */

function RegularInputForm(props: IProps) {
  const {
    title,
    expenditureType,
    regularDate,
    amount,
    onInputChange,
    onClearForm,
    onOpenModal
  } = props;

  const renderTitleInput = React.useMemo(
    () => (
      <BaseInput
        dataType='title'
        name='title'
        label='제목'
        placeHolder='제목을 입력해주세요.'
        max={20}
        value={title}
        onClear={onClearForm}
        onChange={onInputChange}
      />
    ),
    [title, onClearForm, onInputChange]
  );

  const renderExpenditureTypeInput = React.useMemo(
    () => (
      <BaseInput
        disable
        label='지출 타입'
        dataType='expenditureType'
        placeHolder='어떤 종류의 지출인지 선택해주세요.'
        value={expenditureType}
        onClear={onClearForm}
        onClick={onOpenModal}
      />
    ),
    [expenditureType, onClearForm, onOpenModal]
  );

  const renderRegularDateInput = React.useMemo(
    () => (
      <BaseInput
        disable
        dataType='regularDate'
        label='지출일'
        placeHolder='지출일을 선택해주세요.'
        value={regularDate === 0 ? '' : `${regularDate}일`}
        onClear={onClearForm}
        onClick={onOpenModal}
      />
    ),
    [regularDate, onClearForm, onOpenModal]
  );

  const renderAmountInput = React.useMemo(
    () => (
      <BaseInput
        disable
        dataType='amount'
        label='지출액'
        placeHolder='지출 금액을 입력해주세요.'
        value={amount === 0 ? '' : `${addComma(amount)}원`}
        onClear={onClearForm}
        onClick={onOpenModal}
      />
    ),
    [amount, onClearForm, onOpenModal]
  );

  return (
    <Form>
      {renderTitleInput}
      {renderExpenditureTypeInput}
      {renderRegularDateInput}
      {renderAmountInput}
    </Form>
  );
}

export default RegularInputForm;
