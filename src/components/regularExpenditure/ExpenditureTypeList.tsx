import React, { useState } from 'react';
import styled from 'styled-components';
import { addComma } from '@support/util/String';

export interface RegularAmountInfoProps {
  expenditureType: string;
}

function ExpenditureTypeList({ expenditureType }: RegularAmountInfoProps) {
  const totalExpenditureTypeAmount = 1030485;
  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);

  const onTouchS = (e: any) => {
    setStartX(e.targetTouches[0].screenX || 0);
  };

  const onTouchM = (e: any) => {
    const moveX = e.targetTouches[0].screenX || 0;
    const calc = startX - moveX;
    setMoveX(calc < 0 ? 0 : calc > 200 ? 200 : calc);
  };

  const onTouchEnd = (e: any) => {
    setStartX(0);
  };

  return (
    <S.ExpenditureTypeList>
      <S.TypeInfo>
        <S.TypeText>{expenditureType}</S.TypeText>
        <S.TotalAmount>
          <b>{addComma(totalExpenditureTypeAmount)}</b> 원
        </S.TotalAmount>
      </S.TypeInfo>
      <S.DummyList onTouchStart={onTouchS} onTouchMove={onTouchM} onTouchEnd={onTouchEnd}>
        <S.Wrap x={moveX}>
          <S.First>
            <div>
              <S.Left>
                <S.Title>리스트</S.Title>
                <S.Amount>20,102원</S.Amount>
              </S.Left>
              <S.Right>
                <span>3일전</span>
              </S.Right>
            </div>
          </S.First>
          <S.Second>
            <span>삭제하기</span>
          </S.Second>
        </S.Wrap>
      </S.DummyList>
    </S.ExpenditureTypeList>
  );
}

const S: {
  Wrap: any;
  First: any;
  Second: any;
  ExpenditureTypeList: any;
  TypeInfo: any;
  TypeText: any;
  TotalAmount: any;
  DummyList: any;
  Left: any;
  Right: any;
  Title: any;
  Amount: any;
} = {
  Wrap: styled.div`
    width: auto;
    display: block;
    height: 100%;
    padding: 1.2rem 1.5rem;
    transition: transform 300ms ease;
    position: relative;
    transform: translateX(-${({ x }: { x: number }) => x}px);
    white-space: nowrap;
    
    > div {
      display: inline-block;
    }
  `,
  First: styled.div`
    width: 100%;
    margin-right: 2rem;
    
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  Second: styled.div`
    width: 20%;
    background-color: red;
  `,
  Title: styled.span`
    color: ${({ theme }) => theme.colors.blackL1};
  `,
  Amount: styled.span`
    color: ${({ theme }) => theme.colors.greyD2};
    font-size: 1.2rem;
  `,
  Left: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Right: styled.div`
    span {
      padding: 0.5rem 1rem;
      background-color: ${({ theme }) => theme.colors.mainColor};
      border-radius: 1.3rem;
      color: ${({ theme }) => theme.colors.white};
      font-size: 1.2rem;
    }
  `,
  ExpenditureTypeList: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
  `,
  TypeInfo: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  `,
  TypeText: styled.span`
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.greyL1};
  `,
  TotalAmount: styled.span`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.blackL1};

    b {
      font-size: 1.4rem;
    }
  `,
  DummyList: styled.div`
    margin-top: 0.5rem;
    border-radius: 1.8rem;
    position: relative;
    background-color: ${({ theme }) => theme.colors.greyL2};
  `
};

export default ExpenditureTypeList;
