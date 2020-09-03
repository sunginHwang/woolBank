import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ITodo } from '../../models/ITodo';
import BucketListTodoInfo from '../../components/bucketList/Detail/BukcetListTodoInfo';
import BucketListDetailHeader from '../../components/bucketList/Detail/BucketListDetailHeader';
import BucketListContentInfo from '../../components/bucketList/Detail/BucketListContentInfo';
import ConfirmModal from '../../components/common/modal/ConfirmModal';
import { useToggle } from '../../support/hooks/useToggle';
import BottomMenuModal from '../../components/common/modal/BottomMenuModal';
import { IBottomMenu } from '../../models/component/IBottomMenu';
import { RootState } from '../../store';
import { checkNeedReFetch } from '../../support/util/checkNeedReFetch';
import BucketList, { getBucketListDetail } from '../../store/modules/BucketList';
import { getBucketListDetailLastUpdatedAt } from '../../support/api/bucketListApi';

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
  const [addTodoLoading, onAddTodoLoading, offAddTodoLoading] = useToggle(false);
  const [removeTodoLoading, onRemoveTodoLoading, offRemoveTodoLoading] = useToggle(false);
  const [showRemoveModal, onRemoveModal, offRemoveModal] = useToggle(false);
  const [showMenuModal, onMenuModal, offMenuModal] = useToggle(false);
  // 현재 선택된 todoId
  const [selectTodoId, setSelectTodoId] = useState(0);

  const bucketListDetail = useSelector((state: RootState) => state.BucketList.bucketListDetail);
  const bucketListDetailDetailCache = useSelector((state: RootState) => state.BucketList.bucketListDetailCache);

  const dispatch = useDispatch();

  useEffect(() => {
    onLoadBucketListDetail(bucketListId);

    return () => {
      // 리스트 -> 상세 재 진입시 이전 상세 데이터가 잠시 보이는 부분이 있어 삭제 처리
      dispatch(BucketList.actions.clearBucketListDetail());
    };
  }, [bucketListId]);

  // 버킷리스트 상세 정보 조회
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

  // todoItem 생성
  const onAddTodo = (todo: ITodo) => {
    onAddTodoLoading();
    /* setTimeout(() => {
      bucketListDetail && setBucketListDetail((prevState) => {
        return {
          ...prevState,
          todoList: prevState && [...prevState.todoList, todo]
        };
      });
      offAddTodoLoading();
    }, 300); */
  };

  // todoItem 삭제
  const onRemoveTodo = () => {
    onRemoveTodoLoading();
    /* setTimeout(() => {
      setBucketListDetail((prevState) => {
        return {
          ...prevState,
          todoList: prevState.todoList.filter(todo => todo.id !== selectTodoId)
        };
      });
      offRemoveTodoLoading();
      offRemoveModal();
    }, 300); */
  };

  // todoItem 상태 토글
  const onToggleTodoState = (todoId: number) => {
    /* setBucketListDetail((prevState) => {
      return {
        ...prevState,
        todoList: prevState.todoList.map(todo => todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo)
      };
    }); */
  };

  // 메뉴 클릭시 이벤트
  const onMenuClick = (type: string) => {
    console.log(type);
    offMenuModal();
  };

  // todoItem 에서 삭제 클릭 이벤트 (삭제 확인 모달을 열기 위함)
  const onTodoRemoveClick = (todoId: number) => {
    setSelectTodoId(todoId);
    onRemoveModal();
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
      <BucketListTodoInfo
        isLoading={bucketListDetail.loading}
        todoList={bucketListDetail.data.todoList}
        addLoading={addTodoLoading}
        onAddTodo={onAddTodo}
        onRemoveTodo={onTodoRemoveClick}
        onToggleTodoState={onToggleTodoState}
      />
      {/* 비동기 호출을 통한 아이템 삭제 모달 */}
      <ConfirmModal
        visible={showRemoveModal}
        message='정말 삭제하시겠습니까?'
        loading={removeTodoLoading}
        onConfirmClick={onRemoveTodo}
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
