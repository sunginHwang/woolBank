import { IAccount } from '../IAccount';
import { IBucketList } from '../IBucketList';

export interface IMainInfo {
  amount: number;
  accounts: IAccount[];
  bucketList: IBucketList[];
}
