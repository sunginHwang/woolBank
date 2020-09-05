import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ITodo } from '../../models/ITodo';
import BucketListTodoInfo from '../../components/bucketList/Detail/BukcetListTodoInfo';
import { RootState } from '../../store';
import BucketList from '../../store/modules/BucketList';
import useRequest from '../../support/hooks/useRequest';
import { removeTodo, saveTodo, updateTodoState } from '../../support/api/todoApi';
import ConfirmModal from '../../components/common/modal/ConfirmModal';
import { useToggle } from '../../support/hooks/useToggle';

type BucketListTodoContainerProps = {
  bucketListId: number;
};

function BucketListTodoContainer({ bucketListId }: BucketListTodoContainerProps) {
  const [onSaveTodoRequest, saveTodoLoading, saveTodoError] = useRequest(saveTodo);
  const [onRemoveTodoRequest, removeTodoLoading, removeTodoError] = useRequest(removeTodo);
  const [onUpdateTodoStateRequest, updateTodoLoading, updateTodoError] = useRequest(updateTodoState);

  // todoList data fetch 는 bucketListDetailContainer 에서 조회
  const bucketListDetail = useSelector((state: RootState) => state.BucketList.bucketListDetail);

  const dispatch = useDispatch();

  const [selectTodoId, setSelectTodoId] = useState(0);
  const [showRemoveModal, onRemoveModal, offRemoveModal] = useToggle(false);

  useEffect(() => {
    saveTodoError && alert(saveTodoError);
    removeTodoError && alert(removeTodoError);
    updateTodoError && alert(updateTodoError);
  }, [saveTodoError, removeTodoError, updateTodoError]);

  const openTodoRemoveModal = (todoId: number) => {
    setSelectTodoId(todoId);
    onRemoveModal();
  };

  // todoItem 생성
  const onAddTodo = async (todo: ITodo) => {
    let savedTodoId = 0;

    await onSaveTodoRequest({
      params: [bucketListId, todo],
      callbackFunc: (res: any) => {
        savedTodoId = res.data.todoId;
      }
    });

    todo.id = savedTodoId;

    dispatch(BucketList.actions.saveTodo(todo));
  };

  // todoItem 삭제
  const onRemoveTodo = async () => {
    await onRemoveTodoRequest({ params: [selectTodoId] });
    dispatch(BucketList.actions.removeTodo(selectTodoId));
    // 선택 todo 초기화
    setSelectTodoId(0);
    offRemoveModal();
  };

  // todoItem 상태 토글
  const onToggleTodoState = async (todo: ITodo) => {
    // 선택된  todoId 입력 받기 (로딩 처리 위함)
    setSelectTodoId(todo.id);

    const toggleTodo = Object.assign({}, todo);
    toggleTodo.isComplete = !toggleTodo.isComplete;

    await onUpdateTodoStateRequest({
      params: [toggleTodo.id, toggleTodo.isComplete]
    });

    dispatch(BucketList.actions.setTodoState(toggleTodo));
    // 처리 완료후 초기화
    setSelectTodoId(0);
  };

  if (!bucketListDetail.data) {
    return null;
  }

  return (
    <>
      <BucketListTodoInfo
        todoList={bucketListDetail.data.todoList}
        selectTodoId={selectTodoId}
        isLoading={bucketListDetail.loading}
        addLoading={saveTodoLoading}
        todoUpdateLoading={updateTodoLoading}
        onAddTodo={onAddTodo}
        onRemoveTodo={openTodoRemoveModal}
        onToggleTodoState={onToggleTodoState}
      />
      <ConfirmModal
        visible={showRemoveModal}
        message='정말 삭제하시겠습니까?'
        loading={removeTodoLoading}
        onConfirmClick={onRemoveTodo}
        onCancelClick={offRemoveModal}
      />
    </>
  );
}

export default React.memo(BucketListTodoContainer);
