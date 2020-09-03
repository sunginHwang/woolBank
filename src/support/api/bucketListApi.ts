import apiCall from '../util/apiCall';
import { ApiResType } from '../../models/api/ApiResType';
import { IBucketList } from '../../models/IBucketList';

export const fetchBucketList = async () => {
  return await apiCall.get<ApiResType<IBucketList>>('bucket-list');
};

export const getBucketListLastUpdatedAt = () => {
  return apiCall.get<ApiResType<Date>>('/bucket-list/last-update-date');
};
