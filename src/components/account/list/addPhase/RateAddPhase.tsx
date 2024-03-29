import React, { useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '@components/common/PhaseTemplate';
import BaseSlider from '@components/common/BaseSlider';
import Button from '@components/atoms/Button';
import ToggleTab from '@components/common/ToggleTab';

import { INSTALLMENT_SAVINGS_TAX } from '@support/constants';
import { addComma } from '@support/util/String';
import { findSavingTax, getAmountWithTax, getInterest } from '@support/util/bank';
import { getRate } from '@support/util/number';
import { diffMonth } from '@support/util/date';
import { IPhase } from '@models/phase/IPhase';
import { IAccountForm } from '@models/account/IAccountForm';
import { IAssetType } from '@models/component/IAssetType';

interface AddRatePhaseProps extends IPhase {
  accountForm: IAccountForm;
  onChangeAccount: (type: string, value: number | string) => void;
}

function RateAddPhase({ isActivePhase, accountForm, goPrevPhase, goNextPhase, onChangeAccount }: AddRatePhaseProps) {
  const [rate, setRate] = useState(accountForm.rate);
  const [activeTab, setActiveTab] = useState(INSTALLMENT_SAVINGS_TAX[0]);

  /**
   * 이율 변경
   */
  const onChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(getRate(Number(e.target.value)));
  };

  /**
   * 다음 단계 이동
   */
  const onCompleteClick = () => {
    onChangeAccount('rate', rate);
    goNextPhase && goNextPhase();
  };

  /**
   * 세금 종류 탭 변경
   */
  const onChangeTaxType = (tab: IAssetType) => {
    onChangeAccount('taxType', tab.type);
    setActiveTab(tab);
  };

  const savingPeriod = diffMonth(accountForm.startDate, accountForm.endDate);
  const interest = getInterest({
    savingPeriod,
    amount: accountForm.amount,
    savingType: accountForm.savingType.type,
    rate: rate
  });
  const rateAmount = getAmountWithTax(interest, activeTab.type);
  const sliderHoverMessage = `${(rate * 100).toFixed(2)}%`;
  const displayTax = `${findSavingTax(activeTab.type) * 100}%`;

  return (
    <PhaseTemplate active={isActivePhase} title='이율 설정' usePadding={false} onBackClick={goPrevPhase}>
      <S.AddRatePhase>
        <div>
          <S.Header>
            <p>이율을 설정해 주세요.</p>
          </S.Header>
          <div>
            <BaseSlider
              min={0}
              max={1000}
              dataType='rate'
              value={rate * 10000}
              hoverMessage={sliderHoverMessage}
              step={1}
              onChange={onChangeRate}
            />
          </div>
          {rate > 0 && (
            <S.Rate>
              <ToggleTab tabs={INSTALLMENT_SAVINGS_TAX} activeTab={activeTab} onChangeTab={onChangeTaxType} />
              <div>
                <S.RateItem>
                  <span>예상 입금액</span>
                  <span>+ {addComma(accountForm.amount)}원</span>
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
                  <span>{addComma(rateAmount + accountForm.amount)}원</span>
                </S.RateItem>
              </div>
            </S.Rate>
          )}
          <S.Complete>
            <Button message='다음단계' name='rateComplete' color='red' size='full' active onClick={onCompleteClick} />
          </S.Complete>
        </div>
      </S.AddRatePhase>
    </PhaseTemplate>
  );
}

type RateItemType = {
  isTotal?: boolean;
  isTax?: boolean;
};
const S = {
  AddRatePhase: styled.div`
    justify-content: space-between;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.colors.white};
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
      color: ${({ theme }) => theme.colors.blackL1};
    }
  `,
  Amount: styled.div`
    margin-top: 4rem;

    > p {
      font-size: 1.6rem;
      font-weight: bold;
      margin-bottom: 5rem;
      color: ${({ theme }) => theme.colors.blackL1};

      > span {
        color: ${({ theme }) => theme.colors.mainColor};
      }
    }
  `,
  Complete: styled.div`
    margin-top: auto;
    margin-bottom: 2rem;
    margin-bottom: calc(constant(safe-area-inset-bottom) + 2rem);
    margin-bottom: calc(env(safe-area-inset-bottom) + 2rem);
    height: 5.5rem;
    min-height: 5.5rem;
  `,
  Rate: styled.div`
    margin: 8rem 0;

    > div:last-child {
      margin-top: 2rem;
    }
  `,
  RateItem: styled.div<RateItemType>`
    display: flex;
    justify-content: space-between;
    margin-top: ${({ isTotal }) => (isTotal ? '1' : '0')}rem;
    align-items: center;
    border-top: ${({ isTotal, theme }) => (isTotal ? `.1rem dashed ${theme.colors.greyL1}` : '')};
    padding-top: 1rem;

    label {
      color: ${({ theme }) => theme.colors.redL1};
    }
    span:first-child {
      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.greyD1};
    }

    span:last-child {
      font-size: ${({ isTotal }) => (isTotal ? '2' : '1.4')}rem;
      color: ${({ isTax, theme }) => (isTax ? theme.colors.redL1 : theme.colors.blackL1)};
      font-weight: bold;
    }
  `
};

export default RateAddPhase;
