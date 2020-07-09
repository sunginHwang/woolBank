import { IAssetType } from './IAssetType';

export interface IWalletForm {
  title: string;
  savingType: IAssetType;
  startDate: string | Date;
  endDate: string | Date;
  amount: number;
  rate: number;
}
