import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import BaseInput from '../../../common/BaseInput';
import AccountSavingTypeModal from './AccountSavingTypeModal';
import DateModal from '../../../common/modal/DateModal';
import {
  DATE_FORMAT,
  getKoMonth,
  parseDate
} from '../../../../support/util/date';
import PhaseTemplate from '../../../common/PhaseTemplate';
import { IAccount } from '../../../../models/IAccount';
import BaseSlider from '../../../common/BaseSlider';
import { IAssetType } from '../../../../models/IAssetType';
import { SAVING_TYPE } from '../../../../support/constants';

type modalType = 'savingType' | 'startDate' | '';
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
  const [openModalName, setOpenModalName] = useState<modalType | string>('');
  const [assetMonth, setAssetMonth] = useState(0);
  const [regularTransferDate, setRegularTransferDate] = useState(1);
  const useRegularTransferDate =
    account.savingType.type === SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS;

  //모달 열기
  const onOpenModal = (e: ChangeEvent<HTMLDivElement>) => {
    setOpenModalName(e.currentTarget.dataset.type  || '');
  };

  // 모달 닫기
  const onCloseModal = () => {
    setOpenModalName('');
  };

  // 폼 값 초기화
  const onClearForm = (e: React.MouseEvent<HTMLLIElement>) => {
    const formType = e.currentTarget.dataset.type || '';
    let initData: string | IAssetType = '';

    if(formType === ''){
      return;
    }

    if(formType === 'savingType'){
      initData = { type: '', name: '' };
    }

    onChangeAccount(formType, initData);
  };

  // 제목 변경
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeAccount('title', e.target.value);
  };

  const onChangeDate = (date: string) => {
    onChangeAccount('startDate', date);
    onCloseModal();
  };

  // 슬라이드 이벤트 폼 변경 이벤트
  const onChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const type = e.target.dataset.type || '';

    type === 'assetMonth' && setAssetMonth(value);
    type === 'regularTransferDate' && setRegularTransferDate(value);
  };

  const onChangeAssetType = (assetType: IAssetType) => {
    // 적금 타입 변경시 정기예치일 오늘날짜로 초기화
    setRegularTransferDate(now.getDate());
    onChangeAccount('regularTransferDate', 0);

    onChangeAccount('savingType', assetType);
    onCloseModal();
  };

  // 폼 입력 전체 검증
  const isAllowAccountAddValidation =
    account.title !== '' &&
    account.savingType.name !== '' &&
    account.startDate !== '' &&
    assetMonth > 0;

  // 다음 단계 입력으로 이동
  const goNextPhase = () => {
    if (isAllowAccountAddValidation) {
      const startDate = new Date(account.startDate);
      const endDate = startDate.toLocaleDateString();

      startDate.setMonth(startDate.getMonth() + assetMonth);
      onChangeAccount('endDate', parseDate(endDate));

      if (useRegularTransferDate) {
        onChangeAccount('regularTransferDate', regularTransferDate);
        onChangeAccount('endDate', parseDate(endDate));
      }

      goNextPage();
    }
  };

  return (
    <PhaseTemplate
      title='정보 작성하기'
      active={isActivePhase}
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <S.AccountInfoAddPhase>
        <S.Content>
          <BaseInput
            label='예/적금명'
            placeHolder='예/적금 명을 입력해 주세요.'
            name='title'
            dataType='title'
            value={account.title}
            onChange={onChangeTitle}
            onClear={onClearForm}
          />
          <BaseInput
            disable
            label='예/적금 종류'
            placeHolder='예/적금 종류를 선택해 주세요.'
            dataType='savingType'
            value={account.savingType.name}
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
            placeHolder='시작일을 선택해 주세요.'
            dataType='startDate'
            value={parseDate(account.startDate, DATE_FORMAT.YYYY_MM_DD)}
            onClick={onOpenModal}
            onClear={onClearForm}
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
                  dataType='assetMonth'
                  value={assetMonth}
                  hoverMessage={getKoMonth(assetMonth)}
                  onChange={onChangeSlider}
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
          visible={openModalName === 'savingType'}
          onChangeAssetType={onChangeAssetType}
          oncloseModal={onCloseModal}
        />
        <DateModal
          visible={openModalName === 'startDate'}
          date={account.startDate === '' ? now : new Date(account.startDate)}
          oncloseModal={onCloseModal}
          onChangeDate={onChangeDate}
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
