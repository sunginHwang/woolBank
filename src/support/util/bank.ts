import { NORMAL_RATE_TAX, TAX_TYPE } from '../constants';
import { getRate } from './number';

export const getAmountWithoutTax = (amount: number, taxType: string) => {
  let result = amount;

  if (taxType === TAX_TYPE.NORMAL_TAX) {
    result = Number((amount - amount * NORMAL_RATE_TAX).toFixed(0));
  }

  return result;
};

type getInterestType = {
  amount: number;
  diffMonth: number;
  rate: number;
};
export const getInterest = ({
  amount,
  diffMonth,
  rate
}: getInterestType): number => {
  return amount * ((diffMonth + 1) / 2) * ((getRate(rate) * 0.01) / 12);
};
