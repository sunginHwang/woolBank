import React from 'react';
import styled from 'styled-components';
import Button from '@components/atoms/Button';

export interface AmountInputProps {
  visible?: boolean;
  useCompleteBtn?: boolean;
  showInitBtn?: boolean;
  // 0원 여부
  isZeroAmount: boolean;
  onNumberClick: (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => void;
  onBackNumberClick: () => void;
  // 우측 최 하단 클릭
  onRightBottomClick: () => void;
}

function AmountInput({ useCompleteBtn = false, isZeroAmount, onNumberClick, onRightBottomClick, onBackNumberClick }: AmountInputProps) {

  return (
    <S.Input>
      <S.InputTable>
        <tbody>
          <tr>
            <S.InputTd data-cy='number_1' data-number={1} onClick={onNumberClick}>1</S.InputTd>
            <S.InputTd data-cy='number_2' data-number={2} onClick={onNumberClick}>2</S.InputTd>
            <S.InputTd data-cy='number_3' data-number={3} onClick={onNumberClick}>3</S.InputTd>
          </tr>
          <tr>
            <S.InputTd data-cy='number_4' data-number={4} onClick={onNumberClick}>4</S.InputTd>
            <S.InputTd data-cy='number_5' data-number={5} onClick={onNumberClick}>5</S.InputTd>
            <S.InputTd data-cy='number_6' data-number={6} onClick={onNumberClick}>6</S.InputTd>
          </tr>
          <tr>
            <S.InputTd data-cy='number_7' data-number={7} onClick={onNumberClick}>7</S.InputTd>
            <S.InputTd data-cy='number_8' data-number={8} onClick={onNumberClick}>8</S.InputTd>
            <S.InputTd data-cy='number_9' data-number={9} onClick={onNumberClick}>9</S.InputTd>
          </tr>
          <tr>
            <S.InputTd data-cy='numberBack' isHide={isZeroAmount}  onClick={onBackNumberClick}>
              {!isZeroAmount && '←'}
            </S.InputTd>
            <S.InputTd data-cy='number_0' data-number={0} onClick={onNumberClick}>0</S.InputTd>
            { useCompleteBtn && (
              <S.InputTd data-cy='numberComplete' isHide={isZeroAmount} isSmall={true} onClick={onRightBottomClick}>
                {!isZeroAmount && <S.SaveButton><Button message='확인' color='red' size='full'/></S.SaveButton>}
              </S.InputTd>)
            }
            {
              !useCompleteBtn && (
                <S.InputTd data-cy='numberX' isHide={isZeroAmount} onClick={onRightBottomClick}>
                  {!isZeroAmount && 'x'}
                </S.InputTd>)
            }
          </tr>
        </tbody>
      </S.InputTable>
    </S.Input>
  );
}

const S: {
  InputTable: any;
  InputTd: any;
  Input: any;
  SaveButton: any;
} = {
  SaveButton: styled.div`
    padding: 0 2rem;
    margin: -4px 0;
  `,
  Input: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `,
  InputTable: styled.table`
    width: 100%;
    text-align: center;
    flex: 1;
    color: ${({ theme }) => theme.colors.blackL1};
    height: 83%;
  `,
  InputTd: styled.td<{
    isHide: boolean;
    isSmall?: boolean;
  }>`
    font-size: 1.8rem;
    width: 33.33333%;
    padding: ${({ isSmall }) => (isSmall ? '.3rem' : '1rem')} 0;
    
    &:active {
      border-radius: 1.6rem;
      background-color: ${({ isHide, theme }) => (isHide ? theme.colors.white : theme.colors.greyL3)};
    }
  `,
};

export default AmountInput;
