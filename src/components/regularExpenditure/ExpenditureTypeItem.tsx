import React, { useState } from 'react';
import styled from 'styled-components';

import palette from '@style/palette';
import IcoTrashCan from '@components/icon/IcoTrashCan';

const iconSize = 26;

function ExpenditureTypeItem() {
  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);

  const onItemTouchStart = (e: React.TouchEvent<HTMLLIElement>) => {
    setStartX(e.targetTouches[0].screenX || 0);
  };

  const onItemTouchMove = (e: React.TouchEvent<HTMLLIElement>) => {
    const moveX = e.targetTouches[0].screenX || 0;
    const calc = startX - moveX;
    setMoveX(calc < 0 ? 0 : calc > 200 ? 200 : calc);
  };

  const onItemTouchEnd = () => {
    if (moveX > 100 && moveX <= 200) {
      setMoveX(200);
    }

    setStartX(0);
  };

  return (
    <S.ExpenditureTypeItem onTouchStart={onItemTouchStart} onTouchMove={onItemTouchMove} onTouchEnd={onItemTouchEnd}>
      <S.Wrap x={moveX}>
        <S.Content>
          <div>
            <S.Left>
              <S.Title>리스트</S.Title>
              <S.Amount>20,102원</S.Amount>
            </S.Left>
            <S.Right>
              <span>3일전</span>
            </S.Right>
          </div>
        </S.Content>
        <S.Remove>
          <div>
            <IcoTrashCan width={iconSize} height={iconSize} fill={palette.greyD2} />
          </div>
        </S.Remove>
      </S.Wrap>
    </S.ExpenditureTypeItem>
  );
}

const S: {
  Wrap: any;
  Content: any;
  Remove: any;
  ExpenditureTypeItem: any;
  Left: any;
  Right: any;
  Title: any;
  Amount: any;
} = {
  ExpenditureTypeItem: styled.li`
    margin-top: 1rem;
    border-radius: 1.8rem;
    background-color: ${({ theme }) => theme.colors.greyL2};
    overflow: hidden;
    white-space: nowrap;
  `,
  Wrap: styled.div`
    width: auto;
    display: block;
    align-items: center;
    height: 100%;
    padding: 1.2rem 1.5rem;
    transition: transform 300ms ease;
    position: relative;
    transform: translateX(-${({ x }: { x: number }) => x * 0.3}px);

    > div {
      display: inline-block;
    }
  `,
  Content: styled.div`
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  Remove: styled.div`
    width: 20%;
    margin-left: 0.5rem;
    
    > div {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
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
  `
};

export default ExpenditureTypeItem;
