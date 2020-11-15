import { INSTALLMENT_SAVINGS_TAX, NORMAL_RATE_TAX, PREFERENTIAL_TAX, SAVING_TYPE, TAX_TYPE } from '@support/constants';
import { diffMonth } from '@support/util/date';
import { IAccountForm } from '@models/IAccountForm';
import { IAccount } from '@models/IAccount';

export const getAmountWithTax = (amount: number, taxType: string) => {
  let result = amount;

  if (taxType === TAX_TYPE.NORMAL_TAX) {
    result = (amount - amount * NORMAL_RATE_TAX);
  }

  if (taxType === TAX_TYPE.PREFERENTIAL_TAX) {
    result = (amount - amount * PREFERENTIAL_TAX);
  }

  return Math.floor(result);
};

export const findSavingTax = (taxType: string): number => {
  if (taxType === TAX_TYPE.NORMAL_TAX) {
    return NORMAL_RATE_TAX;
  }

  if (taxType === TAX_TYPE.PREFERENTIAL_TAX) {
    return PREFERENTIAL_TAX;
  }

  return 0;
};

type getInterestType = {
  amount: number;
  savingPeriod: number;
  rate: number;
  savingType?: string;
};

export const getInterest = ({
  amount,
  savingPeriod,
  rate,
  savingType
}: getInterestType): number => {
  if (!savingType) {
    return 0;
  }
  return isTimeSavingType(savingType)
    ? getTimeSavingInterest({ amount, savingPeriod, rate })
    : getFixedDepositInterest({ amount, savingPeriod, rate });
};

/*
* 정기 적금 이자 계산
* */
export const getTimeSavingInterest = ({
  amount,
  savingPeriod,
  rate
}: getInterestType): number => {
  return Math.floor(amount * ((savingPeriod + 1) / 2) * (rate / 12));
};

/*
* 정기 예금 이자 계산
* */
export const getFixedDepositInterest = ({
  amount,
  savingPeriod,
  rate
}: getInterestType): number => {
  return Math.floor((amount * (1 + rate * savingPeriod / 12)) - amount);
};

export const isTimeSavingType = (type: SAVING_TYPE | string) => {
  return type === SAVING_TYPE.FREE_INSTALLMENT_SAVINGS || type === SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS;
};

export const getSavingPartName = (type: SAVING_TYPE | string) => {
  return isTimeSavingType(type) ? '적금' : '예금';
};

export const getTaxTypeKo = (taxType: TAX_TYPE | string): string => {
  const taxSavingType = INSTALLMENT_SAVINGS_TAX.find((savingTax) => savingTax.type === taxType);
  return taxSavingType ? taxSavingType.name : '';
};

export const getRateInterestByWallet = (accountForm: IAccountForm | IAccount) => {
  const savingPeriod = diffMonth(accountForm.startDate, accountForm.endDate);
  const interest = getInterest({
    savingPeriod,
    amount: accountForm.amount,
    rate: accountForm.rate,
    savingType: accountForm.savingType.type
  });

  return getAmountWithTax(interest, accountForm.taxType);
};
