import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import * as _ from 'lodash';

import ExpenditureTypeList from '@components/regularExpenditure/list/ExpenditureTypeList';
import RegularTopInfo from '@components/regularExpenditure/list/RegularTopInfo';
import RegularExpenditureSkeleton from '@components/regularExpenditure/list/RegularExpenditureSkeleton';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import { useToggle } from '@support/hooks/useToggle';
import useRequest from '@support/hooks/useRequest';
import withSuspense from '@support/hocs/withSuspense';
import { removeRegularExpenditure, RegularExpenditureType } from '@support/api/regularExpenditureApi';
import { useToast } from '@support/hooks/useToast';
import RegularExpenditureList from '../../../../recoils/regularExpenditure/RegularExpenditureList';

const { regularExpenditureListState } = RegularExpenditureList.atoms;
/**
 * 정기 지출 리스트 -> 정기 지출 리스트 컨테이너
 * @component
 */

function RegularExpenditureListContainer() {
  const [showRemoveModal, openRemoveModal, closeRemoveModal] = useToggle(false);
  const [removeId, setRemoveId] = useState(0);

  const onToast = useToast();
  const [regularExpenditureTypeList, setRegularExpenditureTypeList] = useRecoilState<RegularExpenditureType[]>(
    regularExpenditureListState
  );
  const [onRemoveRequest, removeLoading] = useRequest(removeRegularExpenditure);

  const onRemoveItemClick = (id: number) => {
    setRemoveId(id);
    openRemoveModal();
  };

  const onInitRemoveModal = () => {
    closeRemoveModal();
    setRemoveId(0);
  };

  const onRemoveRegularExpenditure = () => {
    if (removeId === 0) {
      onToast('삭제할 내역이 없습니다.');
      return;
    }

    onRemoveRequest({
      params: [removeId],
      onSuccess: () => {
        onToast('삭제 되었습니다.');
        setRegularExpenditureTypeList(getRemovedList(regularExpenditureTypeList, removeId));
      },
      onError: () => {
        onToast('다시 시도해 주세요.');
      },
      onFinally: () => onInitRemoveModal()
    });
  };

  return (
    <>
      <RegularTopInfo regularExpenditureTypeList={regularExpenditureTypeList} />
      <ExpenditureTypeList list={regularExpenditureTypeList} onClickRemoveRegularExpenditure={onRemoveItemClick} />
      <ConfirmModal
        visible={showRemoveModal}
        message='정말 삭제하시겠습니까?'
        loading={removeLoading}
        onConfirmClick={onRemoveRegularExpenditure}
        onCancelClick={onInitRemoveModal}
      />
    </>
  );
}

function getRemovedList(regularExpenditureTypeList: RegularExpenditureType[], removeId: number) {
  const list = _.cloneDeep(regularExpenditureTypeList);
  try {
    return list.map((regularExpenditureType) => {
      const list = regularExpenditureType.list.filter((item) => item.id !== removeId);
      return Object.assign(regularExpenditureType, { list });
    });
  } catch (e) {
    console.log(e);
  }

  return [];
}

export default withSuspense(RegularExpenditureListContainer, <RegularExpenditureSkeleton />);
