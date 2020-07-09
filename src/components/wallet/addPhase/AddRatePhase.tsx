import React, { useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import HeaderWithBack from '../../common/HeaderWithBack';
import BaseSlider from '../../common/BaseSlider';
import { IWalletForm } from '../../../models/IWalletForm';
import { INSTALLMENT_SAVINGS_TAX } from '../../../support/constants';
import ToggleTab from '../../common/ToggleTab';
import { addComma } from '../../../support/util/String';
import { IAssetType } from '../../../models/IAssetType';
import { getAmountWithoutTax, getInterest } from '../../../support/util/bank';
import { getRate } from '../../../support/util/number';
import { diffDays } from '../../../support/util/date';

type AddRatePhaseProps = {
  isActivePhase: boolean;
  wallet: IWalletForm;
  goPrevPhase: () => void;
  goNextPhase: () => void;
  onChangeWalletForm: (type: string, value: number) => void;
};

function AddRatePhase({
  isActivePhase,
  wallet,
  goPrevPhase,
  goNextPhase,
  onChangeWalletForm
}: AddRatePhaseProps) {
  const [rate, setRate] = useState(wallet.rate);
  const [activeTab, setActiveTab] = useState(INSTALLMENT_SAVINGS_TAX[0]);

  const onChangeRate = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRate(Number(e.target.value));

  const onCompleteClick = () => {
    onChangeWalletForm('rate', getRate(rate));
    console.log(wallet);
    goNextPhase();
  };
  const onChangeTab = (tab: IAssetType) => setActiveTab(tab);

  const diffMonth = diffDays(wallet.startDate, wallet.endDate);
  const interest = getInterest({ amount: wallet.amount, diffMonth, rate });
  const rateAmount = getAmountWithoutTax(interest, activeTab.type);

  return (
    <PhaseTemplate active={isActivePhase}>
      <HeaderWithBack title='이율 설정' onBackClick={goPrevPhase} />
      <S.AddRatePhase>
        <div>
          <S.Header>
            <p>이율을 설정해 주세요.</p>
          </S.Header>
          <div>
            <BaseSlider
              min={1}
              max={1000}
              value={rate}
              hoverMessage={`${getRate(rate)}%`}
              step={1}
              onChange={onChangeRate}
            />
          </div>
          {rate > 0 && (
            <S.Rate>
              <ToggleTab
                tabs={INSTALLMENT_SAVINGS_TAX}
                activeTab={activeTab}
                onChangeTab={onChangeTab}
              />
              <p>
                예상 이자금액 : <span>{addComma(rateAmount)}원</span>
              </p>
            </S.Rate>
          )}
          <S.CompleteButton onClick={onCompleteClick}>
            다음 단계
          </S.CompleteButton>
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
  Rate: any;
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
    margin-bottom: 6rem;

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
  `,
  Rate: styled.div`
    margin-top: 8rem;

    > p {
      font-size: 1.8rem;
      color: ${(props) => props.theme.colors.blackL1};
      margin-top: 4rem;

      span {
        font-weigh: bold;
        color: ${(props) => props.theme.colors.navyD1};
      }
    }
  `
};

export default AddRatePhase;
