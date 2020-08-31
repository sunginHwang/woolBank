import { IAssetType } from './IAssetType';
import { TAX_TYPE } from '../support/constants';
import { IDeposit } from './IDeposit';

export interface IAccount {
  id?: number;
  title: string; // 제목
  taxType: string | TAX_TYPE; // 세금종류
  regularTransferDate?: number; // 정기이체일
  rate: number; // 이율
  amount: number; // 만기금액
  currentAmount: number; // 현재까지 모은 금액
  userId: number; // 작성자 Id
  savingTypeId: number; // 적금타입 ID
  savingType: IAssetType; // 적금타입
  startDate: string | Date; // 시작일
  endDate: string | Date; // 만기일
  deposits?: IDeposit[];
  createdAt: Date; // 생성 시각
  updatedAt: Date; // 마지막 수정 시각
}
