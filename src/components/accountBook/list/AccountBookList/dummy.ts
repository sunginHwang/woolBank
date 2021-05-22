import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';

export const DummyAccountBookList: IAccountBookListItem[] = [
  {
    id: 111,
    title: '오늘날짜 테스트 구매',
    isRegularExpenditure: true,
    categoryName: '취미생활',
    amount: 50000,
    registerDateTime: new Date()
  },
  {
    id: 1,
    title: '피규어 구매',
    isRegularExpenditure: false,
    categoryName: '취미생활',
    amount: 50000,
    registerDateTime: new Date(2021, 5, 3,11,30)
  },
  {
    id: 2,
    title: '교통비',
    isRegularExpenditure: false,
    categoryName: '차비',
    amount: 3020,
    registerDateTime: new Date(2021, 5, 3, 12, 40)
  },
];
