import React, { useState } from 'react';
import PhaseTemplate from '../components/common/PhaseTemplate';
import styled from 'styled-components';
import WalletInfoAddPhase from '../components/wallet/addPhase/WalletInfoAddPhase';
import NumberInput from '../components/common/NumberInput';
import HeaderWithBack from '../components/common/HeaderWithBack';
import { IAssetType } from '../models/IAssetType';
import { IWalletForm } from '../models/IWalletForm';

const SecondPhase = styled.div`
  width: 100%;
  height: 100%;
`;

const ThirdPhase = styled.div`
  width: 100%;
  height: 100%;
  background-color: green;
`;

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

function Wallet() {
  const [phase, setPhase] = useState(1);
  const [walletForm, setWalletForm] = useState<IWalletForm>({
    title: '',
    type: '',
    date: '',
    amount: 0
  });

  const onChangeWalletForm = (type: string, value: string) => {
    setWalletForm({
      ...walletForm,
      [type]: value
    });
  };


  const goNextPage = () => setPhase(phase + 1);
  const goPrevPage = () => setPhase(phase - 1);

  return (
    <>
      <WalletInfoAddPhase
        walletForm={walletForm}
        assetTypes={assetTypes}
        isActivePhase={phase >= 1}
        onChangeWalletForm={onChangeWalletForm}
        goNextPage={goNextPage}/>
      <PhaseTemplate active={phase >= 2}>
        <SecondPhase>
          <HeaderWithBack title='예/적금액 작성' onBackClick={goPrevPage}/>
          <NumberInput/>
        </SecondPhase>
      </PhaseTemplate>
      <PhaseTemplate active={phase >= 3}>
        <ThirdPhase>
          <button onClick={goPrevPage}>이전페이지</button>
        </ThirdPhase>
      </PhaseTemplate>
    </>
  );
}

const S: {
  Header: any;
} = {
  Header: styled.div`
    height: 5.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    background-color: ${(props) => props.theme.colors.white};
    p {
      font-size: 1.6rem;
      margin-top: 0.4rem;
      color: ${(props) => props.theme.colors.blackL1};
    }
  `
};

export default Wallet;
