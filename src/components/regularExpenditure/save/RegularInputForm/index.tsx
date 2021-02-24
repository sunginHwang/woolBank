import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import BaseInput from '@components/common/BaseInput';
import { addComma } from '@support/util/String';

interface IRegularInputFormProps {
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

function RegularInputForm({
  title,
  expenditureType,
  regularDate,
  amount,
  onInputChange,
  onClearForm,
  onOpenModal
}: IRegularInputFormProps) {
  return (
    <S.RegularInputForm>
      <BaseInput
        dataType='title'
        name='title'
        label='제목'
        placeHolder='제목을 입력해주세요.'
        value={title}
        onClear={onClearForm}
        onChange={onInputChange}
      />
      <BaseInput
        disable
        label='지출 타입'
        dataType='expenditureType'
        placeHolder='어떤 종류의 지출인지 선택해주세요.'
        value={expenditureType}
        onClear={onClearForm}
        onClick={onOpenModal}
      />
      <BaseInput
        disable
        dataType='regularDate'
        label='지출일'
        placeHolder='지출일을 선택해주세요.'
        value={regularDate === 0 ? '' : `${regularDate}일`}
        onClear={onClearForm}
        onClick={onOpenModal}
      />
      <BaseInput
        disable
        dataType='amount'
        label='지출액'
        placeHolder='지출 금액을 입력해주세요.'
        value={amount === 0 ? '' : `${addComma(amount)}원`}
        onClear={onClearForm}
        onClick={onOpenModal}
      />
    </S.RegularInputForm>
  );
}

const S: {
  RegularInputForm: any;
} = {
  RegularInputForm: styled.div`
    margin-top: 2rem;
    
    div + div {
      margin-top: 4rem;
    }
  `
}
export default RegularInputForm;
