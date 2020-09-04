import apiCall from '../util/apiCall';
import { ApiResType } from '../../models/api/ApiResType';
import { IBucketList } from '../../models/IBucketList';
import { IBucketListDetail } from '../../models/bucketList/IBucketListDetail';
import { IBucketListForm } from '../../models/bucketList/IBucketListForm';

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

export const saveBucketList = (bucketListForm: IBucketListForm) => {
  return apiCall.post('/bucket-list', {
    title: bucketListForm.title,
    description: bucketListForm.description,
    completeDate: bucketListForm.completeDate,
    thumbImageUrl: bucketListForm.thumbImageUrl,
    imageUrl: bucketListForm.imageUrl,
    todoList: bucketListForm.todoList
  });
};

export const removeBucketList = (bucketListId: number) => {
  return apiCall.delete<ApiResType<void>>(`/bucket-list/${bucketListId}/`);
};
