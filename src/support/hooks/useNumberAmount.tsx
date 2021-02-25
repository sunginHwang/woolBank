import React, { useEffect, useState } from 'react';
import { addComma } from '@support/util/String';

const BILLION = 1000000000;

interface useNumberAmountProps {
  maxAmount?: number;
  currentAmount: number;
}

export function useNumberAmount({ maxAmount = BILLION, currentAmount }: useNumberAmountProps) {
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [amount, setAmount] = useState(currentAmount);

  // 금액 변경 이벤트
  const onChangeNumber = (num: number) => {
    // 최대 입금 가능 금액 체크
    const isOverMaxAmount = num > maxAmount;
    setIsValidAmount(!isOverMaxAmount);
    !isOverMaxAmount && setAmount(num);
  };

  // 금액 초기화
  const onInitAmount = () => {
    setAmount(0);
    setIsValidAmount(true);
  };

  // 금액 추가
  // eslint-disable-next-line no-undef
  const onAddAmount = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
    const addedNumber = Number(amount + String(e.currentTarget.innerText));
    onChangeNumber(addedNumber);
  };

  // 금액 한개 빼기
  const onBackAmount = () => {
    const stringNumber = String(amount);
    setAmount(Number(stringNumber.substring(0, stringNumber.length - 1)));
  };

  // 금액 변경 싱크 맞추기
  useEffect(() => {
    setAmount(currentAmount);
  }, [currentAmount]);

  const displayAmount = `${addComma(amount)}원`;

  return {
    onInitAmount,
    onAddAmount,
    onBackAmount,
    amount,
    displayAmount,
    isValidAmount
  };
}
