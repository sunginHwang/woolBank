import React from 'react';
import { useHistory } from 'react-router';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import * as _ from 'lodash';

import ExpenditureTypeList from '@components/regularExpenditure/list/ExpenditureTypeList';
import RegularTopInfo from '@components/regularExpenditure/list/RegularTopInfo';
import RegularExpenditureSkeleton from '@components/regularExpenditure/list/RegularExpenditureSkeleton';
import { useConfirm } from '@components/common/Confirm/ConfirmService';
import AddButton from '@components/common/AddButton';

import { useToast } from '@support/hooks/useToast';
import withSuspense from '@support/hocs/withSuspense';
import { removeRegularExpenditure, RegularExpenditureType } from '@support/api/regularExpenditureApi';
import RegularExpenditureListState from '../../../../recoils/regularExpenditure/RegularExpenditureList';

const { regularExpenditureListState } = RegularExpenditureListState.atoms;

/**
 * 정기 지출 리스트 탭
 * @component
 */

function RegularExpenditureListTab() {
  const { openConfirm, setConfirmLoading } = useConfirm();
  const history = useHistory();
  const onToast = useToast();
  const [regularExpenditureTypeList, setRegularExpenditureTypeList] = useRecoilState<RegularExpenditureType[]>(
    regularExpenditureListState
  );
  const removeMutate = useMutation((id: number) => removeRegularExpenditure(id));

  const onRemoveItemClick = async (id: number) => {
    const isConfirm = await openConfirm({
      message: '정말 삭제하시겠습니까?',
      useAutoClose: false,
    });

    if (isConfirm) {
      onRemoveRegularExpenditure(id)
    }
  };

  const onRemoveRegularExpenditure = (removeId: number) => {
    setConfirmLoading(true);
    removeMutate.mutate(removeId, {
      onSuccess: () => {
        onToast('삭제 되었습니다.');
        setRegularExpenditureTypeList(getRemovedList(regularExpenditureTypeList, removeId));
      },
      onError: () => onToast('다시 시도해 주세요.'),
      onSettled: () => setConfirmLoading(false),
    });
  };

  const onMoveSavePage = () => {
    history.push('/account-books/save/regular-expenditure');
  };

  return (
    <>
      <RegularTopInfo regularExpenditureTypeList={regularExpenditureTypeList} />
      <ExpenditureTypeList list={regularExpenditureTypeList} onClickRemoveRegularExpenditure={onRemoveItemClick} />
      <AddButton icon='+' onClick={onMoveSavePage} />
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

export default withSuspense(RegularExpenditureListTab, <RegularExpenditureSkeleton />);
