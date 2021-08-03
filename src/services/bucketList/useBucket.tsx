import { useQuery } from 'react-query';
import { IBucket } from '@models/bucketList/IBucket';
import { fetchBucket } from '@support/api/bucketListApi';

export const initData: IBucket = {
  id: -1,
  title: '',
  description: '',
  completeDate: new Date(),
  userId: -1,
  isComplete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  todoList: []
};

export const createBucketKey = (id: number) => ['bucket', id];

function useBucket(bucketId: number) {
  const {
    data = initData,
    isFetching,
    isError
  } = useQuery<IBucket>(createBucketKey(bucketId), () => fetchBucket(bucketId));

  return {
    bucket: data,
    isLoading: isFetching,
    isError
  };
}

export default useBucket;
