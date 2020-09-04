import React, { useState } from 'react';
import styled from 'styled-components';
import TodoList from '../../todo/TodoList';
import { ITodo } from '../../../models/ITodo';
import PlaceHolderBar from '../../common/PlaceHolderBar';
import ConfirmModal from '../../common/modal/ConfirmModal';
import { useToggle } from '../../../support/hooks/useToggle';

type TodoListProps = {
  isLoading: boolean;
  todoList: ITodo[];
  addLoading: boolean;
  removeLoading: boolean;
  onAddTodo: (todo: ITodo) => void;
  onRemoveTodo: (id: number) => void;
  onToggleTodoState: (todo: ITodo) => void;
};

function BucketListTodoInfo({
  isLoading,
  todoList,
  addLoading = false,
  removeLoading = false,
  onAddTodo,
  onRemoveTodo,
  onToggleTodoState
}: TodoListProps) {
  const [selectTodoId, setSelectTodoId] = useState(0);
  const [showRemoveModal, onRemoveModal, offRemoveModal] = useToggle(false);

  const onRemoveTodoClick = (todoId: number) => {
    setSelectTodoId(todoId);
    onRemoveModal();
  };

  const onRemoveModalConfirmClick = () => {
    onRemoveTodo(selectTodoId);
    // 선택 todo 초기화
    setSelectTodoId(0);
    offRemoveModal();
  };

  return (
    <>
      <S.BucketListTodoInfo>
        <S.TodoTitle>할일목록</S.TodoTitle>
        {isLoading && (
          <>
            <PlaceHolderBar width='100%' height='5.4rem' />
            <PlaceHolderBar width='100%' height='5.4rem' />
            <PlaceHolderBar width='100%' height='5.4rem' />
            <PlaceHolderBar width='100%' height='5.4rem' />
          </>
        )}
        {!isLoading && (
          <TodoList
            addLoading={addLoading}
            todoList={todoList}
            onAdd={onAddTodo}
            onRemove={onRemoveTodoClick}
            onToggleState={onToggleTodoState}
          />
        )}
      </S.BucketListTodoInfo>
      <ConfirmModal
        visible={showRemoveModal}
        message='정말 삭제하시겠습니까?'
        loading={removeLoading}
        onConfirmClick={onRemoveModalConfirmClick}
        onCancelClick={offRemoveModal}
      />
    </>
  );
}

const S: {
  BucketListTodoInfo: any;
  TodoTitle: any;
} = {
  BucketListTodoInfo: styled.div`
    padding: 2rem;
    background-color: ${(props) => props.theme.colors.white};
  `,
  TodoTitle: styled.p`
    color: ${(props) => props.theme.colors.blackL1};
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 2rem;
  `
};

export default BucketListTodoInfo;
