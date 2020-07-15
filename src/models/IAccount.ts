import { IAssetType } from './IAssetType';
import { TAX_TYPE } from '../support/constants';
import { IDepositRecord } from './IDepositRecord';

export interface IAccount {
  id?: number;
  title: string; // 제목
  savingType: IAssetType; // 적금타입
  startDate: string | Date; // 시작일
  endDate: string | Date; // 만기일
  taxType: string | TAX_TYPE; // 세금종류
  regularTransferDate?: number; // 정기이체일
  amount: number; // 만기금액
  currentAmount?: number; // 현재까지 모은 금액
  rate: number; // 이율
  depositRecords?: IDepositRecord[];
}
