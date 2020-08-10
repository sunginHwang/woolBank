import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import styled from 'styled-components';
import BucketListDetailHeader from '../../components/bucketList/Detail/BucketListDetailHeader';
import BucketListContentInfo from '../../components/bucketList/Detail/BucketListContentInfo';
import TodoList from '../../components/todo/TodoList';
import { ITodo } from '../../models/ITodo';

const bucketListDetail = {
  title: '버킷리스트 목표달성 1',
  imgUrl: 'https://yaimg.yanolja.com/v5/2020/06/11/11/640/5ee19ac12697b5.53833623.jpg',
  remainDay: 35,
  remainDayPercent: 74
}

const todoList: ITodo[] = [{
  id: 1,
  title: '12121',
  isComplete: false
}, {
  id: 2,
  title: '라면먹기',
  isComplete: true
}, {
  id: 3,
  title: '롤렉스 사기',
  isComplete: false
}]

function BucketListDetail() {
  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <div>
        <BucketListDetailHeader
          title={bucketListDetail.title}
          imgUrl={bucketListDetail.imgUrl}
          remainDay={bucketListDetail.remainDay}
          remainDayPercent={bucketListDetail.remainDayPercent}
        />
        <S.Content>
          <BucketListContentInfo />
          <TodoList todoList={todoList} addTodo={(todo: ITodo) => {}} removeTodo={(id: number) => {}} onToggleTodoState={(id: number) => {}} />
          <S.DummyArea />
        </S.Content>
      </div>
    </PageTemplate>
  );
}

export default BucketListDetail;

const S :any = {
  DummyArea: styled.div`
    width: 100%;
    background-color: white;
    height: 1000px;
  `,
  Content: styled.div`
    padding: 4rem 2rem;
    background-color: white;
  `
}
