import { IAccount } from '@models/IAccount';
import { ApiResType } from '@models/api/ApiResType';
import { IAccountForm } from '@models/IAccountForm';
import apiCall from '@support/util/apiCall';

export const fetchAccountList = async (): Promise<IAccount[]> => {
  const response = await apiCall.get<ApiResType<IAccount[]>>('/accounts');
  return response.data.data;
};

export const getAccountListLastUpdatedAt = () => {
  return apiCall.get<ApiResType<Date>>('/accounts/last-update-date');
};

export const fetchAccount = async (accountId: number) => {
  const res = await apiCall.get<ApiResType<IAccount>>(`/accounts/${accountId}`);
  return res.data.data;
};

export const getAccountLastUpdatedAt = (accountId: number) => {
  return apiCall.get<ApiResType<Date>>(`/accounts/${accountId}/last-update-date`);
};

export const removeAccount = (accountId: number) => {
  return apiCall.delete<ApiResType<Date>>(`/accounts/${accountId}/`);
};

export const addDeposit = ({
  accountId,
  amount,
  depositDate
}: {
  accountId: number;
  amount: number;
  depositDate?: Date;
}) => {
  return apiCall.post<ApiResType<boolean>>(`/accounts/${accountId}/deposit`, {
    amount,
    depositDate
  });
};

export const expirationAccount = (accountId: number) => {
  return apiCall.put<ApiResType<boolean>>(`/accounts/${accountId}/expiration`);
};

export const saveAccount = (accountForm: IAccountForm) => {
  return apiCall.post('/accounts/', {
    title: accountForm.title,
    taxType: accountForm.taxType,
    regularTransferDate: accountForm.regularTransferDate,
    rate: accountForm.rate,
    amount: accountForm.amount,
    startDate: accountForm.startDate,
    endDate: accountForm.endDate,
    savingTypeId: accountForm.savingType.id
  });
};
