import React, { useState } from 'react';
import styled from 'styled-components/';
import { addComma, numberToKorean } from '../../support/util/String';

type NumberInputProps = {
  currentAmount: number;
  isActiveComplete: boolean;
  onChangeAmount: (number: number) => void;
  onCompleteClick: () => void;
};

function NumberInput({
  currentAmount,
  isActiveComplete,
  onChangeAmount,
  onCompleteClick
}: NumberInputProps) {
  const [isMaxAmount, setIsMaxAmount] = useState(false);
  const addNumber = (number: number) => {
    const addedNumber = Number(currentAmount + String(number));

    if (addedNumber >= 1000000000) {
      setIsMaxAmount(true);
    } else {
      onChangeAmount(addedNumber);
    }
  };
  const removeLastInput = () => {
    const stringNumber = String(currentAmount);
    onChangeAmount(Number(stringNumber.substring(0, stringNumber.length - 1)));
  };

  const initNumber = () => onChangeAmount(0);

  const displayAmount = `${addComma(currentAmount)}원`;
  const displayKoreanAmount = `총 적금액 : ${numberToKorean(currentAmount)}원`;
  const isDisplayKoreanAmount = currentAmount > 0 && !isMaxAmount;
  return (
    <S.NumberInput>
      <S.InputDisplay>
        <p>{displayAmount}</p>
        {isDisplayKoreanAmount && <span>{displayKoreanAmount}</span>}
        {isMaxAmount && <S.AlertMessage>입금액은 최대 10억까지 입니다.</S.AlertMessage>}
      </S.InputDisplay>
      <S.Input>
        <S.InputTable>
          <tbody>
            <tr>
              <td onClick={() => addNumber(1)}>1</td>
              <td onClick={() => addNumber(2)}>2</td>
              <td onClick={() => addNumber(3)}>3</td>
            </tr>
            <tr>
              <td onClick={() => addNumber(4)}>4</td>
              <td onClick={() => addNumber(5)}>5</td>
              <td onClick={() => addNumber(6)}>6</td>
            </tr>
            <tr>
              <td onClick={() => addNumber(7)}>7</td>
              <td onClick={() => addNumber(8)}>8</td>
              <td onClick={() => addNumber(9)}>9</td>
            </tr>
            <tr>
              <td onClick={removeLastInput}>←</td>
              <td onClick={() => addNumber(0)}>0</td>
              <td onClick={initNumber}>x</td>
            </tr>
          </tbody>
        </S.InputTable>
        <S.Complete active={isActiveComplete} onClick={onCompleteClick}>
          완료
        </S.Complete>
      </S.Input>
    </S.NumberInput>
  );
}

const S: {
  NumberInput: any;
  InputTable: any;
  Input: any;
  InputDisplay: any;
  AlertMessage: any;
  Complete: any;
} = {
  NumberInput: styled.div`
    width: 100%;
    height: calc(100% - 5.5rem);
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Input: styled.div`
    margin-top: auto;
  `,
  InputDisplay: styled.div`
    height: 10rem;
    margin: 4rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >p {
      font-size: 4.5rem;
      font-weight: bold;
      color: ${(props) => props.theme.colors.blackL1};
    }

    >span {
      font-size: 1.4rem;
      color: ${(props) => props.theme.colors.greyL1};
    }
  `,
  InputTable: styled.table`
    width: 100%;
    text-align: center;
    flex: 1;
    color: ${(props) => props.theme.colors.blackL1};

    td {
      font-size: 2.8rem;
      height: 10rem;
      width: 33.33333%;
    }

    td:active {
      border-radius: 1.6rem;
      background-color: ${(props) => props.theme.colors.greyL3};
    }
  `,
  Complete: styled.button`
    width: calc(100% - 2rem);
    height: 5rem;
    margin: 4rem 1rem 2rem 1rem;
    border-radius: 0.8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.navyD1};
    opacity: ${(props: any) => (props.active ? 1 : 0.5)};
  `,
  AlertMessage: styled.span`
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.redL1};
  `
};

export default NumberInput;
