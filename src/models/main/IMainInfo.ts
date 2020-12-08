import { IAccount } from '@models/IAccount';
import { IBucketList } from '@models/IBucketList';

export interface IMainInfo {
  totalSavedAmount: number;
  totalSavedAmountExceptCurrentMonth: number;
  accounts: IAccount[];
  bucketList: IBucketList[];
}
