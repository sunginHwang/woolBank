import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import BaseInput from '../../../common/BaseInput';
import AccountSavingTypeModal from './AccountSavingTypeModal';
import DateModal from '../../../common/modal/DateModal';
import { DATE_FORMAT, getKoMonth, parseDate } from '../../../../support/util/date';
import PhaseTemplate from '../../../common/PhaseTemplate';
import { IAccount } from '../../../../models/IAccount';
import BaseSlider from '../../../common/BaseSlider';
import { IAssetType } from '../../../../models/IAssetType';
import { SAVING_TYPE } from '../../../../support/constants';

type modalType = 'type' | 'date' | '';
type AccountInfoPhaseProps = {
  isActivePhase: boolean;
  goNextPage: () => void;
  goPrevPhase: () => void;
  account: IAccount;
  onChangeAccount: (type: string, value: string | number | IAssetType) => void;
};

function AccountInfoPhase({
  isActivePhase,
  account,
  onChangeAccount,
  goNextPage,
  goPrevPhase
}: AccountInfoPhaseProps) {
  const now = new Date();
  // 모달 팝업
  const [openModalName, setOpenModalName] = useState<modalType>('');
  const [assetMonth, setAssetMonth] = useState(0);
  const [regularTransferDate, setRegularTransferDate] = useState(1);
  const useRegularTransferDate =
    account.savingType.type === SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS;

  const openTypeModal = () => {
    setOpenModalName('type');
  };
  const openDateModal = () => {
    setOpenModalName('date');
  };
  const closeModal = () => {
    setOpenModalName('');
  };

  // 폼 값 초기화
  const clearTitle = () => {
    onChangeAccount('title', '');
  };
  const clearSavingType = () => {
    onChangeAccount('savingType', { type: '', name: '' });
  };
  const clearStartDate = () => {
    onChangeAccount('startDate', '');
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeAccount('title', e.target.value);
  };

  const onChangeDate = (date: string) => {
    onChangeAccount('startDate', date);
    closeModal();
  };

  const onChangeAssetType = (assetType: IAssetType) => {
    // 적금 타입 변경시 정기예치일 오늘날짜로 초기화
    setRegularTransferDate(now.getDate());
    onChangeAccount('regularTransferDate', 0);

    onChangeAccount('savingType', assetType);
    closeModal();
  };

  const isAllowAccountAddValidation =
    account.title !== '' &&
    account.savingType.name !== '' &&
    account.startDate !== '' &&
    assetMonth > 0;

  // 다음 페이즈 입력으로 이동
  const goNextPhase = () => {
    if (isAllowAccountAddValidation) {
      const startDate = new Date(account.startDate);
      startDate.setMonth(startDate.getMonth() + assetMonth);
      const endDate = startDate.toLocaleDateString();
      onChangeAccount(
        'endDate',
        parseDate(endDate, DATE_FORMAT.YYYY_MM_DD)
      );

      if (useRegularTransferDate) {
        onChangeAccount('regularTransferDate', regularTransferDate);
        onChangeAccount(
          'endDate',
          parseDate(endDate, DATE_FORMAT.YYYY_MM_DD)
        );
      }
      goNextPage();
    }
  };

  return (
    <PhaseTemplate
      active={isActivePhase}
      title='정보 작성하기'
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <S.AccountInfoAddPhase>
        <S.Content>
          <BaseInput
            label='예/적금명'
            placeHolder='예/적금 명을 입력해 주세요.'
            name='title'
            value={account.title}
            onChange={onChangeTitle}
            onClear={clearTitle}
          />
          <BaseInput
            label='예/적금 종류'
            placeHolder='예/적금 종류를 선택해 주세요.'
            onClick={openTypeModal}
            onClear={clearSavingType}
            value={account.savingType.name}
            disable
          />
          {useRegularTransferDate && (
            <S.AssetMonth>
              <p>정기 이체일 설정</p>
              <BaseSlider
                min={1}
                max={31}
                step={1}
                size='medium'
                value={regularTransferDate}
                hoverMessage={`${regularTransferDate}일`}
                onChange={(e) => setRegularTransferDate(Number(e.target.value))}
              />
            </S.AssetMonth>
          )}
          <BaseInput
            label='시작일'
            placeHolder='시작일을 선택해 주세요.'
            onClick={openDateModal}
            onClear={clearStartDate}
            value={parseDate(account.startDate, DATE_FORMAT.YYYY_MM_DD)}
            disable
          />
          <S.AssetMonth>
            {account.startDate && (
              <>
                <p>예/적금 기간 설정</p>
                <BaseSlider
                  min={0}
                  max={120}
                  step={3}
                  size='medium'
                  value={assetMonth}
                  hoverMessage={getKoMonth(assetMonth)}
                  onChange={(e) => setAssetMonth(Number(e.target.value))}
                />
              </>
            )}
          </S.AssetMonth>
        </S.Content>
        <S.CompleteButton
          active={isAllowAccountAddValidation}
          onClick={goNextPhase}
        >
          작성하기
        </S.CompleteButton>
        <AccountSavingTypeModal
          visible={openModalName === 'type'}
          onChangeAssetType={onChangeAssetType}
          oncloseModal={closeModal}
        />
        <DateModal
          visible={openModalName === 'date'}
          oncloseModal={closeModal}
          onChangeDate={onChangeDate}
          date={account.startDate === '' ? now : new Date(account.startDate)}
        />
      </S.AccountInfoAddPhase>
    </PhaseTemplate>
  );
}

const S: {
  AccountInfoAddPhase: any;
  Content: any;
  CompleteButton: any;
  AssetMonth: any;
} = {
  AccountInfoAddPhase: styled.div`
    height: 100%;
    padding: 0 2rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Content: styled.div`
    margin-top: 2rem;

    > div + div {
      margin-top: 4rem;
    }
  `,
  CompleteButton: styled.button`
    margin-top: auto;
    margin-bottom: 2rem;
    height: 5.5rem;
    min-height: 5.5rem;
    border-radius: 0.8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
    opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `,
  AssetMonth: styled.div`
    > p {
      margin-bottom: 4rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: ${(props) => props.theme.colors.blackL1};
      text-align: left;
    }
  `
};

export default AccountInfoPhase;
