import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ITodo } from '../../../models/ITodo';
import BucketListTodoInfo from '../../../components/bucketList/Detail/BukcetListTodoInfo';
import { RootState } from '../../../store';
import BucketList from '../../../store/modules/BucketList';
import useRequest from '../../../support/hooks/useRequest';
import { removeTodo, saveTodo, updateTodoState } from '../../../support/api/todoApi';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { useToggle } from '../../../support/hooks/useToggle';
import { useToast } from '../../../support/hooks/useToast';

type BucketListTodoContainerProps = {
  bucketListId: number;
};

function BucketListTodoContainer({ bucketListId }: BucketListTodoContainerProps) {
  const [selectTodoId, setSelectTodoId] = useState(0);
  const [showRemoveModal, onRemoveModal, offRemoveModal] = useToggle(false);

  // todoList data fetch 는 bucketListDetailContainer 에서 조회
  const bucketListDetail = useSelector((state: RootState) => state.BucketList.bucketListDetail);
  const [onSaveTodoRequest, saveTodoLoading] = useRequest(saveTodo);
  const [onRemoveTodoRequest, removeTodoLoading] = useRequest(removeTodo);
  const [onUpdateTodoStateRequest, updateTodoLoading] = useRequest(updateTodoState);
  const onToast = useToast();
  const dispatch = useDispatch();

  /**
   * todo 생성
   **/
  const onAddTodo = async (todo: ITodo) => {
    await onSaveTodoRequest({
      params: [bucketListId, todo],
      onSuccess: (res: any) => {
        const savedTodo: ITodo = Object.assign(todo, { id: res.data.todoId });
        dispatch(BucketList.actions.saveTodo(savedTodo));
      },
      onError: () => {
        onToast('다시 시도해 주세요.');
      }
    });
  };

  /**
   * todo 삭제
   **/
  const onRemoveTodo = async () => {
    await onRemoveTodoRequest({
      params: [selectTodoId],
      onSuccess: () => {
        dispatch(BucketList.actions.removeTodo(selectTodoId));
        // 선택 todo 초기화
        setSelectTodoId(0);
        offRemoveModal();
      },
      onError: () => {
        onToast('다시 시도해 주세요.');
      }
    });
  };

  /**
   * todo 완료 상태 변경
   **/
  const onToggleTodoState = async (todo: ITodo) => {
    // 선택된  todoId 입력 받기 (로딩 처리 위함)
    setSelectTodoId(todo.id);

    const toggleTodo = Object.assign({}, todo);
    toggleTodo.isComplete = !toggleTodo.isComplete;

    await onUpdateTodoStateRequest({
      params: [toggleTodo.id, toggleTodo.isComplete],
      onSuccess: () => {
        dispatch(BucketList.actions.setTodoState(toggleTodo));
        // 처리 완료후 초기화
        setSelectTodoId(0);
      },
      onError: () => {
        onToast('완료처리에 실패하였습니다.');
      }
    });
  };

  /**
   * todo 삭제 모달 열기
   **/
  const openTodoRemoveModal = (todoId: number) => {
    setSelectTodoId(todoId);
    onRemoveModal();
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
