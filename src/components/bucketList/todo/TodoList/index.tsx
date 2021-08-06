import React, { useState } from 'react';
import styled from 'styled-components';

import TodoListItem from '@components/bucketList/todo/TodoListItem';
import { ITodo } from '@models/bucketList/ITodo';

interface IProps {
  todoList: ITodo[];
  isItemUpdateLoading: boolean;
  isFreeze: boolean;
  onRemove: (id: number) => void;
  onToggleState: (todo: ITodo) => void;
}

/**
 * 버킷리스트 상세 - 할것 리스트
 * @component
 */

function TodoList(props: IProps) {
  const {
    todoList,
    isItemUpdateLoading,
    isFreeze,
    onRemove,
    onToggleState
  } = props;

  const [selectTodoId, setSelectedTodo] = useState(0);

  const onToggleStateClick = (todo: ITodo) => {
    setSelectedTodo(todo.id);
    onToggleState(todo);
  };

  return (
    <S.TodoList>
      {todoList.map((todo, index) => {
        const isTodoLoading = isItemUpdateLoading && selectTodoId === todo.id;
        return (
          <TodoListItem
            key={index}
            todo={todo}
            isFreeze={isFreeze}
            isLoading={isTodoLoading}
            onRemove={onRemove}
            onToggleState={onToggleStateClick}
          />
        );
      })}
    </S.TodoList>
  );
}

export default TodoList;

const S = {
  TodoList: styled.ul`
    width: 100%;

    &:last-child {
      margin-bottom: 10rem;
    }
  `
};
