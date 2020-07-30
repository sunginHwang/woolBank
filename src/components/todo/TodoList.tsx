import React from 'react';
import styled from 'styled-components';
import { ITodo } from '../../models/ITodo';
import TodoListItem from './TodoListItem';

interface TodoListItemProps {
  todoList: ITodo[];
}

function TodoList({ todoList }: TodoListItemProps) {
  return (
    <S.TodoList>
      {
        todoList.map((todo, index) => {
          return <TodoListItem key={index} todo={todo} />
        })
      }
    </S.TodoList>
  );
}

const S: {
  TodoList: any;
} = {
  TodoList: styled.ul`
    width: 100%;
    
    &:last-child {
      margin-bottom: 0;
    }
  `
};

export default TodoList;
