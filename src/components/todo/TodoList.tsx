import React, { useRef } from 'react';
import styled from 'styled-components';
import { ITodo } from '../../models/ITodo';
import { useToggle } from '../../support/hooks/useToggle';
import TodoInput from './TodoInput';
import TodoAddButton from './TodoAddButton';
import TodoListItem from './TodoListItem';

type TodoListProps = {
  todoList: ITodo[];
  addLoading?: boolean;
  onAdd: (todo: ITodo) => void;
  onRemove: (id: number) => void;
  onToggleState: (id: number) => void;
  onTodoItemFocusIn?: () => void;
  onTodoItemFocusOut?: () => void;
};

function TodoList({
  todoList,
  addLoading = false,
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
          return <TodoListItem key={index} todo={todo} onRemove={onRemove} onToggleState={onToggleState} />;
        })}
      </S.TodoList>
      <S.TodoAdd ref={addRef}>
        {showAddInput ? (
          <TodoInput onAdd={onAddTodo} onClose={offAddInput} onFocusIn={onTodoItemFocusIn} onFocusOut={onTodoItemFocusOut} />
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
  AddInfo: styled.div`
    top: ${(props: any) => (props.show ? 0 : '100%')};
    margin-top: 3rem;
    position: relative;
    transition: all 0.3s ease-out;
    height: 100%;
  `
};

export default TodoList;
