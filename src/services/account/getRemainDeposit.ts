import { IAccount } from '@models/IAccount';

// 입금 가능한 액수 계산
function getRemainDeposit(account: IAccount) {
  return account.amount - account.currentAmount;
}

export default getRemainDeposit
