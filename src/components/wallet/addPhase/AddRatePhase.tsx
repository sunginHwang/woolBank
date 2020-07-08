import React, { useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import HeaderWithBack from '../../common/HeaderWithBack';
import BaseSlider from '../../common/BaseSlider';
import { IWalletForm } from '../../../models/IWalletForm';
import { NORMAL_RATE_TAX } from '../../../support/constants';
import ToggleTab from '../../common/ToggleTab';
import { addComma } from '../../../support/util/String';

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
  const onChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => setRate(Number(e.target.value));

  const onCompleteClick = () => {
    onChangeWalletForm('rate', getRate(rate));
    goNextPhase();
  };
  const diffMonth = 12;
  const tabs = ['일반과세', '비과세'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const changeTab = (tab: string) => setActiveTab(tab);
  const getRate = (value : number) => Number(Number(value * 0.01).toFixed(2));
  const taxFreeRateAmount = wallet.amount * ((diffMonth + 1) / 2) * (getRate(rate) * 0.01 / 12);
  const rateAmount = activeTab === tabs[0] ? Number((taxFreeRateAmount - (taxFreeRateAmount * NORMAL_RATE_TAX)).toFixed(3)) : taxFreeRateAmount;

  return (
    <PhaseTemplate active={isActivePhase}>
      <HeaderWithBack title='이율 설정' onBackClick={goPrevPhase}/>
      <S.AddRatePhase>
        <div>
          <S.Header>
            <p>적금의 이율을 설정해 주세요.</p>
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
          {
            rate > 0 && (
              <S.Rate>
                <ToggleTab tabs={tabs} activeTab={activeTab} onChangeTab={changeTab}/>
                <p>예상 이자금액 : <span>{addComma(rateAmount)}원</span></p>
              </S.Rate>
            )
          }
          <S.CompleteButton onClick={onCompleteClick}>다음 단계</S.CompleteButton>
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
    
    
    >p{
      font-size: 1.8rem;
      color: ${(props) => props.theme.colors.blackL1};
      margin-top: 4rem;
      
      span{
        font-weigh: bold;
        color: ${(props) => props.theme.colors.navyD1};
      }
    }
    
  `
};

export default AddRatePhase;
