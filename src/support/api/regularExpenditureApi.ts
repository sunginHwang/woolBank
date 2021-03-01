import apiCall from '@support/util/apiCall';

import { ApiResType } from '@models/api/ApiResType';
import { IRegularExpenditure } from '@models/IRegularExpenditure';

export interface RegularExpenditureType {
  type: string;
  name: string;
  list: IRegularExpenditure[];
}
export const fetchRegularExpenditureList = () => {
  return apiCall.get<ApiResType<RegularExpenditureType[]>>('/regular-expenditures');
};

export const removeRegularExpenditure = (regularExpenditureId: number) => {
  return apiCall.delete<ApiResType<void>>(`/regular-expenditures/${regularExpenditureId}/`);
};
