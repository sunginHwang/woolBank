import React, { useState } from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import styled from 'styled-components';
import BucketListDetailHeader from '../../components/bucketList/Detail/BucketListDetailHeader';
import BucketListContentInfo from '../../components/bucketList/Detail/BucketListContentInfo';
import TodoList from '../../components/todo/TodoList';
import { ITodo } from '../../models/ITodo';
import { IBucketListDetail } from '../../models/bucketList/IBucketListDetail';
import { getRemainDatePercentage, remainDays } from '../../support/util/date';
import { useToggle } from '../../support/hooks/useToggle';

function BucketListDetail() {
  const [bucketListDetail, setBucketListDetail] = useState<IBucketListDetail>({
    title: '버킷리스트 목표달성 1',
    image: {
      fullImageUrl: 'https://yaimg.yanolja.com/v5/2020/06/11/11/640/5ee19ac12697b5.53833623.jpg'
    },
    description: 'Como exemplos de conjunções coordenativas adversativas temos: porém, mas, contudo, todavia, entretanto.',
    todoList: [{
      id: 1,
      title: '12121',
      isComplete: false
    }],
    completeDate: '2020-12-31 00:00:00',
    createdDate: '2020-04-01 00:00:00',
    serverTime: (new Date()).toString()
  });
  const [todoLoading, onTodoLoading, offTodoLoading] = useToggle(false);

  const { serverTime, completeDate, createdDate } = bucketListDetail;

  const remainDay = remainDays(serverTime, completeDate);
  const remainPercent = getRemainDatePercentage(createdDate, completeDate, serverTime);

  const addTodo = (todo: ITodo) => {
    console.log(12);
    onTodoLoading();
    setTimeout(() => {
      setBucketListDetail((prevState) => {
        return {
          ...prevState,
          todoList: [...prevState.todoList, todo]
        };
      });
      offTodoLoading();
    }, 1000);
  };

  return (
    <PageTemplate useHeader={false} useSidePadding={false}>
      <div>
        <BucketListDetailHeader
          title={bucketListDetail.title}
          imgUrl={bucketListDetail.image.fullImageUrl}
          remainDay={remainDay}
          remainDayPercent={remainPercent}
        />
        <S.Content>
          <BucketListContentInfo />
          <div>
            <S.TodoTitle>할일목록</S.TodoTitle>
            <TodoList
              todoList={bucketListDetail.todoList}
              loading={todoLoading}
              addTodo={addTodo}
              removeTodo={(id: number) => {}}
              onToggleTodoState={(id: number) => {}}
            />
          </div>
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
    padding: 2rem;
    background-color: white;
  `,
  TodoTitle: styled.p`
    color: ${props => props.theme.colors.blackL1};
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 2rem;
  `
}
