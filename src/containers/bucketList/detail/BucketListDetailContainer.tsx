import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import BucketListDetailHeader from '@components/bucketList/detail/BucketListDetailHeader';
import BucketListContentInfo from '@components/bucketList/detail/BucketListContentInfo';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import BottomButton from '@components/common/BottomButton';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import {
  completeBucketList,
  getBucketListDetailLastUpdatedAt,
  removeBucketList
} from '@support/api/bucketListApi';
import useRequest from '@support/hooks/useRequest';
import { useToast } from '@support/hooks/useToast';
import { useToggle } from '@support/hooks/useToggle';
import { checkNeedReFetch } from '@support/util/checkNeedReFetch';
import { RootState } from '@/store';
import BucketList, { getBucketList, getBucketListDetail } from '@/store/modules/BucketList';
import { IBottomMenu } from '@models/component/IBottomMenu';

const bottomMenus: IBottomMenu[] = [
  {
    type: 'remove',
    value: '삭제하기'
  },
  {
    type: 'edit',
    value: '수정하기'
  }
];

type BucketListDetailContainerProps = {
  bucketListId: number;
};

function BucketListDetailContainer({ bucketListId }: BucketListDetailContainerProps) {
  const [showRemoveModal, onRemoveModal, offRemoveModal] = useToggle(false);
  const [showMenuModal, onMenuModal, offMenuModal] = useToggle(false);

  const onToast = useToast();
  const [onRemoveRequest, removeLoading] = useRequest(removeBucketList);
  const [onCompleteRequest, completeLoading] = useRequest(completeBucketList);
  const bucketListDetail = useSelector((state: RootState) => state.BucketList.bucketListDetail);
  const bucketListDetailDetailCache = useSelector((state: RootState) => state.BucketList.bucketListDetailCache);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    onLoadBucketListDetail(bucketListId);

    return () => {
      // 리스트 -> 상세 재 진입시 이전 상세 데이터가 잠시 보이는 부분이 있어 삭제 처리
      dispatch(BucketList.actions.clearBucketListDetail());
    };
  }, [bucketListId, dispatch]);

  /**
   * 버킷 리스트 상세 정보 조회
   */
  const onLoadBucketListDetail = async (id: number) => {
    // 1. 캐싱 정보 조회
    const bucketListDetail = bucketListDetailDetailCache.find((bucketList) => bucketList.id === id);

    // 2. 캐시 없을경우 fetch
    if (!bucketListDetail) {
      dispatch(getBucketListDetail(id));
      return;
    }

    const currentUpdatedAt = new Date(bucketListDetail.updatedAt);
    const needFetch = await checkNeedReFetch(currentUpdatedAt, getBucketListDetailLastUpdatedAt, [id]);
    // 실제로 정보가 변경될 경우 request 요청 아닌 경우 캐시 사용
    needFetch ? dispatch(getBucketListDetail(id)) : dispatch(BucketList.actions.setBucketListDetail(bucketListDetail));
  };

  /**
   * 버킷 리스트 삭제
   **/
  const onRemoveBucketList = async () => {
    await onRemoveRequest({
      params: [bucketListId],
      onSuccess: () => {
        // 삭제 후 리스트 싱크를 위한 조회
        dispatch(getBucketList());
        // store 버킷리스트 정보 삭제
        dispatch(BucketList.actions.removeBucketListDetail(bucketListId));
        onToast('삭제 되었습니다.');
        history.push('/bucket-list');
      },
      onError: () => {
        onToast('다시 시도해 주세요.');
      }
    });
  };

  /**
   * 버킷 리스트 완료 처리
   **/
  const onCompleteBucketList = async () => {
    await onCompleteRequest({
      params: [bucketListId],
      onSuccess: () => {
        // store 버킷리스트 정보 삭제
        onLoadBucketListDetail(bucketListId);
        onToast('목표를 달성하신걸 축하드립니다. :)');
      },
      onError: () => {
        onToast('다시 시도해 주세요.');
      }
    });
  };

  /**
   * 우측 옵션 버튼 클릭
   **/
  const onMenuClick = (type: string) => {
    switch (type) {
      case 'remove': {
        onRemoveModal();
        break;
      }
      case 'edit': {
        history.push(`/bucket-list/save?bucketListId=${bucketListId}`);
        break;
      }
    }

    offMenuModal();
  };

  if (!bucketListDetail.data) {
    return null;
  }

  // 수정 메뉴는 완료상태에서 수정 불가
  const modalMenus = bucketListDetail.data.isComplete ? [bottomMenus[0]] : bottomMenus;

  return (
    <>
      <BucketListDetailHeader
        isLoading={bucketListDetail.loading}
        title={bucketListDetail.data.title}
        imgUrl={bucketListDetail.data?.imageUrl}
        completeDate={bucketListDetail.data.completeDate}
        createdDate={bucketListDetail.data.createdAt}
        onMenuClick={onMenuModal}
      />
      <BucketListContentInfo
        isLoading={bucketListDetail.loading}
        description={bucketListDetail.data.description}
        completeDate={bucketListDetail.data.completeDate}
      />
      <BottomButton
        message='달성하기'
        isShow={!bucketListDetail.data.isComplete && !bucketListDetail.loading}
        onClick={onCompleteBucketList}
        loading={completeLoading}
      />
      {/* 비동기 호출을 통한 아이템 삭제 모달 */}
      <ConfirmModal
        visible={showRemoveModal}
        message='정말 삭제하시겠습니까?'
        loading={removeLoading}
        onConfirmClick={onRemoveBucketList}
        onCancelClick={offRemoveModal}
      />
      <BottomMenuModal
        menus={modalMenus}
        title='원하시는 메뉴를 선택해 주세요.'
        visible={showMenuModal}
        oncloseModal={offMenuModal}
        onEditClick={onMenuClick}
      />
    </>
  );
}

export default React.memo(BucketListDetailContainer);
