import React, { useCallback } from 'react';
import styled from 'styled-components';

export interface AmountInputProps {
  visible?: boolean;
  showBackBtn?: boolean;
  showInitBtn?: boolean;
  onNumberClick: (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => void;
  onRemoveLastNumber: () => void;
  onInit: () => void;
}

function AmountInput({ showBackBtn = true, showInitBtn = true, onNumberClick, onInit, onRemoveLastNumber }: AmountInputProps) {

  const onRemoveLastNumberClick = useCallback(() => {
    showBackBtn && onRemoveLastNumber()
  },[ showBackBtn, onRemoveLastNumber ]);

  const onInitClick = useCallback(() => {
    showInitBtn && onInit()
  },[ showInitBtn, onInit ]);

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
            <S.InputTd data-cy='numberBack' isHide={!showBackBtn}  onClick={onRemoveLastNumberClick}>
              {showBackBtn && '←'}
            </S.InputTd>
            <S.InputTd data-cy='number_0' data-number={0} onClick={onNumberClick}>0</S.InputTd>
            <S.InputTd data-cy='numberX' isHide={!showInitBtn} onClick={onInitClick}>
              {showInitBtn && 'x'}
            </S.InputTd>
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
} = {
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
  }>`
    font-size: 1.8rem;
    width: 33.33333%;
    padding: 1rem 0;

    &:active {
      border-radius: 1.6rem;
      background-color: ${({ isHide, theme }) => (isHide ? theme.colors.white : theme.colors.greyL3)};
    }
  `,
};

export default AmountInput;
