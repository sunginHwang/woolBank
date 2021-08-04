import React from 'react';
import { useHistory } from 'react-router';

import HeaderInfo from '@components/bucketList/detail/HeaderInfo';
import ContentInfo from '@components/bucketList/detail/ContentInfo';
import ButtonBottom from '@components/common/BottomButton';
import BottomMenuModal from '@components/common/modal/BottomMenuModal';
import { useToggle } from '@support/hooks/useToggle';
import { useToast } from '@support/hooks/useToast';
import useBucket, { useBucketQuerySetter } from '@/services/bucketList/useBucket';
import options from './options';

const { bottomMenus } = options;

interface IProps {
  bucketId: number;
  showCompleteButton: boolean;
}

/**
 * 버킷리스트 상세 - 버킷 상세 정보
 * @component
 */

function BucketDetailInfo({ bucketId, showCompleteButton }: IProps) {
  const [showMenuModal, onMenuModal, offMenuModal] = useToggle(false);
  const onToast = useToast();
  const history = useHistory();

  const { bucket, isEmpty, isLoading, isError } = useBucket(bucketId);
  const { onCompleteBucket, onRemoveBucket } = useBucketQuerySetter(bucketId);

  // 우측 옵션 버튼 클릭
  const onMenuClick = (type: string) => {
    type === 'remove' && onRemoveBucket();
    type === 'edit' && history.push(`/bucket-list/save?bucketListId=${bucketId}`);

    offMenuModal();
  };

  if (isEmpty) {
    return null;
  }

  if (isError) {
    onToast('존재하지 않는 페이지 입니다.');
    history.goBack();
  }

  // 수정 메뉴는 완료상태에서 수정 불가
  const modalMenus = bucket.isComplete ? [bottomMenus[0]] : bottomMenus;

  return (
    <>
      <HeaderInfo
        isLoading={isLoading}
        title={bucket.title}
        imgUrl={bucket.imageUrl}
        completeDate={bucket.completeDate}
        createdDate={bucket.createdAt}
        onMenuClick={onMenuModal}
      />
      <ContentInfo
        isLoading={isLoading}
        description={bucket.description}
        completeDate={bucket.completeDate}
      />
      <ButtonBottom
        message={bucket.isComplete ? '목표 달성 완료' : '달성하기'}
        isShow={!isLoading && showCompleteButton}
        active={!bucket.isComplete}
        onClick={onCompleteBucket}
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

export default React.memo(BucketDetailInfo);
