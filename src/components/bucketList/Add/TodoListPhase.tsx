import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import BottomButton from '../../common/BottomButton';
import { IPhase } from '../../../models/phase/IPhase';
import { ITodo } from '../../../models/ITodo';
import TodoAddButton from '../../todo/TodoAddButton';
import { useToggle } from '../../../support/hooks/useToggle';
import LabelText from '../../common/LabelText';
import TodoListItem from '../../todo/TodoListItem';
import SubLabelText from '../../common/SubLabelText';
import TodoInput from '../../todo/TodoInput';

interface TodoListPhaseProps extends IPhase {
  loading: boolean;
  onCompleteLastPhase: (todoList: ITodo[]) => void;
}

function TodoListPhase({ isActivePhase, loading, goPrevPhase, onCompleteLastPhase }: TodoListPhaseProps) {
  const [showAddInput, onAddInput, offAddInput] = useToggle(false);
  const [isFocusTodo, onFocusTodo, offFocusTodo] = useToggle(false);
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const addRef = useRef<HTMLDivElement>(null);

  /**
   * 할일 아이템 추가
   */
  const onAddTodo = (title: string) => {
    setTodoList([...todoList, {
      id: todoList.length + 1,
      title: title,
      isComplete: false
    }]);
    offAddInput();
    // 추가 후 스크롤 최하단 이동 (입력 편리 ux)
    addRef.current && addRef.current.scrollIntoView();
  }

  /**
   * 할일 완료 상태 토글
   */
  const onToggleState = (id: number) => {
    const newTodo = [...todoList].map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        return todo;
      }

      return todo;
    });
    setTodoList(newTodo);
  };

  /**
   * 할일 삭제
   */
  const onRemove = (id: number) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  /**
   * 할일 완료
   */
  const onComplete = () => {
    onCompleteLastPhase(todoList);
  }

  const isValidComplete = isActivePhase && todoList.length > 0;
  const isShowCompleteButton = !isFocusTodo && isActivePhase;

  return (
    <PhaseTemplate
      useScroll
      title='할일 작성'
      rightMessage='4/4'
      active={isActivePhase}
      usePadding={false}
      onBackClick={goPrevPhase}
    >
      <S.AccountInfoAddPhase>
        <S.TodoForm>
          <LabelText>목표를 달성하기 위해 <br /> 해야할 일들을 정해보세요.</LabelText>
          <SubLabelText>목표를 빠르게 달성하기 위해서<br />필요한 일들을 순차적으로 나열하는것도 좋은 방법입니다.</SubLabelText>
          <S.TodoList>
            {
              todoList.map((todo, index) => {
                return (
                  <TodoListItem
                    key={index}
                    todo={todo}
                    onRemove={onRemove}
                    onToggleState={onToggleState}
                  />
                )
              })
            }
          </S.TodoList>
          <S.TodoAdd ref={addRef}>
            {
              showAddInput
                ? (
                  <TodoInput
                    onAdd={onAddTodo}
                    onClose={offAddInput}
                    onFocusIn={onFocusTodo}
                    onFocusOut={offFocusTodo}
                  />
                ) : <TodoAddButton onClick={onAddInput} />
            }
          </S.TodoAdd>
        </S.TodoForm>
        <BottomButton
          message='버킷리스트 작성'
          loading={loading}
          active={isValidComplete}
          isShow={isShowCompleteButton}
          onClick={onComplete}
        />
      </S.AccountInfoAddPhase>
    </PhaseTemplate>
  );
}

const S: {
  AccountInfoAddPhase: any;
  Content: any;
  AddInfo: any;
  TodoForm: any;
  TodoList: any;
  TodoAdd: any;
} = {
  TodoForm: styled.div`
    margin: 2rem 0 1rem 0;
  `,
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
  AccountInfoAddPhase: styled.div`
    height: calc(100vh - 5.5rem);
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
  `,
  Content: styled.div`
    padding-top: 2rem;
    height: 80%;
    > div + div {
      margin-top: 4rem;
    }
  `,
  AddInfo: styled.div`
    top: ${(props: any) => (props.show ? 0 : '100%')};
    margin-top: 3rem;
    position: relative;
    transition: all 0.3s ease-out;
    height: 100%;
  `
};

export default React.memo(TodoListPhase);
