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
  PREFERENTIAL_TAX = 'preferentialTax'
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

export const PIE_CHART_COLOR_LIST: string[] = [
  '#F47560',
  '#36A2EB',
  '#f1e15b',
  '#4BC0C0',
  '#9966FF',
  '#379F7A',
  '#CC2738',
  '#8B628A',
  '#8FBE00',
  '#606060',
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#f39c12',
  '#F44336',
  '#CDDC39',
  '#00A8C6',
  '#00BCD4'
];
