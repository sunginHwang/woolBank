import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import { IPhase } from '@models/phase/IPhase';
import { IAccountForm } from '@models/IAccountForm';
import { IAssetType } from '@models/IAssetType';
import { SAVING_TYPE } from '@support/constants';
import { getKoMonth, parseDate } from '@support/util/date';

import AccountSavingTypeModal from '@components/account/list/addPhase/AccountSavingTypeModal';
import BaseInput from '@components/common/BaseInput';
import DateModal from '@components/common/modal/DateModal';
import PhaseTemplate from '@components/common/PhaseTemplate';
import BaseSlider from '@components/common/BaseSlider';
import BaseButton from '@components/common/BaseButton';

type modalType = 'savingType' | 'startDate' | '';

interface AccountInfoPhaseProps extends IPhase {
  accountForm: IAccountForm;
  onChangeAccount: (type: string, value: string | number | Date | IAssetType) => void;
}

function AccountInfoPhase({
  isActivePhase,
  accountForm,
  onChangeAccount,
  goNextPhase,
  goPrevPhase
}: AccountInfoPhaseProps) {
  // 모달 팝업
  const [openModalName, setOpenModalName] = useState<modalType | string>('');
  // 슬라이더 데이터 (만기일 설정 및 정기적금일)
  const [assetMonth, setAssetMonth] = useState(0);
  const [regularTransferDate, setRegularTransferDate] = useState(1);

  const now = new Date();
  // 폼 입력 전체 검증
  const isAllowAccountAddValidation =
    accountForm.title !== '' && accountForm.savingType.name !== '' && accountForm.startDate !== '' && assetMonth > 0;
  const useRegularTransferDate = accountForm.savingType.type === SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS;

  /**
   * 해당하는 데이터 타입의 모달 열기
   */
  const onOpenModal = (e: ChangeEvent<HTMLDivElement>) => {
    setOpenModalName(e.currentTarget.dataset.type || '');
  };

  /**
   * 모든 모달 닫기
   */
  const onCloseModal = () => {
    setOpenModalName('');
  };

  /**
   * 해당 타입에 맞는 영역 초기화
   */
  const onClearForm = (e: React.MouseEvent<HTMLLIElement>) => {
    const formType = e.currentTarget.dataset.type || '';
    let initData: string | IAssetType = '';

    if (formType === '') {
      return;
    }

    if (formType === 'savingType') {
      initData = { type: '', name: '' };
    }

    onChangeAccount(formType, initData);
  };

  /**
   * 적금명 변경
   */
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeAccount('title', e.target.value);
  };

  /**
   * 시작일 변경
   */
  const onChangeStartDate = (date: string) => {
    onChangeAccount('startDate', date);
    onCloseModal();
  };

  /**
   * 슬라이더 움직임 이벤트
   */
  const onChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const type = e.target.dataset.type || '';

    type === 'assetMonth' && setAssetMonth(value);
    type === 'regularTransferDate' && setRegularTransferDate(value);
  };

  /**
   * 적금 타입 변경
   */
  const onChangeSavingType = (savingType: IAssetType) => {
    // 적금 타입 변경시 정기예치일 오늘날짜로 초기화
    setRegularTransferDate(now.getDate());
    onChangeAccount('regularTransferDate', 0);

    onChangeAccount('savingType', savingType);
    onCloseModal();
  };

  /**
   * 다음 단계 입력으로 이동
   */
  const onCompleteClick = () => {
    if (isAllowAccountAddValidation) {
      const startDate = new Date(accountForm.startDate);
      const endDate = new Date(accountForm.startDate);

      endDate.setMonth(startDate.getMonth() + assetMonth);
      onChangeAccount('endDate', endDate);

      if (useRegularTransferDate) {
        onChangeAccount('regularTransferDate', regularTransferDate);
      }

      goNextPhase && goNextPhase();
    }
  };

  return (
    <PhaseTemplate title='정보 작성하기' active={isActivePhase} usePadding={false} onBackClick={goPrevPhase}>
      <S.AccountInfoAddPhase>
        <S.Content>
          <BaseInput
            label='예/적금명'
            placeHolder='예/적금 명을 입력해 주세요.'
            name='title'
            dataType='title'
            value={accountForm.title}
            onChange={onChangeTitle}
            onClear={onClearForm}
          />
          <BaseInput
            disable
            label='예/적금 종류'
            name='kind'
            placeHolder='예/적금 종류를 선택해 주세요.'
            dataType='savingType'
            value={accountForm.savingType.name}
            onClear={onClearForm}
            onClick={onOpenModal}
          />
          {useRegularTransferDate && (
            <S.AssetMonth>
              <p>정기 이체일 설정</p>
              <BaseSlider
                min={1}
                max={31}
                step={1}
                size='medium'
                dataType='regularTransferDate'
                value={regularTransferDate}
                hoverMessage={`${regularTransferDate}일`}
                onChange={onChangeSlider}
              />
            </S.AssetMonth>
          )}
          <BaseInput
            disable
            label='시작일'
            name='startDate'
            placeHolder='시작일을 선택해 주세요.'
            dataType='startDate'
            value={parseDate(accountForm.startDate)}
            onClick={onOpenModal}
            onClear={onClearForm}
          />
          <S.AssetMonth>
            {accountForm.startDate && (
              <>
                <p>예/적금 기간 설정</p>
                <BaseSlider
                  min={0}
                  max={120}
                  step={3}
                  size='medium'
                  dataType='assetMonth'
                  value={assetMonth}
                  hoverMessage={getKoMonth(assetMonth)}
                  onChange={onChangeSlider}
                />
              </>
            )}
          </S.AssetMonth>
        </S.Content>
        <S.Complete>
          <BaseButton
            message='작성하기'
            name='accountInfoCompleteButton'
            color='red'
            size='full'
            active={isAllowAccountAddValidation}
            onClick={onCompleteClick}
          />
        </S.Complete>
        <AccountSavingTypeModal
          visible={openModalName === 'savingType'}
          onChangeAssetType={onChangeSavingType}
          oncloseModal={onCloseModal}
        />
        <DateModal
          visible={openModalName === 'startDate'}
          date={accountForm.startDate === '' ? now : new Date(accountForm.startDate)}
          oncloseModal={onCloseModal}
          onChangeDate={onChangeStartDate}
        />
      </S.AccountInfoAddPhase>
    </PhaseTemplate>
  );
}

const S: {
  AccountInfoAddPhase: any;
  Content: any;
  Complete: any;
  AssetMonth: any;
} = {
  AccountInfoAddPhase: styled.div`
    height: 100%;
    padding: 0 2rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.white};
  `,
  Content: styled.div`
    margin-top: 2rem;

    > div + div {
      margin-top: 4rem;
    }
  `,
  Complete: styled.div`
    margin-top: auto;
    margin-bottom: 2rem;
    height: 5.5rem;
    min-height: 5.5rem;
  `,
  AssetMonth: styled.div`
    > p {
      margin-bottom: 4rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.blackL1};
      text-align: left;
    }
  `
};

export default AccountInfoPhase;
