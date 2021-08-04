import React, { ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';

import Form from '@components/atoms/Form';
import BaseInput from '@components/atoms/BaseInput';
import ToggleTab from '@components/common/ToggleTab';
import DateSelectModal from '@components/common/modal/DateSelectModal';
import NumberInputModal from '@components/common/modal/NumbetInputModal';
import CategorySelectBox from '@components/accountBook/save/CategorySelectBox';

import { addComma } from '@support/util/String';
import { IAccountBookCategory } from '@models/accountBook/IAccountBookCategory';
import { IAssetType } from '@models/IAssetType';

import options from './options';

const { autoTab, selfTab } = options;

/**
 * 정기이체 작성 폼
 * @component
 */

interface IProps {
  children: React.ReactNode;
}

function SaveForm({ children }: IProps) {
  return (
    <Form>{children}</Form>
  )
}

// 인풋 공용 타입
interface IInputEvent {
  // input 변경 이벤트
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // input 클릭 이벤트
  onInputClick?: (e: ChangeEvent<HTMLDivElement>) => void;
  // 저장 영역 초기화
  onClear: (e: React.MouseEvent<HTMLLIElement>) => void;
}

// 모달 공동 타입
interface IModalProps {
  // open 된 모달 이름
  openModalName: string;
  onCloseModal: () => void;
  // 모달 선택 완료
  onCompleteModal: (type: string, value: string | number | IAccountBookCategory) => void;
}

interface ITitleProps extends IInputEvent{
  title: string;
}

/**
 * 제목 입력
 * @component
 */

function Title({ title, onClear, onInputChange }: ITitleProps) {
  return (
    <BaseInput
      dataType='title'
      name='title'
      label='제목'
      placeHolder='제목을 입력해주세요.'
      max={20}
      value={title}
      onClear={onClear}
      onChange={onInputChange}
    />
  );
}

interface IRegularDateProps extends IInputEvent, IModalProps{
  // 정기 지출 일자
  regularDate: number;
}

/**
 * 지출일 입력
 * @component
 */

function RegularDate(props: IRegularDateProps) {
  const { regularDate, onClear, onInputClick, openModalName, onCompleteModal, onCloseModal } = props;

  // 지출 타입 선택 이벤트
  const onSelectRegularDate = (date: number) => {
    onCompleteModal('regularDate', date);
  };

  return (
    <>
      <BaseInput
        disable
        dataType='regularDate'
        label='지출일'
        placeHolder='지출일을 선택해주세요.'
        value={regularDate === 0 ? '' : `${regularDate}일`}
        onClear={onClear}
        onClick={onInputClick}
      />
      <DateSelectModal
        title='정기지출일'
        visible={openModalName === 'regularDate'}
        selectDate={regularDate}
        oncloseModal={onCloseModal}
        onSelectDate={onSelectRegularDate}
      />
    </>
  );
}

interface IAmountProps extends IInputEvent, IModalProps{
  // 정기 지출 일자
  amount: number;
}

/**
 * 지출금액 입력
 * @component
 */

function Amount(props: IAmountProps) {
  const { amount, onClear, openModalName, onCloseModal, onCompleteModal, onInputClick } = props;

  // 정기 지출액 변경 이벤트
  const onChangeAmount = (amount: number) => {
    onCompleteModal('amount', amount);
  };

  return (
    <>
      <BaseInput
        disable
        dataType='amount'
        label='지출액'
        placeHolder='지출 금액을 입력해주세요.'
        value={amount === 0 ? '' : `${addComma(amount)}원`}
        onClear={onClear}
        onClick={onInputClick}
      />
      <NumberInputModal
        title='고정지출액'
        visible={openModalName === 'amount'}
        currentAmount={amount}
        oncloseModal={onCloseModal}
        onComplete={onChangeAmount}
      />
    </>
  );
}

interface ICategoryProps extends IInputEvent, IModalProps{
  category: IAccountBookCategory;
}
/**
 * 지출 카테고리
 * @component
 */

function Category(props: ICategoryProps) {
  const { category, onClear, openModalName, onCloseModal, onCompleteModal, onInputClick } = props;

  // 정기 지출액 변경 이벤트
  const onChangeCategory = (category: IAccountBookCategory) => {
    onCompleteModal('category', category);
  };

  return (
    <>
      <BaseInput
        disable
        label='지출 카테고리'
        dataType='category'
        placeHolder='지출 카테고리를 선택해 주세요.'
        value={category.name}
        onClear={onClear}
        onClick={onInputClick}
      />
      <CategorySelectBox
        open={openModalName === 'category'}
        type='expenditure'
        selectCategoryId={category.id}
        onCategorySelect={onChangeCategory}
        onClose={onCloseModal}
      />
    </>
  );
}

interface IAutoExpenditureProps {
  // 자동 이체 유무
  isAutoExpenditure: boolean;
  // 저장 폼 변경 이벤트
  onChangeSaveForm: (type: string, value: string | number | boolean) => void;
}

/**
 * 자동 이체 유무 선택 탭
 * @component
 */

function AutoExpenditure({ isAutoExpenditure, onChangeSaveForm }: IAutoExpenditureProps) {
  // 자동 이체 유무 변경
  const onChangeAutoExpenditure = useCallback((tab: IAssetType) => {
    const isAutoExpenditure = autoTab.type === tab.type;
    onChangeSaveForm('isAutoExpenditure', isAutoExpenditure);
  }, [onChangeSaveForm]);

  const tabs = [autoTab, selfTab];
  const activeTab = isAutoExpenditure ? autoTab : selfTab;

  return (
    <S.ExpenditureTabs>
      <p>자동이체 여부</p>
      <ToggleTab tabs={tabs} activeTab={activeTab} onChangeTab={onChangeAutoExpenditure} />
    </S.ExpenditureTabs>
  );
}

const S: {
  ExpenditureTabs: any;
} = {
  ExpenditureTabs: styled.div`
    margin-top: 4rem;
    
    p {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.greyD2};
      text-align: left;
      margin-bottom: 1.5rem;
    }
  `
}

SaveForm.Title = Title;
SaveForm.RegularDate = RegularDate;
SaveForm.Amount = Amount;
SaveForm.Category = Category;
SaveForm.AutoExpenditure = AutoExpenditure;

export default SaveForm;
