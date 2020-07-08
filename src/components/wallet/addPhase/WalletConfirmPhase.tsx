import React from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import { IWalletForm } from '../../../models/IWalletForm';
import HeaderWithBack from '../../common/HeaderWithBack';
import { addComma } from '../../../support/util/String';
import { DATE_FORMAT, parseDate } from '../../../support/util/date';

type WalletConfirmPhaseProps = {
  isActivePhase: boolean;
  wallet: IWalletForm;
  goPrevPhase: () => void;
  onComplete: () => void;
};

function WalletConfirmPhase({ wallet, isActivePhase, goPrevPhase, onComplete }: WalletConfirmPhaseProps) {
  return (
    <PhaseTemplate active={isActivePhase}>
      <HeaderWithBack title='예/적금 작성'
                      onBackClick={goPrevPhase}/>
      <S.WalletConfirmPhase>
        <p>작성 정보 확인</p>
        <S.Card>
          <div>
            <S.CardItem>
              <span>예/적금 명</span>
              <p>{wallet.title}</p>
            </S.CardItem>
            <S.CardItem>
              <span>예/적금 액</span>
              <p>{addComma(wallet.amount)} 원</p>
            </S.CardItem>
            <S.CardRow>
              <S.CardItem>
                <span>예/적금 종류</span>
                <p>{wallet.type}</p>
              </S.CardItem>
              <S.CardItem>
                <span>만기시점</span>
                <p>{parseDate(wallet.endDate, DATE_FORMAT.YYYY_MM_DD)}</p>
              </S.CardItem>
            </S.CardRow>
          </div>
        </S.Card>
        <S.Info>
          <p>
            유의사항
          </p>
          <span>* 위의 카드에 있는 정보를 기준으로 생성합니다. 다시 한번 확인하시고 작성하기 버튼을 눌러주세요.</span>
          <span>* 작성하신 정보는 작성된 이후 그 어떠한 수정도 할수 없으며 변경을 원할시 삭제 후 다시 등록하셔야 됩니다.</span>
        </S.Info>
        <S.CompleteButton
          active
          onClick={onComplete}
        >
          예/적금 만들기
        </S.CompleteButton>
      </S.WalletConfirmPhase>
    </PhaseTemplate>

  );
}

const S: {
  WalletConfirmPhase: any;
  Card: any;
  CardItem: any;
  CardRow: any;
  Info: any;
  CompleteButton: any;
} = {
  WalletConfirmPhase: styled.div`
    height: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
    
    >p {
      margin-top: 2rem;
      font-size: 2rem;
      color: ${(props) => props.theme.colors.blackL1};
      margin-bottom: 1rem;
    }
  `,
  Card: styled.div`
    background-color: ${(props) => props.theme.colors.navyD1};
    color: ${(props) => props.theme.colors.white};
    border-radius: 1.2rem;
    
    >div{
      padding: 2rem;
    }
  `,
  CardItem: styled.div`
    margin-bottom: 2rem;
    span {
    font-size: 1.4rem;
      opacity: .5;
    };
    
  `,
  CardRow: styled.div`
    display: flex;
    justify-content: space-between;
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
     margin-bottom: .5rem;
     display: block;
     color: ${(props) => props.theme.colors.greyL1};
    }
  `,
  CompleteButton: styled.button`
    margin-top: auto;
    margin-bottom: 7.5rem;
    height: 5.5rem;
    width: 100%;
    border-radius: .8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
    opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `
};

export default WalletConfirmPhase;