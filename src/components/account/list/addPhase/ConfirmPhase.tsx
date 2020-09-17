import React from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../../common/PhaseTemplate';
import { addComma } from '../../../../support/util/String';
import { DATE_FORMAT, parseDate } from '../../../../support/util/date';
import {
  getRateInterestByWallet,
  getTaxTypeKo
} from '../../../../support/util/bank';
import DownSlide from '../../../common/DownSlide';
import BaseButton from '../../../common/BaseButton';
import { IPhase } from '../../../../models/phase/IPhase';
import { IAccountForm } from '../../../../models/IAccountForm';

interface WalletConfirmPhaseProps extends IPhase{
  accountForm: IAccountForm;
  loading: boolean;
  onComplete: () => void;
};

const ConfirmCardItem = ({
  title,
  value
}: {
  title: string;
  value: string;
}) => (
  <S.CardItem>
    <span>{title}</span>
    <p>{value}</p>
  </S.CardItem>
);

function ConfirmPhase({
  accountForm,
  loading,
  isActivePhase,
  goPrevPhase,
  onComplete
}: WalletConfirmPhaseProps) {
  const taxTypeKo = getTaxTypeKo(accountForm.taxType);
  // 만기이자
  const rateInterest = getRateInterestByWallet(accountForm);
  // 정기이체일 설정 여부
  const useRegularTransferDate = accountForm.regularTransferDate && accountForm.regularTransferDate > 0;

  return (
    <PhaseTemplate
      active={isActivePhase}
      title='작성 정보 확인'
      onBackClick={goPrevPhase}
    >
      <S.WalletConfirmPhase>
        <S.CardTitle>
          <p>{accountForm.title}</p>
        </S.CardTitle>
        <S.Card>
          <div>
            <S.CardAmountItem>
              <span>예상 만기액</span>
              <p>{addComma(accountForm.amount + rateInterest)} 원</p>
            </S.CardAmountItem>
            {useRegularTransferDate && (
              <ConfirmCardItem
                title='정기 이체 일'
                value={`${accountForm.rate} 일`}
              />
            )}
            <DownSlide>
              <ConfirmCardItem
                title='예상 만기 이자'
                value={`${addComma(rateInterest)} 원`}
              />
              <ConfirmCardItem
                title='예상 만기 원금'
                value={`${addComma(accountForm.amount)} 원`}
              />
            </DownSlide>
            <ConfirmCardItem
              title='적금 종류'
              value={accountForm.savingType.name}
            />
            <ConfirmCardItem title='세금 종류' value={taxTypeKo} />
            <ConfirmCardItem
              title='이율'
              value={`${(accountForm.rate * 100).toFixed(2)}%`}
            />
            <ConfirmCardItem
              title='만기일'
              value={parseDate(accountForm.endDate, DATE_FORMAT.YYYY_MM_DD)}
            />
          </div>
        </S.Card>
        <S.Info>
          <p>유의사항</p>
          <span>
            * 위의 카드에 있는 정보를 기준으로 생성합니다. 다시 한번 확인하시고
            작성하기 버튼을 눌러주세요.
          </span>
          <span>
            * 작성하신 정보는 작성된 이후 그 어떠한 수정도 할수 없으며 변경을
            원할시 삭제 후 다시 등록하셔야 됩니다.
          </span>
        </S.Info>
        <S.Complete>
          <BaseButton
            message='예/적금 만들기'
            color='red'
            size='full'
            loading={loading}
            onClick={onComplete}
            active
          />
        </S.Complete>
      </S.WalletConfirmPhase>
    </PhaseTemplate>
  );
}

const S: {
  WalletConfirmPhase: any;
  Card: any;
  CardTitle: any;
  CardAmountItem: any;
  CardItem: any;
  Info: any;
  Complete: any;
} = {
  WalletConfirmPhase: styled.div`
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
  `,
  CardTitle: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 2rem;
    margin-bottom: 1rem;

    > p {
      font-size: 1.8rem;
      color: ${(props) => props.theme.colors.blackL2};
      font-weight: bold;
    }
  `,
  Card: styled.div`
    background-color: ${(props) => props.theme.colors.mainColor};
    color: ${(props) => props.theme.colors.white};
    border-radius: 1.2rem;

    > div {
      padding: 2rem;
    }
  `,
  CardAmountItem: styled.div`
    display: flex;
    flex-direction: column;

    span:first-child {
      opacity: 0.5;
    }

    p {
      margin: 1rem 0;
      text-align: right;
      font-size: 3rem;
    }
  `,
  CardItem: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    span {
      font-size: 1.2rem;
      opacity: 0.5;
    }
  `,
  Info: styled.div`
    margin-top: 4rem;

    p {
      color: ${(props) => props.theme.colors.blackL1};
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    span {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      display: block;
      color: ${(props) => props.theme.colors.greyL1};
    }
  `,
  Complete: styled.div`
    margin-top: auto;
    margin-bottom: 2rem;
    height: 5.5rem;
    min-height: 5.5rem;
    width: 100%;
  `
};

export default ConfirmPhase;
