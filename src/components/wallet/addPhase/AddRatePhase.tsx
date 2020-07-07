import React from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import HeaderWithBack from '../../common/HeaderWithBack';
import BaseSlider from '../../common/BaseSlider';
import { addComma } from '../../../support/util/String';
import { IWalletForm } from '../../../models/IWalletForm';
import { diffMonth } from '../../../support/util/date';

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
  const onChangeRate = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChangeWalletForm('rate', Number(e.target.value));

  const diffWalletMonth = diffMonth(new Date(), new Date(wallet.date));
  console.log(diffWalletMonth);
  console.log(wallet.rate * 0.1);
  const futureRateAmount = wallet.amount * diffWalletMonth * ((diffWalletMonth + 1) / 2) * (wallet.rate * 0.1 / 12);

  return (
    <PhaseTemplate active={isActivePhase}>
      <HeaderWithBack title='이율 설정' onBackClick={goPrevPhase} />
      <S.AddRatePhase>
        <div>
          <S.Header>
            <p>적금의 이율을 설정해 주세요.</p>
          </S.Header>
          <div>
            <BaseSlider min={1} max={100} value={wallet.rate} step={1} onChange={onChangeRate} />
          </div>
          <S.Amount>
            <p>
              예상 만기 이자 : <span>{addComma(futureRateAmount)}원</span>
            </p>
          </S.Amount>
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

export default React.memo(AddRatePhase);
