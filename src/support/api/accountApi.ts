import { IAccount } from '../../models/IAccount';
import apiCall from '../util/apiCall';
import { ApiResType } from '../../models/api/ApiResType';

export const fetchAccountList = () => {
  return apiCall.get<ApiResType<IAccount[]>>('/accounts');
};

export const getAccountListLastUpdatedAt = () => {
  return apiCall.get<ApiResType<Date>>('/accounts/last-update-date');
};

export const fetchAccount = (accountId: number) => {
  return apiCall.get<ApiResType<IAccount>>(`/accounts/${accountId}`);
};

export const getAccountLastUpdatedAt = (accountId: number) => {
  return apiCall.get<ApiResType<Date>>(`/accounts/${accountId}/last-update-date`);
};
