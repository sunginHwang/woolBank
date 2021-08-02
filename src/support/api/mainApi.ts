import apiCall from '@support/util/apiCall';
import { IMainInfo } from '@models/main/IMainInfo';
import { ApiResType } from '@models/api/ApiResType';

export const fetchMainInfo = async (): Promise<IMainInfo> => {
  const res = await apiCall.get<ApiResType<IMainInfo>>('main');
  return res.data.data;
};
