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
  const [isValidAmount, setIsValidAmount] = useState(true);

  const onAddNumberClick = (number: number) => {
    const addedNumber = Number(currentAmount + String(number));
    changeNumber(addedNumber);
  };

  const onRemoveLastInputClick = () => {
    const stringNumber = String(currentAmount);
    changeNumber(Number(stringNumber.substring(0, stringNumber.length - 1)));
  };

  const changeNumber = (num: number) => {
    // 최대 입금 가능 금액 10억 세팅
    const isOverTenBullion = num >= 1000000000;

    setIsValidAmount(!isOverTenBullion);
    !isOverTenBullion && onChangeAmount(num);
  };
  const onInitClick = () => changeNumber(0);

  const getDisplayInputMessage = useCallback(() => {
    let result = `총 적금액 : ${numberToKorean(currentAmount)}원`;

    if (currentAmount === 0) {
      result = '금액을 입력해 주세요.';
    }

    if (!isValidAmount) {
      result = '입금액은 최대 10억까지 입니다.';
    }

    return result;


  }, [isValidAmount, currentAmount]);

  const displayAmount = `${addComma(currentAmount)}원`;
  const displayInputMessage = getDisplayInputMessage();

  return (
    <S.NumberInput>
      <S.InputDisplay>
        <p>{displayAmount}</p>
        <S.InputDisplayMessage active={!isValidAmount}>{displayInputMessage}</S.InputDisplayMessage>
      </S.InputDisplay>
      <S.Input>
        <S.InputTable>
          <tbody>
          <tr>
            <td onClick={() => onAddNumberClick(1)}>1</td>
            <td onClick={() => onAddNumberClick(2)}>2</td>
            <td onClick={() => onAddNumberClick(3)}>3</td>
          </tr>
          <tr>
            <td onClick={() => onAddNumberClick(4)}>4</td>
            <td onClick={() => onAddNumberClick(5)}>5</td>
            <td onClick={() => onAddNumberClick(6)}>6</td>
          </tr>
          <tr>
            <td onClick={() => onAddNumberClick(7)}>7</td>
            <td onClick={() => onAddNumberClick(8)}>8</td>
            <td onClick={() => onAddNumberClick(9)}>9</td>
          </tr>
          <tr>
            <td onClick={onRemoveLastInputClick}>←</td>
            <td onClick={() => onAddNumberClick(0)}>0</td>
            <td onClick={onInitClick}>x</td>
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
