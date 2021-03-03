import apiCall from '@support/util/apiCall';

import { ApiResType } from '@models/api/ApiResType';
import { IRegularExpenditure } from '@models/IRegularExpenditure';
import { SaveRegularForm } from '@containers/regularExpenditure/add/SaveRegularExpenditureContainer/reducer';

export interface RegularExpenditureType {
  type: string;
  name: string;
  list: IRegularExpenditure[];
}

export const API_URL = {
  GET_REGULAR_EXPENDITURE_LIST: '/regular-expenditures',
  GET_EXPENDITURE_TYPE_LIST: '/regular-expenditures/types',
  REMOVE_REGULAR_EXPENDITURE: '/regular-expenditures',
  SAVE_REGULAR_EXPENDITURE: '/regular-expenditures'
};

export const fetchRegularExpenditureList = () => {
  return apiCall.get<ApiResType<RegularExpenditureType[]>>(API_URL.GET_REGULAR_EXPENDITURE_LIST);
};

export const removeRegularExpenditure = (regularExpenditureId: number) => {
  return apiCall.delete<ApiResType<void>>(`${API_URL.REMOVE_REGULAR_EXPENDITURE}/${regularExpenditureId}/`);
};

export const saveRegularExpenditure = (regularExpenditure: SaveRegularForm) => {
  console.log(regularExpenditure);
  return apiCall.post<ApiResType<void>>(`${API_URL.SAVE_REGULAR_EXPENDITURE}`, { ...regularExpenditure });
};
