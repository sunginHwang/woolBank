import { INSTALLMENT_SAVINGS_TAX, NORMAL_RATE_TAX, PREFERENTIAL_TAX, SAVING_TYPE, TAX_TYPE } from '../constants';
import { diffMonth } from './date';
import { IWalletForm } from '../../models/IWalletForm';

export const getAmountWithTax = (amount: number, taxType: string) => {
  let result = amount;

  if (taxType === TAX_TYPE.NORMAL_TAX) {
    result = Number((amount - amount * NORMAL_RATE_TAX).toFixed(0));
  }

  if (taxType === TAX_TYPE.PREFERENTIAL_TAX) {
    result = Number((amount - amount * PREFERENTIAL_TAX).toFixed(0));
  }

  return Number(result.toFixed(0));
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
* 정기 적금 이율 계산
* */
export const getTimeSavingInterest = ({
                                        amount,
                                        savingPeriod,
                                        rate
                                      }: getInterestType): number => {
  return amount * ((savingPeriod + 1) / 2) * (rate / 12);
};

/*
* 정기 예금 이율 계산
* */
export const getFixedDepositInterest = ({
                                          amount,
                                          savingPeriod,
                                          rate
                                        }: getInterestType): number => {
  return (amount * (1 + rate * savingPeriod / 12)) - amount;
};

export const isTimeSavingType = (type: SAVING_TYPE | string) => {
  return type === SAVING_TYPE.FREE_INSTALLMENT_SAVINGS || type === SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS;
};

export const getSavingPartName = (type: SAVING_TYPE | string) => {
  return isTimeSavingType(type) ? '적금' : '예금';
};

export const getTaxTypeKo = (taxType: TAX_TYPE | string) => {
  const taxSavingType = INSTALLMENT_SAVINGS_TAX.find((savingTax) => savingTax.type === taxType);
  return taxSavingType && taxSavingType.name;
};

export const getRateInterestByWallet = (wallet: IWalletForm) => {
  const savingPeriod = diffMonth(wallet.startDate, wallet.endDate);
  const interest = getInterest({
    savingPeriod,
    amount: wallet.amount,
    rate: wallet.rate,
    savingType: wallet.savingType.type
  });

  return getAmountWithTax(interest, wallet.taxType);
};


