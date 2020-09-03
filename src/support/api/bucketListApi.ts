import apiCall from '../util/apiCall';
import { ApiResType } from '../../models/api/ApiResType';
import { IBucketList } from '../../models/IBucketList';
import { IBucketListDetail } from '../../models/bucketList/IBucketListDetail';

export const fetchBucketList = async () => {
  return await apiCall.get<ApiResType<IBucketList>>('bucket-list');
};

export const fetchBucketListDetail = async (bucketListId: number) => {
  return await apiCall.get<ApiResType<IBucketListDetail>>(`bucket-list/${bucketListId}`);
};

export const getBucketListLastUpdatedAt = () => {
  return apiCall.get<ApiResType<Date>>('/bucket-list/last-update-date');
};

export const getBucketListDetailLastUpdatedAt = (bucketListId: number) => {
  return apiCall.get<ApiResType<Date>>(`/bucket-list/${bucketListId}/last-update-date`);
};
