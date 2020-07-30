import React from 'react';
import styled from 'styled-components';
import PhaseTemplate from '../../common/PhaseTemplate';
import BottomButton from '../../common/BottomButton';
import { IPhase } from '../../../models/phase/IPhase';
import TodoList from '../../todo/TodoList';
import { ITodo } from '../../../models/ITodo';
import TodoAddButton from '../../todo/TodoAddButton';
import TodoAddModal from '../../todo/TodoAddModal';
import { useToggle } from '../../../support/hooks/useToggle';

interface TodoListPhaseProps extends IPhase {}

function TodoListPhase({ isActivePhase, goPrevPhase, goNextPhase }: TodoListPhaseProps) {
  const [showAddModal, onAddModal, offAddModal] = useToggle(false);

  const todoList: ITodo[] = [
    {
      title: '일번 투두 리스트',
      isComplete: false
    },
    {
      title: '이번 투두 리스트',
      isComplete: false
    },
    {
      title: '삼번 투두 리스트',
      isComplete: false
    }
  ];

  return (
    <PhaseTemplate title='할일 작성' active={isActivePhase} usePadding={false} onBackClick={goPrevPhase}>
      <S.AccountInfoAddPhase>
        <S.TodoForm>
          <p>목표를 달성하기 위해 필요한 것을 적어보세요.~</p>
          <TodoList todoList={todoList} />
        </S.TodoForm>
        <S.TodoAdd>
          <TodoAddButton onClick={onAddModal} />
        </S.TodoAdd>
        <BottomButton message='다음단계' isShow={isActivePhase} />
      </S.AccountInfoAddPhase>
      <TodoAddModal visible={showAddModal} onSendClick={offAddModal} />
    </PhaseTemplate>
  );
}

const S: {
  AccountInfoAddPhase: any;
  Content: any;
  AddInfo: any;
  TodoForm: any;
  TodoAdd: any;
} = {
  TodoForm: styled.div`
    margin: 2rem 0 1rem 0;
      
    > p {
      font-size: 1.4rem;
      font-weight: 500;
      color: #515EC0;
      text-align: left;
      margin-bottom: 2rem;
    }   
  `,
  TodoAdd: styled.div`
    display: flex;
    justify-content: center;
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

export default TodoListPhase;
