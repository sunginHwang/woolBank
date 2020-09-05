import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ITodo } from '../../models/ITodo';
import BucketListTodoInfo from '../../components/bucketList/Detail/BukcetListTodoInfo';
import { RootState } from '../../store';
import BucketList from '../../store/modules/BucketList';
import useRequest from '../../support/hooks/useRequest';
import { removeTodo, saveTodo, updateTodoState } from '../../support/api/todoApi';

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
  const onRemoveTodo = async (todoId: number) => {
    await onRemoveTodoRequest({ params: [todoId] });
    dispatch(BucketList.actions.removeTodo(todoId));
  };

  // todoItem 상태 토글
  const onToggleTodoState = async (todo: ITodo) => {
    const toggleTodo = Object.assign({}, todo);
    toggleTodo.isComplete = !toggleTodo.isComplete;

    await onUpdateTodoStateRequest({
      params: [toggleTodo.id, toggleTodo.isComplete]
    });

    dispatch(BucketList.actions.setTodoState(toggleTodo));
  };

  if (!bucketListDetail.data) {
    return null;
  }

  return (
    <>
      <BucketListTodoInfo
        isLoading={bucketListDetail.loading}
        todoList={bucketListDetail.data.todoList}
        addLoading={saveTodoLoading}
        removeLoading={removeTodoLoading}
        onAddTodo={onAddTodo}
        onRemoveTodo={onRemoveTodo}
        onToggleTodoState={onToggleTodoState}
      />
    </>
  );
}

export default React.memo(BucketListTodoContainer);
