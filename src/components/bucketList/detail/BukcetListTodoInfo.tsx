import React from 'react';
import styled from 'styled-components';

import PlaceHolderBar from '@components/common/PlaceHolderBar';
import TodoList from '@components/todo/TodoList';

import { ITodo } from '@models/ITodo';

export interface TodoListProps {
  todoList: ITodo[];
  selectTodoId: number;
  isLoading: boolean;
  isFreeze: boolean;
  addLoading: boolean;
  todoUpdateLoading: boolean;
  onAddTodo: (todo: ITodo) => void;
  onRemoveTodo: (id: number) => void;
  onToggleShowCompleteButton: (toggle: boolean) => void;
  onToggleTodoState: (todo: ITodo) => void;
};

function BucketListTodoInfo({
  todoList,
  selectTodoId,
  isLoading,
  isFreeze,
  addLoading = false,
  todoUpdateLoading = false,
  onAddTodo,
  onRemoveTodo,
  onToggleTodoState,
  onToggleShowCompleteButton
}: TodoListProps) {
  const todoItemLoading = {
    isLoading: todoUpdateLoading,
    todoId: selectTodoId
  };

  const renderSkeleton = (
    <>
      <PlaceHolderBar width='100%' height='5.4rem' />
      <PlaceHolderBar width='100%' height='5.4rem' />
      <PlaceHolderBar width='100%' height='5.4rem' />
      <PlaceHolderBar width='100%' height='5.4rem' />
    </>
  );

  const onTodoFocusIn = () => {
    onToggleShowCompleteButton(false);
  };

  const onTodoFocusOut = () => {
    onToggleShowCompleteButton(true);
  };

  return (
    <>
      <S.BucketListTodoInfo>
        <S.TodoTitle>할일목록</S.TodoTitle>
        {isLoading ? (
          renderSkeleton
        ) : (
          <TodoList
            addLoading={addLoading}
            todoItemLoading={todoItemLoading}
            todoList={todoList}
            isFreeze={isFreeze}
            onAdd={onAddTodo}
            onRemove={onRemoveTodo}
            onToggleState={onToggleTodoState}
            onTodoItemFocusIn={onTodoFocusIn}
            onTodoItemFocusOut={onTodoFocusOut}
          />
        )}
      </S.BucketListTodoInfo>
    </>
  );
}

const S: {
  BucketListTodoInfo: any;
  TodoTitle: any;
} = {
  BucketListTodoInfo: styled.div`
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.white};
  `,
  TodoTitle: styled.p`
    color: ${({ theme }) => theme.colors.blackL1};
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 2rem;
  `
};

export default BucketListTodoInfo;
