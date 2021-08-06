import React, { useState } from 'react';
import styled from 'styled-components';

import palette from '@style/palette';
import IcoTrashCan from '@components/icon/IcoTrashCan';
import { IRegularExpenditure } from '@models/accountBook/IRegularExpenditure';
import { addComma } from '@support/util/String';
import { getRemainDay } from '@support/util/date';

const iconSize = 26;

export interface IExpenditureTypeItemProps {
  // 정기지출 아이템
  regularExpenditure: IRegularExpenditure;
  // 정기지출 삭제
  onClickRemoveItem: (id: number) => void;
}
/**
 * 정기 지출 리스트 -> 정기 지출 리스트 아이탬
 * @component
 */

function ExpenditureTypeItem({ regularExpenditure, onClickRemoveItem }: IExpenditureTypeItemProps) {
  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);

  const onItemTouchStart = (e: React.TouchEvent<HTMLLIElement>) => {
    setStartX(e.targetTouches[0].screenX || 0);
  };

  const onItemTouchMove = (e: React.TouchEvent<HTMLLIElement>) => {
    const moveX = e.targetTouches[0].screenX || 0;
    const calc = startX - moveX;
    console.log('onMove');
    setMoveX(calc < 0 ? 0 : calc > 200 ? 200 : calc);
  };

  const onItemTouchEnd = () => {
    console.log(moveX);
    if (moveX > 50 && moveX <= 200) {
      console.log('this');
      console.log(moveX);
      setMoveX(200);
      return;
    }
    console.log('end');
    setMoveX(0);
  };

  const onRemoveClick = () => {
    onClickRemoveItem(id);
  };

  const { title, isAutoExpenditure, amount, id, regularExpenditureDay } = regularExpenditure;
  const { remainDayKo, remainDay } = getRemainDay(regularExpenditureDay, { completeMsg: '지출일' });
  const isAccentRemainDay = remainDay <= 3;
  return (
    <S.ExpenditureTypeItem onTouchStart={onItemTouchStart} onTouchMove={onItemTouchMove} onTouchEnd={onItemTouchEnd}>
      <S.Wrap x={moveX}>
        <S.Content>
          <div>
            <S.Left>
              <S.Title>
                <span>{title}</span>
                {isAutoExpenditure && <label>정기이체</label>}
              </S.Title>
              <S.Amount>{addComma(amount)}원</S.Amount>
            </S.Left>
            <S.Right isActive={isAccentRemainDay}>
              <span>{remainDayKo}</span>
            </S.Right>
          </div>
        </S.Content>
        <S.Remove>
          <div onClick={onRemoveClick}>
            <IcoTrashCan width={iconSize} height={iconSize} fill={palette.mainColor} />
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
    border: 0.1rem solid #e6e6e6;
    border-radius: 1.8rem;
    box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.1);
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
    transform: translateX(-${({ x }: { x: number }) => x * 0.1}%);

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
  Title: styled.div`
    display: flex;
    align-items: center;

    span {
      color: ${({ theme }) => theme.colors.blackL1};
      margin-right: 0.6rem;
    }
    label {
      font-size: 1rem;
      background-color: ${({ theme }) => theme.colors.subColor2};
      color: ${({ theme }) => theme.colors.mainColor};
      border-radius: 1.3rem;
      padding: 0.1rem 0.8rem;
      margin-bottom: 0.35rem;
    }
  `,
  Amount: styled.span`
    color: ${({ theme }) => theme.colors.greyD2};
    font-size: 1.2rem;
  `,
  Left: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Right: styled.div<{
    isActive: boolean;
  }>`
    span {
      color: ${({ theme, isActive }) => isActive ? theme.colors.mainColor : theme.colors.greyD2};
      font-weight: ${({ isActive }) => isActive ? 'bold' : 400};
      font-size: 1.3rem;
    }
  `
};

export default ExpenditureTypeItem;
