import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import IcoClose from '@components/atoms/icon/IcoClose';
import Button from '@components/atoms/Button';
import palette from '@style/palette';
import { addComma, numberToKorean } from '@support/util/String';
import useUpdateEffect from '@support/hooks/useUpdateEffect';

const BILLION = 1_000_000_000;

interface IProps {
  value?: number;
  maxAmount?: number;
  label: string;
  useClose?: boolean;
  loading?: boolean;
  onAmountChange: (amount: number) => void;
  isResetValue?: boolean;
  onClose?: () => void;
}

/**
 * 금액 입금 키패드
 * @component
 */

function AmountKeyPad(props: IProps) {
  const {
    value = 0,
    maxAmount = BILLION,
    label,
    loading = false,
    useClose = false,
    isResetValue,
    onAmountChange,
    onClose
  } = props;

  const [amount, setAmount] = useState(value);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const isNotInputValue = amount === 0;

  useUpdateEffect(() => {
    setAmount(value);
  }, [value]);

  // 금액 초기화 처리
  useUpdateEffect(() => {
    if (isResetValue) {
      setAmount(0);
    }
  }, [isResetValue]);

  // 금액 클릭
  const onAddNumberClick = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
    const addedNumber = Number(amount + String(e.currentTarget.innerText));
    changeNumber(addedNumber);
  };

  // 마지막 숫자 제거
  const onRemoveLastInputClick = () => {
    const stringNumber = String(amount);
    changeNumber(Number(stringNumber.substring(0, stringNumber.length - 1)));
  };

  // 금액 변경 이벤트
  const changeNumber = (num: number) => {
    // 최대 입금 가능 금액 체크
    const isOverMaxAmount = num > maxAmount;

    setIsValidAmount(!isOverMaxAmount);
    !isOverMaxAmount && setAmount(num);
  };

  // 금액 초기화
  const onInitClick = () => {
    changeNumber(0);
    setIsValidAmount(true);
  };

  // 입력 창 닫기
  const onCloseClick = () => {
    onInitClick();
    onClose?.();
  };

  const onCompleteClick = useCallback(() => {
    onAmountChange(amount);
  }, [amount, onAmountChange]);

  const getDisplayInputMessage = useCallback(() => {
    let result = `총 적금액 : ${numberToKorean(amount)}원`;

    if (isNotInputValue) {
      result = '';
    }

    if (!isValidAmount) {
      result = `입금액은 최대 ${numberToKorean(maxAmount)}원 까지 입니다.`;
    }

    return result;
  }, [isValidAmount, isNotInputValue, amount, maxAmount]);

  const displayInputMessage = getDisplayInputMessage();
  const displayAmount = `${addComma(amount)}원`;

  return (
    <S.AmountKeyPad>
      {useClose && (
        <S.Header>
          <i onClick={onCloseClick}>
            <IcoClose width={30} height={30} fill={palette.blackL1} />
          </i>
        </S.Header>
      )}
      <S.InputDisplay>
        <S.InputDisplayMessage active={false}>{label}</S.InputDisplayMessage>
        <p>{displayAmount}</p>
        <S.InputDisplayMessage active={!isValidAmount}>{displayInputMessage}</S.InputDisplayMessage>
      </S.InputDisplay>
      <S.Input>
        <S.InputTable>
          <tbody>
            <tr>
              <S.InputTd data-cy='number_1' onClick={onAddNumberClick}>
                1
              </S.InputTd>
              <S.InputTd data-cy='number_2' onClick={onAddNumberClick}>
                2
              </S.InputTd>
              <S.InputTd data-cy='number_3' onClick={onAddNumberClick}>
                3
              </S.InputTd>
            </tr>
            <tr>
              <S.InputTd data-cy='number_4' onClick={onAddNumberClick}>
                4
              </S.InputTd>
              <S.InputTd data-cy='number_5' onClick={onAddNumberClick}>
                5
              </S.InputTd>
              <S.InputTd data-cy='number_6' onClick={onAddNumberClick}>
                6
              </S.InputTd>
            </tr>
            <tr>
              <S.InputTd data-cy='number_7' onClick={onAddNumberClick}>
                7
              </S.InputTd>
              <S.InputTd data-cy='number_8' onClick={onAddNumberClick}>
                8
              </S.InputTd>
              <S.InputTd data-cy='number_9' onClick={onAddNumberClick}>
                9
              </S.InputTd>
            </tr>
            <tr>
              <S.InputTd data-cy='numberBack' isHide={isNotInputValue} onClick={onRemoveLastInputClick}>
                {!isNotInputValue && '←'}
              </S.InputTd>
              <S.InputTd data-cy='number_0' onClick={onAddNumberClick}>
                0
              </S.InputTd>
              <S.InputTd isHide={isNotInputValue} onClick={onInitClick} data-cy='numberX'>
                {!isNotInputValue && 'x'}
              </S.InputTd>
            </tr>
          </tbody>
        </S.InputTable>
      </S.Input>
      <S.Complete>
        <Button
          message='완료'
          color='red'
          size='full'
          name='completeNumber'
          loading={loading}
          active={amount > 0 && amount <= maxAmount}
          onClick={onCompleteClick}
        />
      </S.Complete>
    </S.AmountKeyPad>
  );
}

type InputTdProps = { isHide?: boolean };
const S = {
  AmountKeyPad: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.white};
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
      color: ${({ theme }) => theme.colors.blackL1};
    }
  `,
  InputTable: styled.table`
    width: 100%;
    text-align: center;
    flex: 1;
    color: ${({ theme }) => theme.colors.blackL1};
    height: 83%;
  `,
  InputTd: styled.td<InputTdProps>`
    font-size: 2.8rem;
    width: 33.33333%;

    &:active {
      border-radius: 1.6rem;
      background-color: ${({ isHide, theme }) => (isHide ? theme.colors.white : theme.colors.greyL3)};
    }
  `,
  Complete: styled.div`
    width: calc(100% - 4rem);
    margin-top: auto;
    margin: 2rem;
    height: 5.5rem;
    min-height: 5.5rem;
  `,
  InputDisplayMessage: styled.span<{ active: boolean }>`
    font-size: 1.4rem;
    height: 2.1rem;
    margin-top: 1rem;
    color: ${({ active, theme }) => (active ? theme.colors.redL1 : theme.colors.blackL1)};
  `
};

export default AmountKeyPad;
