import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import IcoChevronLeft from '../../icon/IcoChevronLeft';
import theme from '../../../style/colors';
import BaseInput from '../../common/BaseInput';
import WalletTypeAddModal from './WalletTypeAddModal';
import WalletDateModal from './WalletDateModal';
import useInputs from '../../../support/hooks/UseInputs';
import { IAssetType } from '../../../models/IAssetType';
import { DATE_FORMAT, parseDate } from '../../../support/util/date';

type modalType = 'type' | 'date' | '';
type WalletInfoAddPhaseProps = {
  goNextPage: () => void;
};

const assetTypes: IAssetType[] = [
  {
    type: '1',
    name: '정기적금'
  },
  {
    type: '1',
    name: '정기예금'
  },
  {
    type: '1',
    name: '자유적금'
  }
];

function WalletInfoAddPhase({ goNextPage }: WalletInfoAddPhaseProps) {
  const [walletForm, onChange, inputDispatch] = useInputs<{
    title: string;
    type: string;
    date: string;
  }>({
    title: '',
    type: '',
    date: ''
  });

  const [openModalName, setOpenModalName] = useState<modalType>('');
  const clearWalletTitle = () => inputDispatch({ name: 'title', value: '' });
  const clearWalletType = () => inputDispatch({ name: 'type', value: '' });
  const clearWalletDate = () => inputDispatch({ name: 'date', value: '' });

  const openTypeModal = () => setOpenModalName('type');
  const openDateModal = () => setOpenModalName('date');
  const closeModal = () => setOpenModalName('');
  const onChangeDate = (date: string) => {
    inputDispatch({ name: 'date', value: date });
    closeModal();
  };

  const onChangeAssetType = (assetType: IAssetType) => {
    inputDispatch({ name: 'type', value: assetType.name });
    closeModal();
  };

  // todo 이전 날짜 비교하기
  const isAllowWalletFormValidation =
    walletForm.title !== '' && walletForm.type !== '' && walletForm.date !== '';

  const goNextPhase = useCallback(() => {
    if (isAllowWalletFormValidation) {
      goNextPage();
    }
  }, [isAllowWalletFormValidation]);

  return (
    <S.WalletInfoAddPhase>
      <S.Header>
        <IcoChevronLeft width={26} height={26} fill={theme.colors.navyD1} />
        <p>예/적금 정보 작성하기</p>
      </S.Header>
      <S.Content>
        <BaseInput
          label='예/적금명'
          placeHolder='예/적금 명을 입력해 주세요.'
          name='title'
          value={walletForm.title}
          onChange={onChange}
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
  );
}

const S: {
  WalletInfoAddPhase: any;
  Header: any;
  Content: any;
  Menu: any;
  CompleteButton: any;
} = {
  WalletInfoAddPhase: styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Menu: styled.div`
    display: flex;
    flex-direction: column;

    label {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${(props) => props.theme.colors.blackL1};
      text-align: left;
    }

    p {
      border-bottom: 0.1rem solid ${(props) => props.theme.colors.blackL1};
      padding-right: 3rem;
      border-radius: 0;
      height: 4rem;
      color: #27173e;
      font-size: 1.5rem;
    }
  `,
  Header: styled.div`
    height: 5.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    p {
      font-size: 1.6rem;
      margin-top: 0.4rem;
      color: ${(props) => props.theme.colors.blackL1};
    }
  `,
  Content: styled.div`
    margin-top: 2rem;
    padding: 0 2rem;
    > div + div {
      margin-top: 4rem;
    }
  `,
  CompleteButton: styled.button`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5.5rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
    opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `
};

export default WalletInfoAddPhase;
