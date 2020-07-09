import React, { useCallback, useState } from 'react';
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
    // 최대 입금 가능 금액 10억 세팅
    if (addedNumber >= 1000000000) {
      setIsMaxAmount(true);
    } else {
      onChangeAmount(addedNumber);
    }
  };

  const onRemoveLastInput = () => {
    const stringNumber = String(currentAmount);
    onChangeAmount(Number(stringNumber.substring(0, stringNumber.length - 1)));
  };

  const getDisplayInputMessage = useCallback(() => {
    let result = `총 적금액 : ${numberToKorean(currentAmount)}원`;

    if (currentAmount === 0) {
      result = '금액을 입력해 주세요.';
    }

    if (isMaxAmount) {
      result = '입금액은 최대 10억까지 입니다.';
    }

    return result;


  }, [isMaxAmount, currentAmount]);

  const initNumber = () => onChangeAmount(0);
  const displayAmount = `${addComma(currentAmount)}원`;

  return (
    <S.NumberInput>
      <S.InputDisplay>
        <p>{displayAmount}</p>
        <S.InputDisplayMessage active={isMaxAmount}>{getDisplayInputMessage()}</S.InputDisplayMessage>
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
            <td onClick={onRemoveLastInput}>←</td>
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
  InputDisplayMessage: any;
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
  InputDisplayMessage: styled.span`
    font-size: 1.4rem;
    color: ${(props: any) => props.active ? props.theme.colors.redL1 : props.theme.colors.blackL1};
  `
};

export default NumberInput;
