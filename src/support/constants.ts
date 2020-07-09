import { IAssetType } from '../models/IAssetType';

export const NORMAL_RATE_TAX = 0.154;

export enum SAVING_TYPE {
  REGULAR_INSTALLMENT_SAVINGS = 'regularInstallmentSavings',
  FREE_INSTALLMENT_SAVINGS = 'freeInstallmentSavings',
  REGULAR_DEPOSIT = 'regularDeposit'
}

export enum TAX_TYPE {
  TAX_FREE = 'taxFree',
  NORMAL_TAX = 'normalTax'
}

export const INSTALLMENT_SAVINGS_TAX: IAssetType[] = [
  {
    type: TAX_TYPE.NORMAL_TAX,
    name: '일반과세'
  },
  {
    type: TAX_TYPE.TAX_FREE,
    name: '비과세'
  }
];

export const INSTALLMENT_SAVINGS: IAssetType[] = [
  {
    type: SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS,
    name: '정기적금'
  },
  {
    type: SAVING_TYPE.FREE_INSTALLMENT_SAVINGS,
    name: '자유적금'
  },
  {
    type: SAVING_TYPE.REGULAR_DEPOSIT,
    name: '정기예금'
  }
];
