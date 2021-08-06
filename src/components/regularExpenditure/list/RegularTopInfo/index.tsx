import React from 'react';
import { differenceInCalendarDays } from 'date-fns';
import OneWeekAgoList from '@components/regularExpenditure/list/OneWeekAgoList';
import LineSeparator from '@components/common/LineSeparator';
import RegularAmountInfo from '@components/regularExpenditure/list/RegularAmountInfo';
import { RegularExpenditureType } from '@support/api/regularExpenditureApi';
import { IRegularExpenditure } from '@models/accountBook/IRegularExpenditure';

const now = new Date();
const oneWeekDay = 7;
export interface IRegularTopInfoProps {
  // 타입별 지출 리스트
  regularExpenditureTypeList: RegularExpenditureType[];
}
/**
 * 정기 지출 리스트 -> 상단 지출 정보 모음
 * @component
 */

function RegularTopInfo({ regularExpenditureTypeList }: IRegularTopInfoProps) {
  const flatRegularList = regularExpenditureTypeList.flatMap((item) => item.list);
  // 전체 지출 액
  const totalAmount = flatRegularList.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const oneWeekRemainList: IRegularExpenditure[] = flatRegularList
    .filter((item) => {
      const remainDay = differenceInCalendarDays(new Date(item.regularExpenditureDay), now);
      return remainDay >= 0 && remainDay <= oneWeekDay;
    })
    .sort((a, b) => a.regularDate - b.regularDate);

  return (
    <section>
      <RegularAmountInfo amount={totalAmount} />
      <OneWeekAgoList regularExpenditureList={oneWeekRemainList} />
      <LineSeparator />
    </section>
  );
}

export default RegularTopInfo;
