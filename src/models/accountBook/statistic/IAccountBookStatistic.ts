export interface IAccountBookStatisticListItem {
  title: string;
  amount: number;
  registerDateTime: Date;
}

// 가계부 통계 리스트 아이템
export interface IAccountBookStatistic {
  categoryId: number;
  categoryName: string;
  amount: number;
  percentage: number;
  list: IAccountBookStatisticListItem[];
}
