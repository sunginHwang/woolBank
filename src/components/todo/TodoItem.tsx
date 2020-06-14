import React from 'react';
import styled from 'styled-components';

interface TodoItemProps {
  title: string;
  content?: string;
}

function TodoItem({ title, content }: TodoItemProps) {
  return (
    <S.TodoItem>
      <h3>{title}</h3>
      <p>{content}</p>
    </S.TodoItem>
  );
}

const S: {
  TodoItem: any;
} = {
  TodoItem: styled.div`
    width: 20rem;
    height: 10rem;
    background-color: #e8e8e8;
    color: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      font-size: 1.6rem;
      color: black;
      margin: 0;
      padding: 0;
    }

    p {
      font-size: 1.2rem;
      color: black;
    }
  `
};

export default TodoItem;
