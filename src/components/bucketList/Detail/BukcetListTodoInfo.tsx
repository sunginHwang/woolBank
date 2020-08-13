import React from 'react';
import styled from 'styled-components';
import TodoList from '../../todo/TodoList';
import { ITodo } from '../../../models/ITodo';

type TodoListProps = {
  todoList: ITodo[];
  addLoading: boolean;
  addTodo: (todo: ITodo) => void;
  removeTodo: (id: number) => void;
  onToggleTodoState: (id: number) => void;
};

function BucketListTodoInfo({
  todoList,
  addTodo,
  removeTodo,
  addLoading = false,
  onToggleTodoState
}: TodoListProps) {
  return (
    <S.BucketListTodoInfo>
      <S.TodoTitle>할일목록</S.TodoTitle>
      <TodoList
        addTodo={addTodo}
        addLoading={addLoading}
        todoList={todoList}
        removeTodo={removeTodo}
        onToggleTodoState={onToggleTodoState}
      />
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
