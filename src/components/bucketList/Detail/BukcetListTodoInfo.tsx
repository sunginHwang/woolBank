import React from 'react';
import styled from 'styled-components';
import TodoList from '../../todo/TodoList';
import { ITodo } from '../../../models/ITodo';
import PlaceHolderBar from '../../common/PlaceHolderBar';

type TodoListProps = {
  isLoading: boolean;
  todoList: ITodo[];
  addLoading: boolean;
  onAddTodo: (todo: ITodo) => void;
  onRemoveTodo: (id: number) => void;
  onToggleTodoState: (id: number) => void;
};

function BucketListTodoInfo({
  isLoading,
  todoList,
  addLoading = false,
  onAddTodo,
  onRemoveTodo,
  onToggleTodoState
}: TodoListProps) {
  return (
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
          onRemove={onRemoveTodo}
          onToggleState={onToggleTodoState}
        />
      )}
    </S.BucketListTodoInfo>
  );
}

const S: {
  BucketListTodoInfo: any;
  TodoTitle: any;
} = {
  BucketListTodoInfo: styled.div`
    padding: 2rem;
    background-color: ${props => props.theme.colors.white};
  `,
  TodoTitle: styled.p`
    color: ${props => props.theme.colors.blackL1};
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 2rem;
    `
};

export default BucketListTodoInfo;
