import React, { useCallback, useState } from 'react';
import styled from 'styled-components/';
import { addComma, numberToKorean } from '../../support/util/String';
import IcoClose from '../icon/IcoClose';
import colors from '../../style/colors';
import BaseButton from './BaseButton';

type NumberInputProps = {
  currentAmount: number;
  maxAmount?: number;
  label: string;
  useClose?: boolean;
  loading?: boolean;
  isActiveComplete: boolean;
  onChangeAmount: (number: number) => void;
  onCompleteClick: () => void;
  onClose?: () => void;
};

const BILLION = 1000000000;

function NumberInput({
  currentAmount,
  maxAmount = BILLION,
  label,
  loading = false,
  useClose = false,
  isActiveComplete,
  onChangeAmount,
  onCompleteClick,
  onClose
}: NumberInputProps) {
  const [isValidAmount, setIsValidAmount] = useState(true);
  const isNotInputValue = currentAmount === 0;

  const displayAmount = `${addComma(currentAmount)}원`;

  const onAddNumberClick = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
    const addedNumber = Number(currentAmount + String(e.currentTarget.innerText));
    changeNumber(addedNumber);
  };

  const onRemoveLastInputClick = () => {
    const stringNumber = String(currentAmount);
    changeNumber(Number(stringNumber.substring(0, stringNumber.length - 1)));
  };

  // 금액 변경 이벤트
  const changeNumber = (num: number) => {
    // 최대 입금 가능 금액 체크
    const isOverMaxAmount = num > maxAmount;

    setIsValidAmount(!isOverMaxAmount);
    !isOverMaxAmount && onChangeAmount(num);
  };

  // 금액 초기화
  const onInitClick = () => {
    changeNumber(0);
    setIsValidAmount(true);
  };

  /**
   * 입력 창 닫기
   **/
  const onCloseClick = () => {
    onInitClick();
    onClose && onClose();
  };

  const getDisplayInputMessage = useCallback(() => {
    let result = `총 적금액 : ${numberToKorean(currentAmount)}원`;

    if (isNotInputValue) {
      result = '';
    }

    if (!isValidAmount) {
      result = `입금액은 최대 ${numberToKorean(maxAmount)}원 까지 입니다.`;
    }

    return result;
  }, [isValidAmount, currentAmount, maxAmount]);

  const displayInputMessage = getDisplayInputMessage();

  return (
    <S.NumberInput>
      {useClose && (
        <S.Header>
          <i onClick={onCloseClick}>
            <IcoClose width={30} height={30} fill={colors.colors.blackL1} />
          </i>
        </S.Header>
      )}
      <S.InputDisplay>
        <S.InputDisplayMessage>{label}</S.InputDisplayMessage>
        <p>{displayAmount}</p>
        <S.InputDisplayMessage active={!isValidAmount}>{displayInputMessage}</S.InputDisplayMessage>
      </S.InputDisplay>
      <S.Input>
        <S.InputTable>
          <tbody>
            <tr>
              <S.InputTd onClick={onAddNumberClick}>1</S.InputTd>
              <S.InputTd onClick={onAddNumberClick}>2</S.InputTd>
              <S.InputTd onClick={onAddNumberClick}>3</S.InputTd>
            </tr>
            <tr>
              <S.InputTd onClick={onAddNumberClick}>4</S.InputTd>
              <S.InputTd onClick={onAddNumberClick}>5</S.InputTd>
              <S.InputTd onClick={onAddNumberClick}>6</S.InputTd>
            </tr>
            <tr>
              <S.InputTd onClick={onAddNumberClick}>7</S.InputTd>
              <S.InputTd onClick={onAddNumberClick}>8</S.InputTd>
              <S.InputTd onClick={onAddNumberClick}>9</S.InputTd>
            </tr>
            <tr>
              <S.InputTd isHide={isNotInputValue} onClick={onRemoveLastInputClick}>
                {!isNotInputValue && '←'}
              </S.InputTd>
              <S.InputTd onClick={onAddNumberClick}>0</S.InputTd>
              <S.InputTd isHide={isNotInputValue} onClick={onInitClick}>
                {!isNotInputValue && 'x'}
              </S.InputTd>
            </tr>
          </tbody>
        </S.InputTable>
      </S.Input>
      <S.Complete>
        <BaseButton
          message='완료'
          color='red'
          size='full'
          loading={loading}
          active={isActiveComplete}
          onClick={onCompleteClick}
        />
      </S.Complete>
    </S.NumberInput>
  );
}

const S: {
  NumberInput: any;
  Header: any;
  InputTable: any;
  InputTd: any;
  Input: any;
  InputDisplay: any;
  InputDisplayMessage: any;
  Complete: any;
} = {
  NumberInput: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Header: styled.div`
    height: 5.5rem;
    min-height: 5.5rem;
    padding: 0 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  Input: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `,
  InputDisplay: styled.div`
    height: 34%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > p {
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
    height: 83%;
  `,
  InputTd: styled.td`
    font-size: 2.8rem;
    width: 33.33333%;

    &:active {
      border-radius: 1.6rem;
      background-color: ${(props: any) => (props.isHide ? props.theme.colors.white : props.theme.colors.greyL3)};
    }
  `,
  Complete: styled.div`
    width: calc(100% - 4rem);
    margin-top: auto;
    margin: 2rem;
    height: 5.5rem;
    min-height: 5.5rem;
  `,
  InputDisplayMessage: styled.span`
    font-size: 1.4rem;
    height: 2.1rem;
    margin-top: 1rem;
    color: ${(props: any) => (props.active ? props.theme.colors.redL1 : props.theme.colors.blackL1)};
  `
};

export default NumberInput;
