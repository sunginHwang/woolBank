import { IAccount } from '@models/IAccount';
import { IBucketList } from '@models/IBucketList';

export interface IMainInfo {
  amount: number;
  accounts: IAccount[];
  bucketList: IBucketList[];
}
