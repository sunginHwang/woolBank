import { IAssetType } from '@models/IAssetType';

export type IAccountForm = {
  title: string;
  taxType: string;
  regularTransferDate: number;
  rate: number;
  amount: number;
  startDate: Date | string;
  endDate: Date | string;
  savingType: IAssetType;
};
