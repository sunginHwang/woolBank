import React, { useEffect, useState } from 'react';

import { ITodo } from '../../models/ITodo';
import { IBucketListDetail } from '../../models/bucketList/IBucketListDetail';
import { bucketListDetailDummy } from '../../support/dummy';
import BucketListTodoInfo from '../../components/bucketList/Detail/BukcetListTodoInfo';
import BucketListDetailHeader from '../../components/bucketList/Detail/BucketListDetailHeader';
import BucketListContentInfo from '../../components/bucketList/Detail/BucketListContentInfo';
import ConfirmModal from '../../components/common/modal/ConfirmModal';
import { useToggle } from '../../support/hooks/useToggle';
import BottomMenuModal from '../../components/common/modal/BottomMenuModal';
import { IBottomMenu } from '../../models/component/IBottomMenu';
import { useLoading } from '../../support/hooks/UseTempLoading';

const bottomMenus:IBottomMenu[] = [{
  type: 'remove',
  value: '삭제하기'
}, {
  type: 'edit',
  value: '수정하기'
}]

type BucketListDetailContainerProps = {
  bucketListId: number;
}

function BucketListDetailContainer({
  bucketListId
}: BucketListDetailContainerProps) {
  const loading = useLoading();
  const [bucketListDetail, setBucketListDetail] = useState<IBucketListDetail>(bucketListDetailDummy.loadData);
  const [addTodoLoading, onAddTodoLoading, offAddTodoLoading] = useToggle(false);
  const [removeTodoLoading, onRemoveTodoLoading, offRemoveTodoLoading] = useToggle(false);
  const [showRemoveModal, onRemoveModal, offRemoveModal] = useToggle(false);
  const [showMenuModal, onMenuModal, offMenuModal] = useToggle(false);
  // 현재 선택된 todoId
  const [selectTodoId, setSelectTodoId] = useState(0);

  // 목업 연동
  useEffect(() => {
    !loading && setBucketListDetail(bucketListDetailDummy.loadData);
  }, [loading]);

  // todoItem 생성
  const onAddTodo = (todo: ITodo) => {
    onAddTodoLoading();
    setTimeout(() => {
      bucketListDetail && setBucketListDetail((prevState) => {
        return {
          ...prevState,
          todoList: prevState && [...prevState.todoList, todo]
        };
      });
      offAddTodoLoading();
    }, 300);
  };

  // todoItem 삭제
  const onRemoveTodo = () => {
    onRemoveTodoLoading();
    setTimeout(() => {
      setBucketListDetail((prevState) => {
        return {
          ...prevState,
          todoList: prevState.todoList.filter(todo => todo.id !== selectTodoId)
        };
      });
      offRemoveTodoLoading();
      offRemoveModal();
    }, 300);
  }

  // todoItem 상태 토글
  const onToggleTodoState = (todoId: number) => {
    setBucketListDetail((prevState) => {
      return {
        ...prevState,
        todoList: prevState.todoList.map(todo => todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo)
      };
    });
  }

  // 메뉴 클릭시 이벤트
  const onMenuClick = (type: string) => {
    console.log(type);
    offMenuModal();
  }

  // todoItem 에서 삭제 클릭 이벤트 (삭제 확인 모달을 열기 위함)
  const onTodoRemoveClick = (todoId: number) => {
    setSelectTodoId(todoId);
    onRemoveModal();
  }

  return (
    <>
      <BucketListDetailHeader
        isLoading={loading}
        title={bucketListDetail.title}
        imgUrl={bucketListDetail.image.fullImageUrl}
        serverDate={bucketListDetail.serverDate}
        completeDate={bucketListDetail.completeDate}
        createdDate={bucketListDetail.createdDate}
        onMenuClick={onMenuModal}
      />
      <BucketListContentInfo
        isLoading={loading}
        description={bucketListDetail.description}
        completeDate={bucketListDetail.completeDate}
      />
      <BucketListTodoInfo
        isLoading={loading}
        todoList={bucketListDetail.todoList}
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
