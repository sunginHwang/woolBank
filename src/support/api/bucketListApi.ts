import apiCall from '@support/util/apiCall';
import { ApiResType } from '@models/api/ApiResType';
import { IBucketList } from '@models/IBucketList';
import { IBucketListDetail } from '@models/bucketList/IBucketListDetail';
import { IBucketListForm } from '@models/bucketList/IBucketListForm';

export const fetchBucketList = async () => {
  const result = await apiCall.get<ApiResType<IBucketList[]>>('bucket-list');
  return result.data.data;
};

export const fetchBucketListByPass = async () => {
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

export const saveBucketList = async (bucketListForm: IBucketListForm) => {
  const data = await new FormData();
  data.append('title', bucketListForm.title);
  data.append('description', bucketListForm.description);
  data.append('completeDate', bucketListForm.completeDate);
  data.append('todoList', JSON.stringify(bucketListForm.todoList));

  if (bucketListForm.mainImgFile) {
    await data.append('image', bucketListForm.mainImgFile);
  }

  return apiCall.post('/bucket-list', data);
};

export const updateBucketList = async (bucketListForm: IBucketListForm) => {
  const data = await new FormData();
  data.append('title', bucketListForm.title);
  data.append('description', bucketListForm.description);
  data.append('completeDate', bucketListForm.completeDate);

  if (bucketListForm.mainImgFile) {
    await data.append('image', bucketListForm.mainImgFile);
  }

  return apiCall.put(`/bucket-list/${bucketListForm.id}`, data);
};

export const removeBucketList = (bucketListId: number) => {
  return apiCall.delete<ApiResType<void>>(`/bucket-list/${bucketListId}/`);
};

export const completeBucketList = (bucketListId: number) => {
  return apiCall.put<ApiResType<void>>(`/bucket-list/${bucketListId}/complete`);
};
