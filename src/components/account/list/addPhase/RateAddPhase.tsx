import React, { useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../../common/PhaseTemplate';
import BaseSlider from '../../../common/BaseSlider';
import { IAccount } from '../../../../models/IAccount';
import { INSTALLMENT_SAVINGS_TAX } from '../../../../support/constants';
import ToggleTab from '../../../common/ToggleTab';
import { addComma } from '../../../../support/util/String';
import { IAssetType } from '../../../../models/IAssetType';
import {
  findSavingTax,
  getAmountWithTax,
  getInterest
} from '../../../../support/util/bank';
import { getRate } from '../../../../support/util/number';
import { diffMonth } from '../../../../support/util/date';
import BaseButton from '../../../common/BaseButton';
import { IPhase } from '../../../../models/phase/IPhase';

interface AddRatePhaseProps extends IPhase{
  account: IAccount;
  onChangeAccount: (type: string, value: number | string) => void;
};

function RateAddPhase({
  isActivePhase,
  account,
  goPrevPhase,
  goNextPhase,
  onChangeAccount
}: AddRatePhaseProps) {
  const [rate, setRate] = useState(account.rate);
  const [activeTab, setActiveTab] = useState(INSTALLMENT_SAVINGS_TAX[0]);

  const onChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(getRate(Number(e.target.value)));
  };

  const onCompleteClick = () => {
    onChangeAccount('rate', rate);
    goNextPhase && goNextPhase();
  };
  const onChangeTab = (tab: IAssetType) => {
    onChangeAccount('taxType', tab.type);
    setActiveTab(tab);
  };

  const savingPeriod = diffMonth(account.startDate, account.endDate);
  const interest = getInterest({
    savingPeriod,
    amount: account.amount,
    savingType: account.savingType.type,
    rate: rate
  });
  const rateAmount = getAmountWithTax(interest, activeTab.type);
  const sliderHoverMessage = `${(rate * 100).toFixed(2)}%`;
  const displayTax = `${findSavingTax(activeTab.type) * 100}%`;

  return (
    <PhaseTemplate
      active={isActivePhase}
      title='이율 설정'
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <S.AddRatePhase>
        <div>
          <S.Header>
            <p>이율을 설정해 주세요.</p>
          </S.Header>
          <div>
            <BaseSlider
              min={0}
              max={1000}
              value={rate * 10000}
              hoverMessage={sliderHoverMessage}
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
              <div>
                <S.RateItem>
                  <span>예상 입금액</span>
                  <span>+ {addComma(account.amount)}원</span>
                </S.RateItem>
                <S.RateItem>
                  <span>순이자</span>
                  <span>+ {addComma(interest)}원</span>
                </S.RateItem>
                <S.RateItem isTax>
                  <span>
                    세금 (<label>{displayTax}</label>)
                  </span>
                  <span>- {addComma(interest - rateAmount)}원</span>
                </S.RateItem>
                <S.RateItem isTotal>
                  <span>예상 만기금액</span>
                  <span>{addComma(rateAmount + account.amount)}원</span>
                </S.RateItem>
              </div>
            </S.Rate>
          )}
          <S.Complete>
            <BaseButton
              message='다음단계'
              color='navy'
              size='full'
              active
              onClick={onCompleteClick}
            />
          </S.Complete>
        </div>
      </S.AddRatePhase>
    </PhaseTemplate>
  );
}

const S: {
  AddRatePhase: any;
  Header: any;
  Amount: any;
  Complete: any;
  Rate: any;
  RateItem: any;
} = {
  AddRatePhase: styled.div`
    justify-content: space-between;
    overflow-y: scroll;
    background-color: ${(props) => props.theme.colors.white};
    font-size: 1.8rem;
    height: 100%;
    padding: 0 2rem;
    > div {
      height: 100%;
      display: flex;
      flex-direction: column;
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
  Complete: styled.div`
    margin-top: auto;
    margin-bottom: 2rem;
    height: 5.5rem;
    min-height: 5.5rem;
  `,
  Rate: styled.div`
    margin: 8rem 0;

    > div:last-child {
      margin-top: 2rem;
    }
  `,
  RateItem: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: ${(props: any) => (props.isTotal ? '1' : '0')}rem;
    align-items: center;
    border-top: ${(props: any) =>
    props.isTotal ? `.1rem dashed ${props.theme.colors.greyL1}` : ''};
    padding-top: 1rem;

    label {
      color: ${(props) => props.theme.colors.redL1};
    }
    span:first-child {
      font-size: 1.4rem;
      color: ${(props) => props.theme.colors.greyD1};
    }

    span:last-child {
      font-size: ${(props: any) => (props.isTotal ? '2' : '1.4')}rem;
      color: ${(props: any) =>
    props.isTax ? props.theme.colors.redL1 : props.theme.colors.blackL1};
      font-weight: bold;
    }
  `
};

export default RateAddPhase;
