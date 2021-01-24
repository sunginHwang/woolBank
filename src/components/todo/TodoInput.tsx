import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import IcoBlackCircle from '@components/icon/IcoBlackCircle';

import palette from '@style/palette';
import useInput from '@support/hooks/UseInput';

export interface TodoInputProps {
  onAdd: (title: string) => void;
  onClose: () => void;
  onFocusIn: () => void;
  onFocusOut: () => void;
}

function TodoInput({ onAdd, onClose, onFocusIn, onFocusOut }: TodoInputProps) {
  const [title, onChangeTitle] = useInput('');
  const todoInputRef = useRef<HTMLInputElement>(null);

  /**
   * 컴포넌트 생성시 바로 포커스 UX 처리
   */
  useEffect(() => {
    todoInputRef.current && todoInputRef.current.focus();
  }, []);

  /**
   * 인풋 버튼 키보드 입력
   */
  const onTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return null;
    }

    onAddTodo();
  };

  /**
   * Todo 추가
   */
  const onAddTodo = () => {
    if (title !== '') {
      onAdd(title);
      // 바로 focus 아웃 시키면 키보드 에 버튼이 보이고 내려가는 ux 상 안이쁘게 보여서 딜레이 처리
      setTimeout(() => onFocusOut(), 150);
    }
  }

  return (
    <S.TodoInput>
      <S.Input>
        <i onClick={onClose}>
          <IcoBlackCircle fill={palette.mainColor} />
        </i>
        <input
          data-cy='todoInput'
          ref={todoInputRef}
          value={title}
          onFocus={onFocusIn}
          onBlur={onFocusOut}
          onChange={onChangeTitle}
          onKeyPress={onTitleKeyPress}
        />
      </S.Input>
      <S.Footer>
        <S.Button onClick={onAddTodo}>작업 추가</S.Button>
        <S.Button onClick={onClose} isCancel>취소</S.Button>
      </S.Footer>
    </S.TodoInput>
  );
}

const S: {
  TodoInput: any;
  Input: any;
  Footer: any;
  Button: any;
} = {
  Button: styled.button<{
    isCancel: boolean;
  }>`
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    background-color: ${({ theme, isCancel }) => isCancel ? theme.colors.white : theme.colors.mainColor};
    color: ${({ theme, isCancel }) => isCancel ? theme.colors.blackL1 : theme.colors.white};
  `,
  Footer: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  `,
  Input: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1
  `,
  TodoInput: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.9rem 1.5rem;
    border-radius: 0.8rem;
    box-shadow: rgb(220, 220, 233) 0.1rem 0.4rem 1.7rem 0.3rem;

    i {
      height: 2.2rem;
      margin-right: 1rem;
    }

    input {
      flex: 1;
      background-color: #f2f3f5;
      border-radius: 0.8rem;
      padding: 1rem 2rem;
      border: 0.1rem solid ${({ theme }) => theme.colors.greyL2};
      font-size: 1.2rem;
      margin-right: 0.5rem;

      &::placeholder {
        color: #65676b;
      }
    }
  `
};

export default TodoInput;
