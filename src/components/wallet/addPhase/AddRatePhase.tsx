import React, { useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import HeaderWithBack from '../../common/HeaderWithBack';
import BaseSlider from '../../common/BaseSlider';
import { IWalletForm } from '../../../models/IWalletForm';

type AddRatePhaseProps = {
  isActivePhase: boolean;
  wallet: IWalletForm;
  goPrevPhase: () => void;
  onChangeWalletForm: (type: string, value: number) => void;
};

function AddRatePhase({
  isActivePhase,
  wallet,
  goPrevPhase,
  onChangeWalletForm
}: AddRatePhaseProps) {
  const [a, se] = useState(0);
  const onChangeRate = (e: React.ChangeEvent<HTMLInputElement>) =>
    se(Number(e.target.value));
  return (
    <PhaseTemplate active={isActivePhase}>
      <HeaderWithBack title='이율 설정' onBackClick={goPrevPhase} />
      <S.AddRatePhase>
        <div>
          <S.Header>
            <p>적금의 이율을 설정해 주세요.</p>
          </S.Header>
          <div>
            <BaseSlider
              min={1}
              max={100}
              value={a}
              step={1}
              onChange={onChangeRate}
            />
          </div>
          <S.CompleteButton>이율 설정</S.CompleteButton>
        </div>
      </S.AddRatePhase>
    </PhaseTemplate>
  );
}

const S: {
  AddRatePhase: any;
  Header: any;
  Amount: any;
  CompleteButton: any;
} = {
  AddRatePhase: styled.div`
    justify-content: space-between;
    background-color: ${(props) => props.theme.colors.white};
    font-size: 1.8rem;
    height: 100%;

    > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      margin: 0 2rem;
    }
  `,
  Header: styled.div`
    padding-top: 2rem;
    margin-bottom: 10rem;

    > p {
      font-size: 2.4rem;
      font-weight: bold;
      margin-bottom: 5rem;
      color: ${(props) => props.theme.colors.blackL1};
    }
  `,
  Amount: styled.div`
    margin-top: 4rem;

    > p {
      font-size: 1.6rem;
      font-weight: bold;
      margin-bottom: 5rem;
      color: ${(props) => props.theme.colors.blackL1};

      > span {
        color: ${(props) => props.theme.colors.navyD1};
      }
    }
  `,
  CompleteButton: styled.button`
    margin-top: auto;
    margin-bottom: 7.5rem;
    height: 5.5rem;
    width: 100%;
    border-radius: 0.8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
    opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `
};

export default AddRatePhase;
