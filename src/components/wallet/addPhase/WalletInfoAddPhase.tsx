import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import BaseInput from '../../common/BaseInput';
import WalletTypeAddModal from './WalletTypeAddModal';
import WalletDateModal from './WalletDateModal';
import { DATE_FORMAT, parseDate } from '../../../support/util/date';
import PhaseTemplate from '../../common/PhaseTemplate';
import HeaderWithBack from '../../common/HeaderWithBack';
import { IWalletForm } from '../../../models/IWalletForm';
import BaseSlider from '../../common/BaseSlider';
import { IAssetType } from '../../../models/IAssetType';

type modalType = 'type' | 'date' | '';
type WalletInfoAddPhaseProps = {
  isActivePhase: boolean;
  goNextPage: () => void;
  goPrevPhase: () => void;
  walletForm: IWalletForm;
  onChangeWalletForm: (type: string, value: string | IAssetType) => void;
};

function WalletInfoAddPhase({
  isActivePhase,
  walletForm,
  onChangeWalletForm,
  goNextPage,
  goPrevPhase
}: WalletInfoAddPhaseProps) {
  // 모달 팝업
  const [openModalName, setOpenModalName] = useState<modalType>('');
  const [assetMonth, setAssetMonth] = useState(0);
  const openTypeModal = () => setOpenModalName('type');
  const openDateModal = () => setOpenModalName('date');
  const closeModal = () => setOpenModalName('');

  // 폼 값 초기화
  const clearWalletTitle = () => onChangeWalletForm('title', '');
  const clearWalletType = () => onChangeWalletForm('type', '');
  const clearWalletDate = () => onChangeWalletForm('startDate', '');

  // 폼 값 변경 이벤트
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    onChangeWalletForm('title', e.target.value);
  const onChangeDate = (date: string) => {
    onChangeWalletForm('startDate', date);
    closeModal();
  };
  const onChangeAssetType = (assetType: IAssetType) => {
    onChangeWalletForm('savingType', assetType);
    closeModal();
  };

  const isAllowWalletFormValidation =
    walletForm.title !== '' &&
    walletForm.savingType.name !== '' &&
    walletForm.startDate !== '' &&
    assetMonth > 0;

  // 다음 페이즈 입력으로 이동
  const goNextPhase = () => {
    if (isAllowWalletFormValidation) {
      const assetStartDate = new Date(walletForm.startDate);
      assetStartDate.setMonth(assetStartDate.getMonth() + assetMonth);
      const assetEndDate = assetStartDate.toLocaleDateString();
      onChangeWalletForm(
        'endDate',
        parseDate(assetEndDate, DATE_FORMAT.YYYY_MM_DD)
      );
      goNextPage();
    }
  };

  return (
    <PhaseTemplate active={isActivePhase}>
      <S.WalletInfoAddPhase>
        <HeaderWithBack
          title='정보 작성하기'
          onBackClick={goPrevPhase}
        />
        <S.Content>
          <BaseInput
            label='예/적금명'
            placeHolder='예/적금 명을 입력해 주세요.'
            name='title'
            value={walletForm.title}
            onChange={onChangeTitle}
            onClear={clearWalletTitle}
          />
          <BaseInput
            label='예/적금 종류'
            placeHolder='예/적금 종류를 선택해 주세요.'
            onClick={openTypeModal}
            onClear={clearWalletType}
            value={walletForm.savingType.name}
            disable
          />
          <BaseInput
            label='시작일'
            placeHolder='시작일을 선택해 주세요.'
            onClick={openDateModal}
            onClear={clearWalletDate}
            value={parseDate(walletForm.startDate, DATE_FORMAT.YYYY_MM_DD)}
            disable
          />
          <S.AssetMonth>
            {
              walletForm.startDate && (
                <>
                  <p>예/적금 기간 설정</p>
                  <BaseSlider
                    min={0}
                    max={60}
                    step={6}
                    height={2}
                    value={assetMonth}
                    hoverMessage={`${assetMonth} 개월`}
                    onChange={(e) => setAssetMonth(Number(e.target.value))}
                  />
                </>
              )
            }
          </S.AssetMonth>
        </S.Content>
        <S.CompleteButton
          active={isAllowWalletFormValidation}
          onClick={goNextPhase}
        >
          작성하기
        </S.CompleteButton>
        <WalletTypeAddModal
          visible={openModalName === 'type'}
          onChangeAssetType={onChangeAssetType}
          oncloseModal={closeModal}
        />
        <WalletDateModal
          visible={openModalName === 'date'}
          oncloseModal={closeModal}
          onChangeDate={onChangeDate}
          date={
            walletForm.startDate === ''
              ? new Date()
              : new Date(walletForm.startDate)
          }
        />
      </S.WalletInfoAddPhase>
    </PhaseTemplate>
  );
}

const S: {
  WalletInfoAddPhase: any;
  Content: any;
  CompleteButton: any;
  AssetMonth: any;
} = {
  WalletInfoAddPhase: styled.div`
    height: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Content: styled.div`
    margin-top: 2rem;
    padding: 0 1rem;
    > div + div {
      margin-top: 4rem;
    }
  `,
  CompleteButton: styled.button`
    margin-top: auto;
    margin-bottom: 2rem;
    height: 5.5rem;
    border-radius: 0.8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
    opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `,
  AssetMonth: styled.div`
    > p {
      margin-bottom: 7rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: ${(props) => props.theme.colors.blackL1};
      text-align: left;
    }
  `
};

export default WalletInfoAddPhase;
