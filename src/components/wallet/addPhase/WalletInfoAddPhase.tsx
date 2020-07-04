import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import BaseInput from '../../common/BaseInput';
import WalletTypeAddModal from './WalletTypeAddModal';
import WalletDateModal from './WalletDateModal';
import { IAssetType } from '../../../models/IAssetType';
import { DATE_FORMAT, parseDate } from '../../../support/util/date';
import PhaseTemplate from '../../common/PhaseTemplate';
import HeaderWithBack from '../../common/HeaderWithBack';
import { IWalletForm } from '../../../models/IWalletForm';

type modalType = 'type' | 'date' | '';
type WalletInfoAddPhaseProps = {
  isActivePhase: boolean;
  assetTypes: IAssetType[];
  goNextPage: () => void;
  goPrevPhase: () => void;
  walletForm: IWalletForm;
  onChangeWalletForm: (type: string, value: string) => void;
};


function WalletInfoAddPhase({
                              isActivePhase,
                              walletForm,
                              assetTypes,
                              onChangeWalletForm,
                              goNextPage,
                              goPrevPhase
                            }: WalletInfoAddPhaseProps) {

  // 모달 팝업
  const [openModalName, setOpenModalName] = useState<modalType>('');
  const openTypeModal = () => setOpenModalName('type');
  const openDateModal = () => setOpenModalName('date');
  const closeModal = () => setOpenModalName('');

  // 폼 값 초기화
  const clearWalletTitle = () => onChangeWalletForm('title', '');
  const clearWalletType = () => onChangeWalletForm('type', '');
  const clearWalletDate = () => onChangeWalletForm('date', '');

  // 폼 값 변경 이벤트
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => onChangeWalletForm('title', e.target.value);
  const onChangeDate = (date: string) => {
    onChangeWalletForm('date', date);
    closeModal();
  };
  const onChangeAssetType = (assetType: IAssetType) => {
    onChangeWalletForm('type', assetType.name);
    closeModal();
  };

  // todo 이전 날짜 비교하기
  const isAllowWalletFormValidation =
    walletForm.title !== '' && walletForm.type !== '' && walletForm.date !== '';

  // 다음 페이즈 입력으로 이동
  const goNextPhase = useCallback(() => {
    if (isAllowWalletFormValidation) {
      goNextPage();
    }
  }, [isAllowWalletFormValidation]);

  return (
    <PhaseTemplate active={isActivePhase}>
      <S.WalletInfoAddPhase>
        <HeaderWithBack title='예/적금 정보 작성하기' onBackClick={goPrevPhase}/>
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
            value={walletForm.type}
            disable
          />
          <BaseInput
            label='만기일'
            placeHolder='만기일을 선택해 주세요.'
            onClick={openDateModal}
            onClear={clearWalletDate}
            value={parseDate(walletForm.date, DATE_FORMAT.YYYY_MM_DD)}
            disable
          />
        </S.Content>
        <S.CompleteButton
          active={isAllowWalletFormValidation}
          onClick={goNextPhase}
        >
          작성하기
        </S.CompleteButton>
        <WalletTypeAddModal
          assetTypes={assetTypes}
          visible={openModalName === 'type'}
          onChangeAssetType={onChangeAssetType}
          oncloseModal={closeModal}
        />
        <WalletDateModal
          visible={openModalName === 'date'}
          oncloseModal={closeModal}
          onChangeDate={onChangeDate}
          date={walletForm.date === '' ? new Date() : new Date(walletForm.date)}
        />
      </S.WalletInfoAddPhase>
    </PhaseTemplate>
  );
}

const S: {
  WalletInfoAddPhase: any;
  Content: any;
  CompleteButton: any;
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
    border-radius: .8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
    opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `
};

export default WalletInfoAddPhase;
