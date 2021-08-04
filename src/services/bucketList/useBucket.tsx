import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IBucket } from '@models/bucketList/IBucket';
import { completeBucket, fetchBucket, removeBucket } from '@support/api/bucketListApi';
import { useToast } from '@support/hooks/useToast';
import { useConfirm } from '@components/common/Confirm/ConfirmService';
import { IBucketList } from '@models/IBucketList';
import { useHistory } from 'react-router';

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
    isError,
    isEmpty: data.id === initData.id && !isError
  };
}

export function useBucketQuerySetter(bucketId: number) {
  const queryClient = useQueryClient();
  const onToast = useToast();
  const history = useHistory();
  const { openConfirm, setConfirmLoading } = useConfirm();
  const removeMutate = useMutation(removeBucket);
  const completeMutation = useMutation(completeBucket);

  const onError = () => onToast('다시 시도해 주세요.');
  const onSettled = () => setConfirmLoading(false);

  const onRemoveBucket = async () => {
    const isConfirm = await openConfirm({ message: '정말 삭제하시겠습니까?', useAutoClose: false });

    if (isConfirm) {
      setConfirmLoading(true);
      removeMutate.mutate(bucketId, {
        onSuccess: () => {
          // 상세 페이지 및 리스트 페이지 캐시 싱크조정
          queryClient.setQueryData(createBucketKey(bucketId), initData);
          queryClient.setQueryData<IBucketList[]>('bucketList', (prev = []) => {
            return prev.filter(bucket => bucket.id !== bucketId);
          });
          onToast('삭제 되었습니다.');
          history.push('/bucket-list');
        },
        onError,
        onSettled
      })
    }
  }

  const onCompleteBucket = async () => {
    const isConfirm = await openConfirm({ message: '목표를 달성하시겠습니까?', useAutoClose: false });

    if (isConfirm) {
      setConfirmLoading(true);
      completeMutation.mutate(bucketId, {
        onSuccess: () => {
          // 상세 페이지 및 리스트 페이지 캐시 싱크조정
          queryClient.setQueryData<IBucket | undefined>(createBucketKey(bucketId), prev => {
            if (prev) {
              prev.isComplete = true;
            }
            return prev;
          });
          queryClient.setQueryData<IBucketList[]>('bucketList', (prev = []) => {
            return prev.map(bucket => {
              if (bucket.id === bucketId) {
                bucket.isComplete = true;
              }
              return bucket;
            });
          });
          onToast('목표를 달성하신걸 축하드립니다. :)');
        },
        onError,
        onSettled
      })
    }
  }

  return {
    onRemoveBucket,
    onCompleteBucket
  }
}

export default useBucket;
