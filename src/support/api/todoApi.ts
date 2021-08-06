import apiCall from '@support/util/apiCall';
import { ApiResType } from '@models/api/ApiResType';
import { ITodo } from '@models/bucketList/ITodo';

export const saveTodo = async (bucketId: number, todo: ITodo): Promise<number> => {
  const res = await apiCall.post<ApiResType<{ todoId: number }>>('/todo', {
    title: todo.title,
    isComplete: todo.isComplete,
    bucketListId: bucketId
  });

  return res.data.data.todoId;
};

export const removeTodo = async (todoId: number) => {
  const res = await apiCall.delete<ApiResType<number>>(`/todo/${todoId}`);
  return res.data.data;
};

export const updateTodoState = async (todoId: number, isComplete: boolean) => {
  const res = await apiCall.put<ApiResType<number>>(`/todo/${todoId}`, {
    isComplete
  });
  return res.data.data;
};
