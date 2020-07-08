export interface IWalletForm {
  title: string;
  type: string;
  startDate: string | Date;
  endDate: string | Date;
  amount: number;
  rate: number;
}