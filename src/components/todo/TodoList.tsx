import React, { useRef } from 'react';
import styled from 'styled-components';

import TodoInput from '@components/todo/TodoInput';
import TodoAddButton from '@components/todo/TodoAddButton';
import TodoListItem from '@components/todo/TodoListItem';

import { ITodo } from '@models/ITodo';
import { useToggle } from '@support/hooks/useToggle';

export interface TodoListProps {
  todoList: ITodo[];
  addLoading?: boolean;
  todoItemLoading?: {
    isLoading: boolean;
    todoId: number;
  };
  onAdd: (todo: ITodo) => void;
  onRemove: (id: number) => void;
  onToggleState: (todo: ITodo) => void;
  onTodoItemFocusIn?: () => void;
  onTodoItemFocusOut?: () => void;
}

function TodoList({
  todoList,
  addLoading = false,
  todoItemLoading = { isLoading: false, todoId: 0 },
  onAdd,
  onRemove,
  onToggleState,
  onTodoItemFocusIn = () => {},
  onTodoItemFocusOut = () => {}
}: TodoListProps) {
  const [showAddInput, onAddInput, offAddInput] = useToggle(false);
  const addRef = useRef<HTMLDivElement>(null);

  // 할일 아이템 추가
  const onAddTodo = (title: string) => {
    onAdd({
      id: todoList.length + 1,
      title: title,
      isComplete: false
    });
    offAddInput();
    // 추가 후 스크롤 최하단 이동 (입력 편리 ux)
    addRef.current && addRef.current.scrollIntoView();
  };

  return (
    <>
      <S.TodoList>
        {todoList.map((todo, index) => {
          const isTodoLoading = todoItemLoading?.isLoading && todoItemLoading.todoId === todo.id;
          return (
            <TodoListItem
              key={index}
              todo={todo}
              isLoading={isTodoLoading}
              onRemove={onRemove}
              onToggleState={onToggleState}
            />
          );
        })}
      </S.TodoList>
      <S.TodoAdd ref={addRef}>
        {showAddInput ? (
          <TodoInput
            onAdd={onAddTodo}
            onClose={offAddInput}
            onFocusIn={onTodoItemFocusIn}
            onFocusOut={onTodoItemFocusOut}
          />
        ) : (
          <TodoAddButton loading={addLoading} onClick={onAddInput} />
        )}
      </S.TodoAdd>
    </>
  );
}

const S: {
  AddInfo: any;
  TodoList: any;
  TodoAdd: any;
} = {
  TodoList: styled.ul`
    width: 100%;

    &:last-child {
      margin-bottom: 10rem;
    }
  `,
  TodoAdd: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20rem;
  `,
  AddInfo: styled.div<{
    show: boolean;
  }>`
    top: ${({ show }) => (show ? 0 : '100%')};
    margin-top: 3rem;
    position: relative;
    transition: all 0.3s ease-out;
    height: 100%;
  `
};

export default TodoList;
