import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import BucketListDetailHeader from '../../components/bucketList/Detail/BucketListDetailHeader';
import BucketListContentInfo from '../../components/bucketList/Detail/BucketListContentInfo';
import ConfirmModal from '../../components/common/modal/ConfirmModal';
import { useToggle } from '../../support/hooks/useToggle';
import BottomMenuModal from '../../components/common/modal/BottomMenuModal';
import { IBottomMenu } from '../../models/component/IBottomMenu';
import { RootState } from '../../store';
import { checkNeedReFetch } from '../../support/util/checkNeedReFetch';
import BucketList, { getBucketList, getBucketListDetail } from '../../store/modules/BucketList';
import { getBucketListDetailLastUpdatedAt, removeBucketList } from '../../support/api/bucketListApi';
import useRequest from '../../support/hooks/useRequest';

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

  const [onRemoveRequest, removeLoading, removeError] = useRequest(removeBucketList);

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
  }, [bucketListId]);

  /**
   * 버킷리스트 상세 정보 조회
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

  const onRemoveBucketList = async () => {
    await onRemoveRequest({
      params: [bucketListId],
      callbackFunc: () => {
        // 삭제 후 리스트 싱크를 위한 조회
        dispatch(getBucketList());
      }
    });

    history.push('/bucket-list');
    // store 버킷리스트 정보 삭제
    dispatch(BucketList.actions.removeBucketListDetail(bucketListId));
  };

  // 메뉴 클릭시 이벤트
  const onMenuClick = (type: string) => {
    if (type === 'remove') {
      onRemoveModal();
    }

    if (type === 'edit') {
      history.push(`/bucket-list/save?bucketListId=${bucketListId}`);
    }

    offMenuModal();
  };

  if (!bucketListDetail.data) {
    return null;
  }

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
      {/* 비동기 호출을 통한 아이템 삭제 모달 */}
      <ConfirmModal
        visible={showRemoveModal}
        message='정말 삭제하시겠습니까?'
        loading={removeLoading}
        onConfirmClick={onRemoveBucketList}
        onCancelClick={offRemoveModal}
      />
      <BottomMenuModal
        menus={bottomMenus}
        title='원하시는 메뉴를 선택해 주세요.'
        visible={showMenuModal}
        oncloseModal={offMenuModal}
        onEditClick={onMenuClick}
      />
    </>
  );
}

export default React.memo(BucketListDetailContainer);
