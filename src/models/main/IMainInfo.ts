import { IAccount } from '@models/account/IAccount';
import { IBucketList } from '@models/bucketList/IBucketList';

export interface IMainInfo {
  totalSavedAmount: number;
  totalSavedAmountExceptCurrentMonth: number;
  accounts: IAccount[];
  bucketList: IBucketList[];
}
