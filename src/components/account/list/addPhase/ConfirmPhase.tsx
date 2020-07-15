import React from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../../common/PhaseTemplate';
import { IAccount } from '../../../../models/IAccount';
import { addComma } from '../../../../support/util/String';
import { DATE_FORMAT, parseDate } from '../../../../support/util/date';
import {
  getRateInterestByWallet,
  getTaxTypeKo
} from '../../../../support/util/bank';
import DownSlide from '../../../common/DownSlide';

type WalletConfirmPhaseProps = {
  isActivePhase: boolean;
  account: IAccount;
  goPrevPhase: () => void;
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
  account,
  isActivePhase,
  goPrevPhase,
  onComplete
}: WalletConfirmPhaseProps) {
  const taxTypeKo = getTaxTypeKo(account.taxType);
  // 만기이자
  const rateInterest = getRateInterestByWallet(account);
  // 정기이체일 설정 여부
  const useRegularTransferDate = account.regularTransferDate && account.regularTransferDate > 0;
  return (
    <PhaseTemplate
      active={isActivePhase}
      title='작성 정보 확인'
      onBackClick={goPrevPhase}
    >
      <S.WalletConfirmPhase>
        <S.CardTitle>
          <p>{account.title}</p>
        </S.CardTitle>
        <S.Card>
          <div>
            <S.CardAmountItem>
              <span>예상 만기액</span>
              <p>{addComma(account.amount + rateInterest)} 원</p>
            </S.CardAmountItem>
            {useRegularTransferDate && (
              <ConfirmCardItem
                title='정기 이체 일'
                value={`${account.rate} 일`}
              />
            )}
            <DownSlide>
              <ConfirmCardItem
                title='예상 만기 이자'
                value={`${addComma(rateInterest)} 원`}
              />
              <ConfirmCardItem
                title='예상 만기 원금'
                value={`${addComma(account.amount)} 원`}
              />
            </DownSlide>
            <ConfirmCardItem
              title='적금 종류'
              value={account.savingType.name}
            />
            <ConfirmCardItem title='세금 종류' value={taxTypeKo} />
            <ConfirmCardItem
              title='이율'
              value={`${(account.rate * 100).toFixed(2)}%`}
            />
            <ConfirmCardItem
              title='만기일'
              value={parseDate(account.endDate, DATE_FORMAT.YYYY_MM_DD)}
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
        <S.CompleteButton active onClick={onComplete}>
          예/적금 만들기
        </S.CompleteButton>
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
  CompleteButton: any;
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
      font-size: 2rem;
      color: ${(props) => props.theme.colors.blackL1};
    }
  `,
  Card: styled.div`
    background-color: ${(props) => props.theme.colors.navyD1};
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
      font-size: 1.4rem;
      opacity: 0.5;
    }
  `,
  Info: styled.div`
    margin-top: 4rem;

    p {
      color: ${(props) => props.theme.colors.blackL1};
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    span {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      display: block;
      color: ${(props) => props.theme.colors.greyL1};
    }
  `,
  CompleteButton: styled.button`
    margin-top: auto;
    margin-bottom: 2rem;
    height: 5.5rem;
    min-height: 5.5rem;
    width: 100%;
    border-radius: 0.8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
    opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `
};

export default ConfirmPhase;
