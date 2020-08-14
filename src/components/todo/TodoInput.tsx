import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import IcoBlackCircle from '../icon/IcoBlackCircle';
import IcoClose from '../icon/IcoClose';
import useInput from '../../support/hooks/UseInput';

type TodoInputProps = {
  onAdd: (title: string) => void;
  onClose: () => void;
  onFocusIn: () => void;
  onFocusOut: () => void;
};

function TodoInput({ onAdd, onClose, onFocusIn, onFocusOut }: TodoInputProps) {
  const [title, onChangeTitle] = useInput('');
  const todoInputRef = useRef<HTMLInputElement>(null);

  /**
   * 컴포넌트 생성시 바로 포커스 UX 처리
   */
  useEffect(() => {
    todoInputRef.current && todoInputRef.current.focus();
  }, [])

  /**
   * 인풋 버튼 키보드 입력
   */
  const onTitleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd(title);
      // 바로 focus 아웃 시키면 키보드 에 버튼이 보이고 내려가는 ux 상 안이쁘게 보여서 딜레이 처리
      setTimeout(() => onFocusOut(), 150);
    }
  }

  return (
    <S.TodoInput>
      <div>
        <i onClick={onClose}>
          <IcoBlackCircle fill={colors.colors.navyD1} />
        </i>
        <input
          ref={todoInputRef}
          value={title}
          onFocus={onFocusIn}
          onBlur={onFocusOut}
          onChange={onChangeTitle}
          onKeyPress={onTitleKeyPress}
        />
      </div>
      <div>
        <IcoClose fill={colors.colors.greyD2} />
      </div>
    </S.TodoInput>
  )
}

const S: {
  TodoInput: any;
} = {
  TodoInput: styled.div`
    display: flex;
    width: 100%;
    padding: .9rem 1.5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: .8rem;
    box-shadow: rgb(220, 220, 233) .1rem .4rem 1.7rem .3rem;
  
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      
      &:first-child {
        flex: 1;
      }
    }
    
    i {
      height: 2.4rem;
      margin-right: 1rem;
    }
    
    input {
      flex: 1;
      background-color: #F2F3F5;
      border-radius: .8rem;
      padding: 1rem 2rem;
      border: 0.1rem solid ${props => props.theme.colors.greyL2};
      font-size: 1.3rem;
      margin-right: .5rem;
      
      &::placeholder {
        color: #65676B;
      }
    }
  `
};

export default TodoInput;
