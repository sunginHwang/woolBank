import { IAssetType } from './IAssetType';
import { TAX_TYPE } from '../support/constants';

export interface IWalletForm {
  title: string;
  savingType: IAssetType;
  startDate: string | Date;
  endDate: string | Date;
  taxType: string | TAX_TYPE;
  amount: number;
  rate: number;
}
