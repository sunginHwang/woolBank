export interface IDeposit {
  id: number;
  amount: number;
  prevTotalAmount: number;
  userId: number;
  accountId: number;
  depositDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
