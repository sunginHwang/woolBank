import { IAssetType } from '@models/IAssetType';

export const NORMAL_RATE_TAX = 0.154;
export const PREFERENTIAL_TAX = 0.095;

export enum SAVING_TYPE {
  REGULAR_INSTALLMENT_SAVINGS = 'regularInstallmentSavings',
  FREE_INSTALLMENT_SAVINGS = 'freeInstallmentSavings',
  REGULAR_DEPOSIT = 'regularDeposit'
}

export enum TAX_TYPE {
  TAX_FREE = 'taxFree',
  NORMAL_TAX = 'normalTax',
  PREFERENTIAL_TAX = 'preferentialTax',

}

export const INSTALLMENT_SAVINGS_TAX: IAssetType[] = [
  {
    type: TAX_TYPE.NORMAL_TAX,
    name: '일반과세'
  },
  {
    type: TAX_TYPE.TAX_FREE,
    name: '비과세'
  },
  {
    type: TAX_TYPE.PREFERENTIAL_TAX,
    name: '세금우대'
  }
];

export const INSTALLMENT_SAVINGS: IAssetType[] = [
  {
    id: 1,
    type: SAVING_TYPE.REGULAR_INSTALLMENT_SAVINGS,
    name: '정기적금'
  },
  {
    id: 2,
    type: SAVING_TYPE.FREE_INSTALLMENT_SAVINGS,
    name: '자유적금'
  },
  {
    id: 3,
    type: SAVING_TYPE.REGULAR_DEPOSIT,
    name: '정기예금'
  }
];
